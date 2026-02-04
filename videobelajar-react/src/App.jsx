import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Kategori from './pages/Kategori';
import DetailProduct from './pages/DetailProduct.jsx';
import Checkout from './pages/Checkout'; // Halaman Checkout
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentPending from './pages/PaymentPending';
import PesananSaya from './pages/PesananSaya';
import KelasSaya from './pages/KelasSaya';
import Profile from './pages/Profile';
import ClassDetail from './pages/ClassDetail';
import Certificate from './pages/Certificate';

function App() {
    return (
        <Router>
            <Routes>
                {/* --- 1. PUBLIC ROUTES (BISA AKSES TANPA LOGIN) --- */}

                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/kategori" element={<Kategori />} />

                {/* Landing Page Kelas (Publik) */}
                <Route path="/course/:id" element={<DetailProduct />} />

                {/* [PERUBAHAN] Checkout sekarang PUBLIK (Tidak di-protect) */}
                <Route path="/checkout/:id" element={<Checkout />} />

                {/* --- 2. PROTECTED ROUTES (WAJIB LOGIN) --- */}
                {/* Halaman Pembayaran & User Dashboard tetap dilindungi */}

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

                {/* Halaman Belajar & Sertifikat Tetap Private */}
                <Route path="/learn/:id" element={
                    <ProtectedRoute><ClassDetail /></ProtectedRoute>
                } />

                <Route path="/sertifikat/:id" element={
                    <ProtectedRoute><Certificate /></ProtectedRoute>
                } />

                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;