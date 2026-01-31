
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

const ProtectedRoute = () => {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to Onboarding/Login if not authenticated
        return <Navigate to="/onboarding" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
