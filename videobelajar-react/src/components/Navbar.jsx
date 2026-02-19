import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/logo.png';
import userPhoto from '../assets/images/user.png';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const hamburgerBtnRef = useRef(null);

    const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // AMBIL DATA USER DARI LOCAL STORAGE
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user && user.role === 'admin'; // Tambahan role admin

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    // --- FUNGSI LOGOUT ---
    const handleLogout = () => {
        setIsDesktopDropdownOpen(false);
        setIsMobileMenuOpen(false);

        localStorage.removeItem("user");

        setTimeout(() => {
            navigate("/");
            window.location.reload();
        }, 300);
    };

    // --- TUTUP MENU SAAT KLIK DI LUAR AREA ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Tutup dropdown desktop
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDesktopDropdownOpen(false);
            }

            // 2. LOGIKA DIPERBAIKI: Tutup menu mobile JIKA klik di luar menu DAN BUKAN klik di tombol hamburger
            if (
                isMobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                hamburgerBtnRef.current &&
                !hamburgerBtnRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobileMenuOpen]); // Tambahkan dependency isMobileMenuOpen

    // Tutup menu otomatis jika pindah halaman
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsDesktopDropdownOpen(false);
    }, [location.pathname]);

    return (
        <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 font-poppins shadow-sm">
            <div className="max-w-7xl mx-auto px-5 py-3 md:px-10 flex justify-between items-center h-[80px]">

                {/* LOGO */}
                <Link to="/" className="hover:opacity-80 transition-opacity z-50">
                    <img src={logoImage} alt="Videobelajar Logo" className="h-8 md:h-10 w-auto object-contain" />
                </Link>

                {/* AREA KANAN */}
                <div className="flex items-center gap-4">

                    {/* --- DESKTOP MENU --- */}
                    {!isAuthPage && (
                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/kategori" className="text-gray-600 font-medium hover:text-[#3ECF4C] transition-colors">Kategori</Link>

                            {user ? (
                                /* KONDISI: SUDAH LOGIN (Desktop) */
                                <div className="relative" ref={dropdownRef}>
                                    <div
                                        className="flex items-center gap-3 cursor-pointer p-1.5 pr-4 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors"
                                        onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                                    >
                                        <img src={userPhoto} alt="Profile" className="w-9 h-9 rounded-full object-cover bg-white" />
                                        <div className="hidden lg:flex flex-col">
                                            <span className="text-sm font-bold text-gray-800 leading-tight">{user.name || "User"}</span>
                                            <span className="text-[10px] font-semibold text-[#3ECF4C] uppercase leading-tight">{user.role || "User"}</span>
                                        </div>
                                        <i className={`fa-solid fa-chevron-down text-xs text-gray-400 ml-1 transition-transform ${isDesktopDropdownOpen ? 'rotate-180' : ''}`}></i>
                                    </div>

                                    {/* Dropdown Desktop */}
                                    {isDesktopDropdownOpen && (
                                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 animate-fade-in origin-top-right z-50">
                                            <div className="px-4 py-3 flex items-center gap-3 mb-2">
                                                <img src={userPhoto} alt="User" className="w-10 h-10 rounded-full bg-gray-100" />
                                                <div className="overflow-hidden">
                                                    <p className="font-bold text-gray-900 text-sm truncate">{user.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                </div>
                                            </div>

                                            <hr className="border-gray-100 my-1" />

                                            <div className="py-2 flex flex-col gap-1">
                                                {isAdmin ? (
                                                    <Link to="/admin" className="px-4 py-2 text-sm text-gray-700 hover:text-[#3ECF4C] hover:bg-[#F3FDE8] rounded-lg flex items-center gap-3 font-medium transition-colors">
                                                        <i className="fa-solid fa-gauge w-5 text-center text-gray-400"></i> Dashboard Admin
                                                    </Link>
                                                ) : (
                                                    <>
                                                        <Link to="/profile" className="px-4 py-2 text-sm text-gray-700 hover:text-[#3ECF4C] hover:bg-[#F3FDE8] rounded-lg flex items-center gap-3 font-medium transition-colors">
                                                            <i className="fa-solid fa-user w-5 text-center text-gray-400"></i> Profil Saya
                                                        </Link>
                                                        <Link to="/pesanan-saya" className="px-4 py-2 text-sm text-gray-700 hover:text-[#3ECF4C] hover:bg-[#F3FDE8] rounded-lg flex items-center gap-3 font-medium transition-colors">
                                                            <i className="fa-solid fa-cart-shopping w-5 text-center text-gray-400"></i> Pesanan Saya
                                                        </Link>
                                                        <Link to="/kelas-saya" className="px-4 py-2 text-sm text-gray-700 hover:text-[#3ECF4C] hover:bg-[#F3FDE8] rounded-lg flex items-center gap-3 font-medium transition-colors">
                                                            <i className="fa-solid fa-book-open w-5 text-center text-gray-400"></i> Kelas Saya
                                                        </Link>
                                                    </>
                                                )}
                                            </div>

                                            <hr className="border-gray-100 my-1" />
                                            <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 mt-1 text-sm text-red-500 font-bold hover:bg-red-50 rounded-lg flex justify-between items-center transition-colors">
                                                Keluar <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* KONDISI: BELUM LOGIN (Desktop) */
                                <div className="flex items-center gap-3">
                                    <Link to="/login" className="text-gray-700 hover:text-[#3ECF4C] font-bold py-2.5 px-6 rounded-lg transition-colors text-sm">Masuk</Link>
                                    <Link to="/register" className="bg-[#3ECF4C] hover:bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-md transition-transform active:scale-95 text-sm">Daftar</Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- TOMBOL HAMBURGER MOBILE --- */}
                    {!isAuthPage && (
                        <button
                            ref={hamburgerBtnRef} // 3. Pasang ref di sini
                            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-600 focus:outline-none bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors z-50"
                            onClick={(e) => {
                                e.stopPropagation(); // Mencegah event bocor ke document
                                setIsMobileMenuOpen(!isMobileMenuOpen);
                            }}
                            aria-label="Toggle Menu"
                        >
                            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl transition-all duration-300`}></i>
                        </button>
                    )}
                </div>
            </div>

            {/* === DROPDOWN MENU MOBILE (Overlay) === */}
            {isMobileMenuOpen && !isAuthPage && (
                <div
                    ref={mobileMenuRef}
                    className="md:hidden absolute top-[80px] left-0 w-full bg-white shadow-xl border-b border-gray-100 p-5 flex flex-col gap-3 animate-fade-in-down z-40"
                >
                    <Link to="/kategori" className="py-3 text-gray-700 font-medium border-b border-gray-50 flex justify-between items-center">
                        Kategori <i className="fa-solid fa-chevron-right text-xs text-gray-400"></i>
                    </Link>

                    {user ? (
                        /* Menu Mobile: SUDAH LOGIN */
                        <div className="flex flex-col mt-2">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4 border border-gray-100">
                                <img src={userPhoto} alt="User" className="w-12 h-12 rounded-full object-cover bg-white" />
                                <div className="overflow-hidden">
                                    <p className="font-bold text-gray-900 text-sm truncate">{user.name || "User"}</p>
                                    <p className="text-xs text-[#3ECF4C] font-semibold uppercase">{user.role || "User"}</p>
                                </div>
                            </div>

                            {isAdmin ? (
                                <Link to="/admin" className="py-3 px-2 text-gray-700 font-medium flex items-center gap-3">
                                    <i className="fa-solid fa-gauge text-gray-400 w-5"></i> Dashboard Admin
                                </Link>
                            ) : (
                                <>
                                    <Link to="/profile" className="py-3 px-2 text-gray-700 font-medium flex items-center gap-3">
                                        <i className="fa-solid fa-user text-gray-400 w-5"></i> Profil Saya
                                    </Link>
                                    <Link to="/pesanan-saya" className="py-3 px-2 text-gray-700 font-medium flex items-center gap-3">
                                        <i className="fa-solid fa-cart-shopping text-gray-400 w-5"></i> Pesanan Saya
                                    </Link>
                                    <Link to="/kelas-saya" className="py-3 px-2 text-gray-700 font-medium flex items-center gap-3">
                                        <i className="fa-solid fa-book-open text-gray-400 w-5"></i> Kelas Saya
                                    </Link>
                                </>
                            )}

                            <hr className="border-gray-100 my-3" />
                            <button onClick={handleLogout} className="w-full text-left p-3 text-red-500 font-bold flex items-center justify-between bg-red-50 rounded-lg">
                                Keluar <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            </button>
                        </div>
                    ) : (
                        /* Menu Mobile: BELUM LOGIN */
                        <div className="flex flex-col gap-3 mt-4">
                            <Link to="/login" className="w-full border-2 border-[#3ECF4C] text-[#3ECF4C] text-center font-bold py-3 rounded-xl transition-colors active:bg-green-50">Masuk</Link>
                            <Link to="/register" className="w-full bg-[#3ECF4C] text-white text-center font-bold py-3 rounded-xl shadow-md active:scale-95 transition-transform">Daftar</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;