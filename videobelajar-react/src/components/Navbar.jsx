import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/logo.png';
import userPhoto from '../assets/images/user.png';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Ref untuk mendeteksi klik di luar menu
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // State untuk kontrol menu
    const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Ambil data user dari LocalStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    // Fungsi Logout
    const handleLogout = () => {
        setIsDesktopDropdownOpen(false);
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
            // Tutup Desktop Dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDesktopDropdownOpen(false);
            }
            // Tutup Mobile Menu (kecuali tombol hamburger diklik)
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.hamburger-btn')) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Helper: Menu Links (Supaya tidak menulis ulang)
    const MenuLinks = () => (
        <>
            <Link to="/kategori" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-lg md:p-0 md:hover:bg-transparent md:hover:text-green-500 transition-colors">
                Kategori
            </Link>
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-lg md:hidden">
                Profil Saya
            </Link>
            <Link to="/pesanan-saya" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-lg md:hidden">
                Pesanan Saya
            </Link>
            <Link to="/my-courses" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-lg md:hidden">
                Kelas Saya
            </Link>
        </>
    );

    return (
        <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-5 py-4 md:px-10 md:py-5 flex justify-between items-center">

                {/* 1. LOGO (KIRI) */}
                <Link to="/home" className="hover:opacity-80 transition-opacity z-50">
                    <img
                        src={logoImage}
                        alt="Videobelajar Logo"
                        className="h-8 md:h-10 w-auto object-contain"
                    />
                </Link>

                {/* 2. AREA KANAN */}
                <div className="flex items-center gap-4">

                    {user && !isAuthPage ? (
                        <>
                            {/* === TAMPILAN DESKTOP (Hidden di Mobile) === */}
                            {/* Class 'hidden md:flex' artinya: Hilang di HP, Muncul di Laptop */}
                            <div className="hidden md:flex items-center gap-8">
                                <Link to="/kategori" className="text-gray-600 font-medium hover:text-green-500 transition-colors">
                                    Kategori
                                </Link>

                                {/* Foto Profil dengan Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <img
                                        src={userPhoto}
                                        alt="Profile"
                                        onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                                        className="w-10 h-10 rounded-xl object-cover cursor-pointer hover:shadow-md border border-gray-200"
                                    />

                                    {/* Desktop Dropdown Content */}
                                    {isDesktopDropdownOpen && (
                                        <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-down origin-top-right">
                                            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                                                <p className="font-bold text-gray-900 text-sm truncate">{user.name || "User"}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            <div className="py-2">
                                                <Link to="/profile" className="block px-5 py-2 text-sm text-gray-600 hover:bg-gray-50">Profil Saya</Link>
                                                <Link to="/pesanan-saya" className="block px-5 py-2 text-sm text-gray-600 hover:bg-gray-50">Pesanan Saya</Link>
                                                <Link to="/my-courses" className="block px-5 py-2 text-sm text-gray-600 hover:bg-gray-50">Kelas Saya</Link>
                                            </div>
                                            <div className="border-t border-gray-100">
                                                <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-sm text-red-500 font-semibold hover:bg-red-50 flex justify-between items-center">
                                                    Keluar <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* === TAMPILAN MOBILE (Hidden di Desktop) === */}
                            {/* Class 'flex md:hidden' artinya: Muncul di HP, Hilang di Laptop */}
                            <div className="flex md:hidden">
                                <button
                                    className="hamburger-btn text-gray-600 p-2 focus:outline-none"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
                                </button>
                            </div>
                        </>
                    ) : (
                        // Tombol Login (Jika belum login)
                        !isAuthPage && (
                            <Link to="/login" className="px-5 py-2 bg-green-500 text-white text-sm font-bold rounded-lg hover:bg-green-600 shadow-sm transition-colors">
                                Masuk
                            </Link>
                        )
                    )}
                </div>
            </div>

            {/* === ISI MENU MOBILE (Muncul saat Hamburger diklik) === */}
            {isMobileMenuOpen && (
                <div ref={mobileMenuRef} className="absolute top-full left-0 w-full bg-white shadow-lg border-b border-gray-100 p-4 flex flex-col gap-2 md:hidden animate-fade-in-down">

                    {/* Info User Mobile */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
                        <img src={userPhoto} alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                        <div className="overflow-hidden">
                            <p className="font-bold text-gray-900 text-sm truncate">{user?.name || "User"}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>

                    {/* List Menu */}
                    <MenuLinks />

                    <div className="border-t border-gray-100 my-1"></div>

                    {/* Tombol Logout Mobile */}
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-lg flex items-center justify-between">
                        Keluar <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;