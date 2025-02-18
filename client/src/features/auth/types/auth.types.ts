// src/features/auth/types/auth.types.ts

// 사용자 역할 정의
export enum UserRole {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    OPERATOR = 'OPERATOR',
    VIEWER = 'VIEWER'
}

// 사용자 정보 타입
export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    department?: string; // 부서 정보
}

// 로그인 요청 시 필요한 데이터 타입
export interface LoginRequest {
    email: string;
    password: string;
}

// 로그인 응답 데이터 타입
export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

// 리덕스 스토어에서 관리할 인증 상태 타입
export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

// 권한 정의
export type Permission =
    | 'equipment.view'
    | 'equipment.edit'
    | 'production.view'
    | 'production.edit'
    | 'quality.view'
    | 'quality.edit'
    | 'reports.view'
    | 'reports.edit';

// 역할별 권한 매핑
export const RolePermissions: Record<UserRole, Permission[]> = {
    ADMIN: [
        'equipment.view', 'equipment.edit',
        'production.view', 'production.edit',
        'quality.view', 'quality.edit',
        'reports.view', 'reports.edit'
    ],
    MANAGER: [
        'equipment.view', 'equipment.edit',
        'production.view', 'production.edit',
        'quality.view', 'quality.edit',
        'reports.view'
    ],
    OPERATOR: [
        'equipment.view',
        'production.view', 'production.edit',
        'quality.view'
    ],
    VIEWER: [
        'equipment.view',
        'production.view',
        'quality.view',
        'reports.view'
    ]
};