// src/shared/components/Navigate.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigateProps {
    to: string;
    replace?: boolean;
}

export const Navigate = ({ to, replace = true }: NavigateProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to, { replace });
    }, [navigate, to, replace]);

    return null;
};