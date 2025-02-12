// src/features/auth/api/authApi.ts
import { axiosInstance } from '@/services/axios.ts';
import {AuthResponse, LoginCredentials, SignUpCredentials, User} from '../types/auth.types';

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    signUp: async (data: SignUpCredentials): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/auth/signup', data);
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await axiosInstance.get<User>('/auth/me');
        return response.data;
    }
};