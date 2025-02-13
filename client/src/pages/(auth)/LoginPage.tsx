import LoginForm from "@/features/auth/components/LoginForm.tsx";

const LoginPage = () => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-6">로그인</h1>
            <LoginForm />
        </>
    );
}

export default LoginPage;