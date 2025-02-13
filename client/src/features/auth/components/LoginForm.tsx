import {Alert, AlertDescription, Button, Card, CardContent, Input} from "@/shared/components";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/store/hooks.ts";
import {useLoginMutation} from "@/store/apis/authApi.ts";
import {setCredentials} from "@/store/slices/auth.slice.ts";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState<string | null>(null);
    const [login] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        // Add your login logic
        try {
            const response = await login(formData).unwrap();
            dispatch(setCredentials(response));
            navigate('/dashboard');

        } catch (error) {
            setError('로그인에 실패했습니다.');
        }

    }

    return (
        <div>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        {error && <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>}

                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="이메일"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    email: e.target.value
                                }))} />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="비밀번호"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    password: e.target.value
                                }))}
                            />
                        </div>
                        <Button type="submit">로그인</Button>
                    </form>
                </CardContent>
            </Card>

        </div>
    );
};

export default LoginForm;
