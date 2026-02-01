import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/logo.png';
import userPhoto from '../assets/images/user.png';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Ambil data user dari LocalStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Cek apakah sedang di halaman Login/Register
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    // Fungsi Logout
    const handleLogout = () => {
        setIsDropdownOpen(false);
        setTimeout(() => {
            localStorage.removeItem("user");
            navigate("/login"); // HANYA KE LOGIN KALAU LOGOUT
            window.location.reload();
        }, 1000);
    };

    // Tutup dropdown saat klik di luar
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
        <nav className="w-full px-6 py-5 md:px-10 flex justify-between items-center bg-transparent relative z-50">

            {/* 1. LOGO (UBAH LINK KE /home) */}
            <Link to="/home" className="hover:opacity-80 transition-opacity">
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
                        <Link to="/kategori" className="text-gray-600 font-medium hover:text-primary transition-colors cursor-pointer text-sm md:text-base no-underline">
                            Kategori
                        </Link>

                        {/* WRAPPER DROPDOWN */}
                        <div className="relative" ref={dropdownRef}>

                            {/* FOTO PROFIL */}
                            <img
                                src={userPhoto}
                                alt="User Profile"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-10 h-10 rounded-xl object-cover cursor-pointer hover:shadow-md transition-all border border-gray-200"
                            />

                            {/* DROPDOWN MENU */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 animate-fade-in-down">

                                    <a href="#" className="block px-6 py-4 text-gray-600 font-medium hover:bg-gray-50 border-b border-gray-100 transition-colors">
                                        Profil Saya
                                    </a>
                                    <a href="#" className="block px-6 py-4 text-gray-600 font-medium hover:bg-gray-50 border-b border-gray-100 transition-colors">
                                        Kelas Saya
                                    </a>
                                    <a href="#" className="block px-6 py-4 text-gray-600 font-medium hover:bg-gray-50 border-b border-gray-100 transition-colors">
                                        Pesanan Saya
                                    </a>

                                    {/* Tombol Keluar */}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex justify-between items-center px-6 py-4 text-[#FF5722] font-semibold hover:bg-orange-50 transition-colors text-left"
                                    >
                                        Keluar
                                        <i className="fa-solid fa-arrow-right-from-bracket text-lg"></i>
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