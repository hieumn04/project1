import axios from 'axios';
import isUnauthorizedError from '../utils/httpStatus';
import { message } from 'antd';


export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'cache-control': 'no-cache',
    },
    timeout: 30000,
})


api.interceptors.request.use(
    (config) => {
        if(config.url?.includes('/auth/login')) {
            delete config.headers.Authorization;
            return config;
        }
        const token = localStorage.getItem('token');
        if(token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const expirationDate = payload.exp * 1000;
                
                if(Date.now() >= expirationDate) {
                    localStorage.removeItem('token');
                    delete config.headers.Authorization;
                    return config;
                }
                config.headers.Authorization = `Bearer ${token}`;    
            }
            catch (error) {
                console.error('Error parsing token:', error);
                delete config.headers.Authorization;
                return config;
            }
        } else {
            delete config.headers.Authorization;
            return config;
        }

    },
    (error) => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (isUnauthorizedError(error.response?.status) 
            && !originalRequest._retry
            && !originalRequest.url?.includes("login") ) {
            
                originalRequest._retry = true;
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (!refreshToken) throw new Error('No refresh token found in local storage');

                    const user = JSON.parse(localStorage.getItem('user')); //chỗ này phải authStore nhưng tôi không biết làm
                    const response = await api.post("auth/refresh-token", {
                        accessToken: localStorage.getItem('token'),
                        refreshToken: refreshToken,
                        userId: user?.userId,
                        role: user?.role,
                    });

                    if(response.data?.accessToken) {
                        localStorage.setItem('token', response.data.accessToken);
                        // authStore

                        

                        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                        return api(originalRequest);

                    }

                }
                catch(error) {
                    console.error('Error refreshing token:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }      
        }

        if(!error.response) {
            return Promise.reject({
                message: "Network Error",
            })
        }
        return Promise.reject(error);
                
    }

)