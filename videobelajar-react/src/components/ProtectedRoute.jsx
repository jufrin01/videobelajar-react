import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();

    if (!user) {
        // Jika belum login, tendang ke /login
        // 'state={{ from: location }}' berguna jika nanti mau redirect balik setelah login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Jika sudah login, izinkan masuk
    return children;
};

export default ProtectedRoute;