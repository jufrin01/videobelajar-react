import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Kategori from './pages/Kategori';
import DetailKelas from './pages/DetailKelas';
import Checkout from './pages/Checkout';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentPending from './pages/PaymentPending';
import PesananSaya from './pages/PesananSaya';

function App() {
    return (
        <Router>
            <Routes>
                {/* 1. Redirect Otomatis: Jika buka root (/) langsung lempar ke Login */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/kategori" element={<Kategori />} />
                <Route path="/course/:id" element={<DetailKelas />} />
                <Route path="/checkout/:id" element={<Checkout />} />
                <Route path="/payment/:id" element={<PaymentPage />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-pending" element={<PaymentPending />} />
                <Route path="/pesanan-saya" element={<PesananSaya />} />
                {/* Opsional: Jika user iseng ketik url sembarangan, balikin ke Login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;