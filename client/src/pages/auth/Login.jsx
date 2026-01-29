import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { Button } from '../../components/ui/Button';
import MobileContainer from '../../components/layout/MobileContainer';
import { ChevronLeft } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const { login, isLoading, error } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <MobileContainer showNav={false}>
            <div className="p-6 h-full flex flex-col">
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-3xl font-extrabold mt-4 text-primary">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to continue your healthy journey.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-card-dark border border-gray-200 dark:border-gray-700 outline-none focus:border-primary transition-colors"
                                placeholder="hello@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-card-dark border border-gray-200 dark:border-gray-700 outline-none focus:border-primary transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <div className="text-center mt-6">
                        <p className="text-gray-500 text-sm">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary font-bold hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </MobileContainer>
    );
};

export default Login;
