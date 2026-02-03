import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userPhoto from '../assets/images/user.png';

const LearningNavbar = ({ title, progress, currentModule, totalModules, courseId }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

                {/* --- KANAN (DESKTOP): PROGRESS BAR --- */}
                <div className="hidden md:flex items-center gap-6">
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

                    {/* Profil User */}
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                        <img
                            src={userPhoto} // <--- 2. Gunakan Variable Import
                            alt="User"
                            className="w-full h-full object-cover"
                        />
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

            {/* --- MOBILE MENU DROPDOWN --- */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-[60px] left-0 w-full bg-white border-b border-gray-100 shadow-xl p-5 flex flex-col gap-4 animate-fade-in z-50">

                    {/* Info Progress di Mobile Menu */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-bold text-gray-900">Progress Kelas</span>
                            <span className="text-xs font-semibold text-[#3ECF4C]">
                                {progress}% ({currentModule}/{totalModules})
                            </span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#3ECF4C] rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    <hr className="border-gray-100"/>

                    {/* Menu Links Tambahan */}
                    <div className="flex flex-col gap-2">
                        <Link to="/dashboard" className="py-2 text-gray-600 hover:text-[#3ECF4C] font-medium flex items-center gap-3">
                            <i className="fa-solid fa-house"></i> Dashboard
                        </Link>
                        <Link to="/kelas-saya" className="py-2 text-gray-600 hover:text-[#3ECF4C] font-medium flex items-center gap-3">
                            <i className="fa-solid fa-book-open"></i> Kelas Saya
                        </Link>
                        <Link to="/sertifikat" className="py-2 text-gray-600 hover:text-[#3ECF4C] font-medium flex items-center gap-3">
                            <i className="fa-solid fa-certificate"></i> Sertifikat
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default LearningNavbar;