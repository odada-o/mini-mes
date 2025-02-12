// 메인 레이아웃 컴포넌트
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <img src="/images/logo.gif" alt="Nautilus Hyosung" className="h-8" />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-50">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
                    <p>© 2024 Nautilus Hyosung. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default AuthLayout;