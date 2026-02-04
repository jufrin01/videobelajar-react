import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userPhoto from '../assets/images/user.png';

const LearningNavbar = ({ title, progress, currentModule, totalModules, courseId }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCertDropdownOpen, setIsCertDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const isCompleted = progress === 100;

    return (
        <nav className="sticky top-0 z-[60] bg-white border-b border-gray-100 shadow-sm font-poppins">
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 h-[60px] md:h-[80px] flex items-center justify-between">

                {/* --- KIRI: TOMBOL KEMBALI & JUDUL --- */}
                <div className="flex items-center gap-4 flex-1 overflow-hidden">
                    <Link
                        to="/kelas-saya"
                        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                    >
                        <i className="fa-solid fa-arrow-left text-lg"></i>
                    </Link>
                    <h1 className="font-bold text-gray-900 text-sm md:text-lg truncate pr-4">
                        {title || "Materi Pembelajaran"}
                    </h1>
                </div>

                {/* --- KANAN (DESKTOP) --- */}
                <div className="hidden md:flex items-center gap-6">

                    {isCompleted ? (
                        // [TAMPILAN SELESAI] Tombol dengan Dropdown
                        <div className="relative">

                            {/* 1. Tombol Utama Navbar */}
                            <button
                                onClick={() => setIsCertDropdownOpen(!isCertDropdownOpen)}
                                className={`flex items-center gap-2 border px-5 py-2.5 rounded-lg font-bold transition-all duration-300 ${isCertDropdownOpen ? 'bg-green-50 border-[#3ECF4C] text-[#3ECF4C]' : 'border-[#3ECF4C] text-[#3ECF4C] hover:bg-green-50'}`}
                            >
                                <i className="fa-solid fa-trophy text-yellow-400 text-lg"></i>
                                <span>Ambil Sertifikat</span>
                                {/* Panah berputar saat diklik */}
                                <i className={`fa-solid fa-chevron-down ml-2 text-sm transition-transform duration-300 ${isCertDropdownOpen ? 'rotate-180' : ''}`}></i>
                            </button>

                            {/* 2. Dropdown Popover */}
                            {isCertDropdownOpen && (
                                <div className="absolute top-full right-0 mt-4 w-[320px] bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-6 z-50 animate-fade-in-up">
                                    {/* Judul Dropdown */}
                                    <h3 className="font-bold text-gray-900 mb-2 text-base">Modul sudah selesai</h3>

                                    {/* Deskripsi */}
                                    <p className="text-gray-500 text-xs leading-relaxed mb-5">
                                        {currentModule} dari {totalModules} modul telah selesai, silahkan download sertifikat.
                                    </p>

                                    {/* Tombol Aksi Hijau Penuh */}
                                    <button
                                        onClick={() => navigate(`/sertifikat/${courseId}`)}
                                        className="w-full bg-[#3ECF4C] hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors shadow-md active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        Ambil Sertifikat
                                    </button>
                                </div>
                            )}

                            {/* Overlay transparan untuk menutup dropdown jika klik di luar (Opsional tapi UX bagus) */}
                            {isCertDropdownOpen && (
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsCertDropdownOpen(false)}
                                ></div>
                            )}
                        </div>
                    ) : (
                        // [TAMPILAN BELUM SELESAI] Progress Bar
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-semibold text-gray-500 mb-1">
                                Progress Belajar: {currentModule}/{totalModules}
                            </span>
                            <div className="w-[200px] h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#3ECF4C] rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Profil User */}
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                        <img src={userPhoto} alt="User" className="w-full h-full object-cover"/>
                    </div>
                </div>

                {/* --- KANAN (MOBILE): BURGER BUTTON --- */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
                </button>
            </div>

            {/* --- MOBILE MENU --- */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-[60px] left-0 w-full bg-white border-b border-gray-100 shadow-xl p-5 flex flex-col gap-4 animate-fade-in z-50">
                    <div>
                        {isCompleted ? (
                            <button
                                onClick={() => { navigate(`/sertifikat/${courseId}`); setIsMenuOpen(false); }}
                                className="w-full flex items-center justify-center gap-2 bg-[#3ECF4C] text-white py-3 rounded-lg font-bold shadow-md"
                            >
                                <i className="fa-solid fa-trophy text-yellow-300"></i> Ambil Sertifikat
                            </button>
                        ) : (
                            <>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-bold text-gray-900">Progress Kelas</span>
                                    <span className="text-xs font-semibold text-[#3ECF4C]">{progress}% ({currentModule}/{totalModules})</span>
                                </div>
                                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#3ECF4C] rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                                </div>
                            </>
                        )}
                    </div>
                    <hr className="border-gray-100"/>
                    <div className="flex flex-col gap-2">
                        <Link to="/dashboard" className="py-2 text-gray-600 hover:text-[#3ECF4C] font-medium flex items-center gap-3"><i className="fa-solid fa-house"></i> Dashboard</Link>
                        <Link to="/kelas-saya" className="py-2 text-gray-600 hover:text-[#3ECF4C] font-medium flex items-center gap-3"><i className="fa-solid fa-book-open"></i> Kelas Saya</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default LearningNavbar;