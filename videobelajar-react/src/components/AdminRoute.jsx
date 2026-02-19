import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();


    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user.role !== 'admin') {
        alert("Akses Ditolak! Anda bukan Admin.");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;