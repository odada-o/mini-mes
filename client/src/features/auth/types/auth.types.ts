// src/features/auth/types/auth.types.ts
export interface LoginCredentials {
    manager_id: string;    // 효성 매뉴얼 기준 ID
    password: string;
}

export interface SignUpCredentials {
    manager_id: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    country: string;
}

export interface User {
    id: number;
    manager_id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    country: string;
    createdAt: string;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}