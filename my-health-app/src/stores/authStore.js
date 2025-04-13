import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import { getValidPayload, isTokenValid } from '../utils/jwt';
import { api } from './apiConfig';



const initialState = {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

export const createUserObject = (data) => ({
    userId: data?.userId,
    role: data?.role.toLowerCase().replace("role_", ""),
    fullName: data?.fullName,
    verified: data?.verified,
});

export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common['Authorization'];
}


export const useAuthStore = create(
    persist(
        (set, get) => ({
            ...initialState,

            login: async (credential) => {
                set({ isLoading: true, error: null });

                try {
                    clearAuthToken();
                    const {data} = await api.post("/auth/login", credential);
                    if(!data?.accessToken && ! data?.refreshToken) {
                        throw new Error("Invalid login response");
                    }

                    setAuthToken(data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    set({
                        user: createUserObject(data),
                        token: data.accessToken,
                        refreshToken: data.refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                    });

                }
                catch (error) {
                    clearAuthToken();
                    const errorMessage = error?.response?.data?.message || error.message || "Login failed";
                    set({
                        ...initialState,
                        error: errorMessage,
                        isLoading: false,
                    });

                    console.error('Login error:', {
                        status: error?.response?.status,
                        message: errorMessage,
                        data: error?.response?.data,
                    });
                    throw new Error(errorMessage);
                }
            },

            logout: () => {
                clearAuthToken();
                set({ ...initialState, isLoading: false });
            },

            checkAuthStatus: () => {
                try {
                    const token = localStorage.getItem('token');
                
                    if(!token || !isTokenValid(token)) {
                        get().logout();
                        return false;
                    }
                    const payload = getValidPayload(token);
                    if(!payload) {
                        get().logout();
                        return false
                    }    
                     
                    set({
                        user: createUserObject(payload),
                        token: token,
                        refreshToken: localStorage.getItem('refreshToken'),
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return true;         
                    
                }     
                catch(error) {
                    console.error('Error checking auth status:', error);
                    get().logout();
                    return false;
                }       
            },

            initialize: () => {
                get().checkAuthStatus();
                set({ isLoading: false });  
            },

            refreshToken: async() => {
                set({ isLoading: true });
                const currentRefreshToken = localStorage.getItem('refreshToken');
                if(!currentRefreshToken) {
                    get().logout();
                    set({ isLoading: false });
                    return false;
                }
                try {
                    const {data} = await api.post("/auth/refresh-token", {currentRefreshToken});
                    if(!data?.accessToken) {
                        throw new Error("Invalid refresh token response");
                    }
                    setAuthToken(data.accessToken);
                    const newRefreshToken = data.refreshToken || currentRefreshToken;
                    localStorage.setItem('refreshToken', newRefreshToken);
                    const payload = getValidPayload(data.accessToken);
                    set({
                        user: payload ? createUserObject(payload) : get().user,
                        token: data.accessToken,
                        refreshToken: newRefreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return true;
                            
                } catch(error) {
                    get().logout();
                    console.error('Refresh token error:', error);
                    set({ isLoading: false });
                    return false;
                }
            },

            updateUser: (userData) => {
                if(!userData && typeof userData !== 'object') {
                    console.warn('Invalid user data:', userData);
                    return;
                }

                const currentUser = get().user || {};
                const allowedFields = ['fullName', 'verified'];
                const filterData = Object.keys(userData)
                    .filter(key => allowedFields.includes(key))
                    .reduce((obj, key) => ({
                        ...obj,
                        [key]: userData[key]
                    }), {})

                set({
                    user: {
                        ...currentUser,
                        ...filterData,
                    }
                })    
            }
               
        }),
        {
            name: 'authStore',
        }

        
    )
)