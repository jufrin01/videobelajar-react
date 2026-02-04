import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/logo.png';
import userPhoto from '../assets/images/user.png';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // 1. AMBIL DATA USER DARI LOCAL STORAGE
    // Jika null, berarti user BELUM LOGIN
    const user = JSON.parse(localStorage.getItem("user"));

    // Cek apakah sedang di halaman auth (Login/Register) agar navbar tidak menampilkan tombol dobel
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    // --- FUNGSI LOGOUT ---
    const handleLogout = () => {
        setIsDesktopDropdownOpen(false);
        setIsMobileMenuOpen(false);

        // Hapus data user
        localStorage.removeItem("user");

        // Redirect ke Home (/) dan Reload halaman
        setTimeout(() => {
            navigate("/");
            window.location.reload();
        }, 300);
    };

    // Tutup menu saat klik di luar area
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDesktopDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.hamburger-btn')) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // --- HELPER: MENU MOBILE KHUSUS USER LOGIN ---
    const MobileUserMenu = () => (
        <>
            <Link to="/kategori" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-lg">Kategori</Link>
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-lg">Profil Saya</Link>
            <Link to="/pesanan-saya" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-lg">Pesanan Saya</Link>
            <Link to="/kelas-saya" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-lg">Kelas Saya</Link>
        </>
    );

    return (
        <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 font-poppins">
            <div className="max-w-7xl mx-auto px-5 py-4 md:px-10 md:py-4 flex justify-between items-center h-[80px]">

                {/* LOGO */}
                <Link to="/" className="hover:opacity-80 transition-opacity z-50">
                    <img src={logoImage} alt="Videobelajar Logo" className="h-8 md:h-10 w-auto object-contain" />
                </Link>

                {/* AREA KANAN */}
                <div className="flex items-center gap-4">

                    {/* --- KONDISI 1: SUDAH LOGIN (Ada data User) --- */}
                    {user ? (
                        <>
                            {/* Desktop Menu */}
                            <div className="hidden md:flex items-center gap-8">
                                <Link to="/kategori" className="text-gray-600 font-medium hover:text-[#3ECF4C] transition-colors">Kategori</Link>

                                {/* Foto Profil + Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <img
                                        src={userPhoto}
                                        alt="Profile"
                                        onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                                        className="w-10 h-10 rounded-xl object-cover cursor-pointer hover:shadow-md border border-gray-200"
                                    />
                                    {isDesktopDropdownOpen && (
                                        <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-down origin-top-right">
                                            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                                                <p className="font-bold text-gray-900 text-sm truncate">{user.name || "User"}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            <div className="py-2">
                                                <Link to="/profile" className="block px-5 py-2 text-sm text-gray-600 hover:bg-gray-50">Profil Saya</Link>
                                                <Link to="/pesanan-saya" className="block px-5 py-2 text-sm text-gray-600 hover:bg-gray-50">Pesanan Saya</Link>
                                                <Link to="/kelas-saya" className="block px-5 py-2 text-sm text-gray-600 hover:bg-gray-50">Kelas Saya</Link>
                                            </div>
                                            <div className="border-t border-gray-100">
                                                <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-sm text-red-500 font-semibold hover:bg-red-50 flex justify-between items-center">Keluar <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Hamburger (Muncul di HP saat Login) */}
                            <div className="flex md:hidden">
                                <button className="hamburger-btn text-gray-600 p-2 focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                    <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
                                </button>
                            </div>
                        </>
                    ) : (
                        /* --- KONDISI 2: BELUM LOGIN (User Kosong/Null) --- */
                        !isAuthPage && (
                            <>
                                {/* Desktop Menu: Kategori + Tombol Login/Register */}
                                <div className="hidden md:flex items-center gap-6">
                                    <Link to="/kategori" className="text-gray-600 font-medium hover:text-[#3ECF4C] transition-colors">Kategori</Link>

                                    <div className="flex items-center gap-3">
                                        <Link to="/login" className="bg-[#3ECF4C] hover:bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md shadow-green-100 text-sm">
                                            Masuk
                                        </Link>
                                        <Link to="/register" className="bg-white border border-[#3ECF4C] text-[#3ECF4C] hover:bg-green-50 font-bold py-2.5 px-6 rounded-lg transition-colors text-sm">
                                            Daftar
                                        </Link>
                                    </div>
                                </div>

                                {/* Mobile Hamburger (Muncul di HP saat Belum Login) */}
                                <div className="flex md:hidden">
                                    <button className="hamburger-btn text-gray-600 p-2 focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
                                    </button>
                                </div>
                            </>
                        )
                    )}
                </div>
            </div>

            {/* === DROPDOWN MENU MOBILE (Overlay) === */}
            {isMobileMenuOpen && (
                <div ref={mobileMenuRef} className="absolute top-full left-0 w-full bg-white shadow-lg border-b border-gray-100 p-4 flex flex-col gap-2 md:hidden animate-fade-in-down z-40">

                    {user ? (
                        /* Menu Mobile: SUDAH LOGIN */
                        <>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
                                <img src={userPhoto} alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                <div className="overflow-hidden">
                                    <p className="font-bold text-gray-900 text-sm truncate">{user.name || "User"}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>
                            <MobileUserMenu />
                            <div className="border-t border-gray-100 my-1"></div>
                            <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-lg flex items-center justify-between">Keluar <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                        </>
                    ) : (
                        /* Menu Mobile: BELUM LOGIN */
                        <div className="flex flex-col gap-3">
                            <Link to="/kategori" className="py-2 text-gray-600 font-medium border-b border-gray-50">Kategori</Link>
                            <Link to="/login" className="w-full bg-[#3ECF4C] text-white text-center font-bold py-3 rounded-lg shadow-sm">Masuk</Link>
                            <Link to="/register" className="w-full border border-[#3ECF4C] text-[#3ECF4C] text-center font-bold py-3 rounded-lg">Daftar</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;