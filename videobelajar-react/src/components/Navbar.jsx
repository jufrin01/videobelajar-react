import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logoImage from '../assets/images/logo.png';
import userPhoto from '../assets/images/user.png';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref untuk mendeteksi klik di luar

    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk buka/tutup menu

    const user = JSON.parse(localStorage.getItem("user"));
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    // Fungsi Logout dengan jeda
    const handleLogout = () => {
        setIsDropdownOpen(false); // Tutup menu dulu
        setTimeout(() => {
            localStorage.removeItem("user");
            navigate("/login");
            window.location.reload();
        }, 1000);
    };

    // Efek: Tutup menu jika user klik di LUAR area dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        // Tambahkan z-50 di sini agar Navbar selalu di atas elemen lain (seperti Hero image)
        <nav className="w-full px-6 py-5 md:px-10 flex justify-between items-center bg-transparent relative z-50">

            {/* 1. LOGO */}
            <Link to="/" className="hover:opacity-80 transition-opacity">
                <img
                    src={logoImage}
                    alt="Videobelajar Logo"
                    className="h-8 md:h-10 w-auto object-contain"
                />
            </Link>

            {/* 2. AREA KANAN */}
            <div className="flex items-center gap-6">

                {user && !isAuthPage ? (
                    <>
                        <a href="#" className="text-gray-600 font-medium hover:text-primary transition-colors cursor-pointer text-sm md:text-base no-underline">
                            Kategori
                        </a>

                        {/* WRAPPER DROPDOWN (Pakai Ref) */}
                        <div className="relative" ref={dropdownRef}>

                            {/* FOTO PROFIL (Tombol Pemicu) */}
                            <img
                                src={userPhoto}
                                alt="User Profile"
                                // SAAT DIKLIK -> TUKAR STATUS BUKA/TUTUP
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-10 h-10 rounded-xl object-cover cursor-pointer hover:shadow-md transition-all border border-gray-200"
                            />

                            {/* MENU DROPDOWN (Render Berdasarkan State isDropdownOpen) */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 border border-gray-100 animate-fade-in-down">
                                    <div className="px-4 py-2 border-b border-gray-50 text-xs text-gray-400 cursor-default">
                                        Halo, {user.name}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors"
                                    >
                                        <i className="fa-solid fa-right-from-bracket mr-2"></i> Keluar
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    !isAuthPage && (
                        <Link to="/login" className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-sm">
                            Masuk
                        </Link>
                    )
                )}
            </div>

        </nav>
    );
};

export default Navbar;