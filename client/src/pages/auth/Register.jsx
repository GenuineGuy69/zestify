import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { Button } from '../../components/ui/Button';
import MobileContainer from '../../components/layout/MobileContainer';
import { ChevronLeft } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const { register, isLoading, error } = useAuthStore();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.password
        );
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
                    <h1 className="text-3xl font-extrabold mt-4 text-primary">Create Account</h1>
                    <p className="text-gray-500 dark:text-gray-400">Join Zestify to start cooking smarter.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 flex-1 pb-4 overflow-y-auto hidden-scrollbar">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">First Name</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-card-dark border border-gray-200 dark:border-gray-700 outline-none focus:border-primary transition-colors"
                                placeholder="Alex"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Last Name</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-card-dark border border-gray-200 dark:border-gray-700 outline-none focus:border-primary transition-colors"
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-card-dark border border-gray-200 dark:border-gray-700 outline-none focus:border-primary transition-colors"
                            placeholder="hello@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-card-dark border border-gray-200 dark:border-gray-700 outline-none focus:border-primary transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </Button>

                    <div className="text-center mt-6">
                        <p className="text-gray-500 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-bold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </MobileContainer>
    );
};

export default Register;
