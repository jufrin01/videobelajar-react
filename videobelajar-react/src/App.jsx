import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCourses } from './store/courseSlice';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';


import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Kategori from './pages/Kategori';
import DetailProduct from './pages/DetailProduct.jsx';
import Checkout from './pages/Checkout';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentPending from './pages/PaymentPending';
import PesananSaya from './pages/PesananSaya';
import KelasSaya from './pages/KelasSaya';
import Profile from './pages/Profile';
import ClassDetail from './pages/ClassDetail';
import Certificate from './pages/Certificate';
import AdminDashboard from './pages/AdminDashboard';

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                {/* =========================================
                LEVEL 1: GUEST (Bisa Diakses Siapa Saja)
                ========================================= */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/kategori" element={<Kategori />} />
                <Route path="/course/:id" element={<DetailProduct />} />

                {/* =========================================
                LEVEL 2: USER (Wajib Login, role "user" / "admin")
                ========================================= */}
                <Route path="/checkout/:id" element={
                    <ProtectedRoute><Checkout /></ProtectedRoute>
                } />
                <Route path="/payment/:id" element={
                    <ProtectedRoute><PaymentPage /></ProtectedRoute>
                } />
                <Route path="/payment-success" element={
                    <ProtectedRoute><PaymentSuccess /></ProtectedRoute>
                } />
                <Route path="/payment-pending" element={
                    <ProtectedRoute><PaymentPending /></ProtectedRoute>
                } />
                <Route path="/pesanan-saya" element={
                    <ProtectedRoute><PesananSaya /></ProtectedRoute>
                } />
                <Route path="/kelas-saya" element={
                    <ProtectedRoute><KelasSaya /></ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute><Profile /></ProtectedRoute>
                } />
                <Route path="/learn/:id" element={
                    <ProtectedRoute><ClassDetail /></ProtectedRoute>
                } />
                <Route path="/sertifikat/:id" element={
                    <ProtectedRoute><Certificate /></ProtectedRoute>
                } />

                {/* =========================================
                LEVEL 3: ADMIN (Wajib Login & HANYA role "admin")
                ========================================= */}
                <Route path="/admin" element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                } />

                {/* Fallback jika URL tidak ditemukan */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;