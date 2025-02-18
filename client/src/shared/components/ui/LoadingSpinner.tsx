import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                                  size = 'md',
                                                                  className = ''
                                                              }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className={`animate-spin rounded-full border-t-transparent border-solid border-4 ${sizeClasses[size]} ${className}`}>
            <span className="sr-only">로딩 중...</span>
        </div>
    );
};