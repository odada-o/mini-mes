// src/features/auth/components/SignUpForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/features/auth/api/authApi.ts';
import {Alert, Button, Input} from "@/shared/components";
import {Label} from "@radix-ui/react-label";

export const SignUpForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        manager_id: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        phone: '',
        company: '',
        country: ''
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            await authApi.signUp(formData);
            navigate('/login', {
                state: { message: '회원가입이 완료되었습니다. 로그인해주세요.' }
            });
        } catch (err) {
            setError('회원가입에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && <Alert>{error}</Alert>}

                    <div className="space-y-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="id">id</Label>
                            <Input name="manager_id"
                                   id="id"
                                   type="text"
                                   required
                                   value={formData.manager_id}
                                   onChange={handleChange}
                                   disabled={loading}/>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input name="password"
                                   id="password"
                                   type="password"
                                   required
                                   value={formData.password}
                                   onChange={handleChange}
                                   disabled={loading}/>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input name="confirmPassword"
                                   id="confirmPassword"
                                   type="password"
                                   required
                                   value={formData.confirmPassword}
                                   onChange={handleChange}
                                   disabled={loading}/>
                        </div>


                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </Button>
                </form>
            </div>
        </div>
    );
};