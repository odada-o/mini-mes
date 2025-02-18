// src/shared/components/ProtectedRoute/index.tsx
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { useMeQuery } from '@/store/apis/authApi';
import { Permission, RolePermissions, UserRole } from '@/features/auth/types/auth.types';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
    requiredPermission?: Permission;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           children,
                                                           requiredRole,
                                                           requiredPermission
                                                       }) => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const location = useLocation();

    // 사용자 정보 가져오기 (토큰이 있지만 사용자 정보가 없는 경우 확인)
    const { isLoading, isFetching } = useMeQuery(undefined, {
        // 이미 인증되었고 사용자 정보가 있으면 불필요한 요청 방지
        skip: !isAuthenticated || !!user
    });

    // 권한 확인 함수
    const hasRequiredAccess = () => {
        // 사용자 정보가 없으면 접근 불가
        if (!user) return false;

        // 역할 요구사항 확인
        if (requiredRole) {
            // 관리자는 모든 역할 접근 가능
            if (user.role === UserRole.ADMIN) return true;

            // 요구되는 역할과 사용자 역할 비교
            if (user.role !== requiredRole) return false;
        }

        // 권한 요구사항 확인
        if (requiredPermission) {
            // 사용자 역할에 따른 권한 목록 가져오기
            const userPermissions = RolePermissions[user.role];

            // 필요한 권한이 사용자 권한 목록에 있는지 확인
            return userPermissions.includes(requiredPermission);
        }

        // 특별한 요구사항이 없으면 인증된 사용자는 접근 가능
        return true;
    };

    // 로딩 중일 때는 로딩 표시
    if (isLoading || isFetching) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner size="lg" />
                <span className="ml-2 text-gray-500">인증 확인 중...</span>
            </div>
        );
    }

    // 인증되지 않은 경우 로그인 페이지로 리디렉션
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // 권한 부족 시 Unauthorized 페이지로 리디렉션
    if (!hasRequiredAccess()) {
        return <Navigate to="/unauthorized" replace />;
    }

    // 모든 조건 통과 시 자식 요소 렌더링
    return <>{children}</>;
};

export default ProtectedRoute;