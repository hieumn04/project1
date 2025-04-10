import axios from 'axios';
import isUnauthorizedError from '../utils/httpStatus';
import { message } from 'antd';
import { clearAuthToken, useAuthStore } from './authStore';
import { isTokenValid } from '../utils/jwt';


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
    async(config) => {
        if(config.url?.includes('/auth/login')) {
            delete config.headers.Authorization;
            return config;
        }
        let token = localStorage.getItem('token');
        if(token && !isTokenValid(token)) {
            const refreshed = await useAuthStore.getState().refreshToken();
            if(!refreshed) {
                clearAuthToken();
                return config;
            }
            token = localStorage.getItem('token');

        }
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        else {
            delete config.headers.Authorization;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (isUnauthorizedError(error.response?.status) 
            && !originalRequest._retry
            && !originalRequest.url?.includes("login") ) {
            
                originalRequest._retry = true;
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (!refreshToken) throw new Error('No refresh token found');

                    const refreshed = await useAuthStore.getState().refreshToken(refreshToken);
                    if(!refreshed) throw new Error('Token refresh failed');
                        
                        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
                        return api(originalRequest);
       
                }
                catch(err) {
                    console.error('Error refreshing token:', err);
                    clearAuthToken();
                    useAuthStore.getState().setUser(null);
                    message.error('Session expired. Please log in again.');
                    window.location.href = '/login';
                    return Promise.reject(err);
                }      
        }
        if(!error.response) {
            return Promise.reject({
                message: "Network Error",
            })
        }
        return Promise.reject({
            message: error.response.data.message || error.message || 'An error occurred',   
            status: error.response.status,
            data: error.response.data,
        });
                
    }

)