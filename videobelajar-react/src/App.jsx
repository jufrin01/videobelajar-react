import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Halaman-Halaman
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Routes>
                {/* 1. Redirect Otomatis: Jika buka root (/) langsung lempar ke Login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* 2. Definisi Halaman */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />

                {/* Opsional: Jika user iseng ketik url sembarangan, balikin ke Login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;