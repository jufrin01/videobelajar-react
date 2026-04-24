import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const LearningNavbar = ({ title, progress, currentModule, totalModules, courseId }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

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
                    <h1 className="font-bold text-gray-900 text-sm md:text-lg truncate">
                        {title || "Memuat Materi..."}
                    </h1>
                </div>

                {/* --- KANAN: USER INFO --- */}
                <div className="flex items-center gap-3 md:gap-4 pl-4 border-l border-gray-100 ml-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-gray-900 leading-none mb-1">
                            {/* Ubah displayName menjadi name sesuai database PostgreSQL */}
                            {user?.name || "Siswa"}
                        </p>
                        <p className="text-[10px] text-[#3ECF4C] font-semibold">
                            {isCompleted ? "Selesai" : `Progres: ${progress || 0}%`}
                        </p>
                    </div>
                    <Link to="/profile">
                        <img
                            // Jika belum punya avatar, generate berdasarkan inisial namanya
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name ? user.name.replace(/\s+/g, '+') : 'U'}&background=random`}
                            alt="User"
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-100 object-cover"
                        />
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default LearningNavbar;