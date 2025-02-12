import {LoginForm} from "@/features/auth/components/LoginForm";
import BasicTable from "../../shared/components/table/BasicTable";

const LoginPage = () => {
    return (
        <>
            <BasicTable />
            <LoginForm />
        </>
    );
}

export default LoginPage;