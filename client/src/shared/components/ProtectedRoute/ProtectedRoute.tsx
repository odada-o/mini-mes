// src/shared/components/ProtectedRoute/ProtectedRoute.tsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {useAuth} from "@/features/auth/context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            // 현재 경로를 state로 전달하여 로그인 후 원래 가려던 페이지로 리다이렉트할 수 있게 함
            navigate('/login', {
                state: { from: location.pathname },
                replace: true
            });
        }
    }, [isAuthenticated, loading, navigate, location]);

    // 로딩 중이면 로딩 표시
    if (loading) {
        return <div>Loading...</div>; // 또는 로딩 스피너 컴포넌트
    }

    // 인증된 경우에만 children을 렌더링
    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;



