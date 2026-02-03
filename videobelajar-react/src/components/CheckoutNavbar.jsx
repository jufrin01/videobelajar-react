import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/logo.png';
import userPhoto from '../assets/images/user.png'; // Pastikan ada dummy photo atau handle jika null
import { DesktopStepper, MobileStepper } from './CheckoutStepper';

const CheckoutNavbar = ({ step = "method" }) => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);

    // Ambil data user (Opsional, untuk ditampilkan di menu)
    const user = JSON.parse(localStorage.getItem("user")) || { name: "User", email: "user@example.com" };

    // Fungsi Logout
    const handleLogout = () => {
        setIsMobileMenuOpen(false);
        localStorage.removeItem("user");
        setTimeout(() => {
            navigate("/login");
            window.location.reload();
        }, 500);
    };

    // Tutup menu saat klik di luar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.hamburger-btn')) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">

            {/* BAGIAN ATAS (Logo, Hamburger, Desktop Stepper) */}
            <div className="px-5 py-4 md:px-10 md:py-6 flex justify-between items-center relative z-50 bg-white">

                {/* 1. LOGO */}
                <Link to="/home" className="hover:opacity-80 transition-opacity">
                    <img src={logoImage} alt="Videobelajar Logo" className="h-8 md:h-10 w-auto object-contain" />
                </Link>

                {/* 2. HAMBURGER MENU (MOBILE ONLY) */}
                <button
                    className="hamburger-btn block md:hidden text-gray-600 focus:outline-none p-2 rounded hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
                </button>

                {/* 3. STEPPER (DESKTOP ONLY) */}
                <div className="hidden md:flex items-center gap-4 text-base">
                    <DesktopStepper currentStep={step} />
                </div>
            </div>

            {/* BAGIAN BAWAH: STEPPER (MOBILE ONLY) */}
            {/* Stepper tetap terlihat meskipun menu dibuka/tutup, agar user tahu progresnya */}
            <div className="block md:hidden px-5 pb-4 w-full border-t border-gray-50 pt-4 bg-white relative z-40">
                <MobileStepper currentStep={step} />
            </div>

            {/* === MENU DROPDOWN MOBILE (Muncul saat Hamburger diklik) === */}
            {isMobileMenuOpen && (
                <div ref={mobileMenuRef} className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-4 flex flex-col gap-2 md:hidden animate-fade-in-down z-30">

                    {/* Info User */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
                        <img src={userPhoto} alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                        <div className="overflow-hidden">
                            <p className="font-bold text-gray-900 text-sm truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>

                    {/* Menu Navigasi */}
                    <Link to="/home" className="px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">Beranda</Link>
                    <Link to="/pesanan-saya" className="px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">Pesanan Saya</Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    {/* Tombol Logout */}
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-lg flex items-center justify-between">
                        Keluar <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default CheckoutNavbar;