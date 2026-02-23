import React, { useState, useMemo, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import UserSidebar from '../components/UserSidebar';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import axios from 'axios';

import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { CourseContext } from '../context/CourseContext';

const KelasSaya = () => {
    const navigate = useNavigate();

    // Ambil master data kursus dari database (Context)
    const { courses } = useContext(CourseContext);

    const [activeTab, setActiveTab] = useState("Semua Kelas");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // State untuk menampung kelas yang BENAR-BENAR dimiliki user
    const [myCourses, setMyCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const DB_URL = 'https://videobelajarweb-default-rtdb.asia-southeast1.firebasedatabase.app';

    // 2. AMBIL DATA KELAS BERDASARKAN PESANAN YANG BERHASIL
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && courses.length > 0) {
                try {
                    // Ambil pesanan milik user ini
                    const response = await axios.get(`${DB_URL}/orders/${user.uid}.json`);

                    if (response.data) {
                        // Filter hanya pesanan yang statusnya "Berhasil"
                        const successfulOrders = Object.values(response.data).filter(order => order.status === "Berhasil");

                        // Kumpulkan ID kelas yang sudah dibeli
                        const ownedCourseIds = successfulOrders.map(order => order.courseId);

                        // Cocokkan dengan data kursus asli dari database
                        const userOwnedCourses = courses.filter(course => ownedCourseIds.includes(course.id));

                        setMyCourses(userOwnedCourses);
                    } else {
                        setMyCourses([]);
                    }
                } catch (error) {
                    console.error("Gagal mengambil data kelas saya:", error);
                }
            } else if (!user) {
                // Jika belum login, tendang ke halaman login
                navigate('/login');
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [courses, navigate]);

    // 3. LOGIKA FILTER (Berjalan / Selesai)
    const filteredCourses = useMemo(() => {
        switch (activeTab) {
            case "Sedang Berjalan":
                // Tampilkan kelas yang progressnya di bawah 100%
                return myCourses.filter(c => (c.progress || 0) < 100);
            case "Selesai":
                // Tampilkan kelas yang progressnya 100%
                return myCourses.filter(c => (c.progress || 0) >= 100);
            case "Semua Kelas":
            default:
                return myCourses;
        }
    }, [activeTab, myCourses]);

    // Reset halaman saat ganti tab
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    // LOGIKA PAGINATION
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Layout>
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 font-poppins flex flex-col md:flex-row gap-8">

                {/* Sidebar Kiri */}
                <div className="w-full md:w-64 shrink-0">
                    <UserSidebar />
                </div>

                {/* Konten Kanan */}
                <div className="flex-1">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Kelas Saya</h2>
                        <p className="text-gray-500 text-sm md:text-base">Lanjutkan pembelajaran dan capai targetmu.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                        {/* Tab Filter */}
                        <div className="flex overflow-x-auto border-b border-gray-100 scrollbar-hide">
                            {["Semua Kelas", "Sedang Berjalan", "Selesai"].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                                        activeTab === tab ? "border-[#3ECF4C] text-[#3ECF4C]" : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Daftar Kelas */}
                        <div className="p-0">
                            {isLoading ? (
                                <div className="text-center py-16 text-gray-400">
                                    <i className="fa-solid fa-spinner fa-spin text-3xl mb-3 text-[#3ECF4C]"></i>
                                    <p className="font-medium">Memuat kelas Anda...</p>
                                </div>
                            ) : currentItems.length > 0 ? (
                                currentItems.map(course => {
                                    // SINKRONISASI DATA DINAMIS
                                    const progress = course.progress || 0;
                                    const totalMod = course.modules ? course.modules.length : (course.totalModules || 0);
                                    const completedMod = course.completedModules || 0;

                                    return (
                                        <div key={course.id} className="p-4 md:p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col md:flex-row gap-6">

                                                {/* Thumbnail */}
                                                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-gray-100 relative group cursor-pointer" onClick={() => navigate(`/learn/${course.id}`)}>
                                                    <img src={course.image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600"} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                                                            <i className="fa-solid fa-play text-[#3ECF4C] ml-1"></i>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex-1 flex flex-col">
                                                    {/* Header Info */}
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <span className="text-[10px] font-bold text-[#3ECF4C] uppercase tracking-wider bg-[#e8fbe9] px-2 py-1 rounded mb-2 inline-block">
                                                                {course.category || "Kategori"}
                                                            </span>
                                                            <Link to={`/learn/${course.id}`} className="block">
                                                                <h3 className="font-bold text-gray-900 text-lg hover:text-[#3ECF4C] transition-colors leading-snug line-clamp-2">
                                                                    {course.title}
                                                                </h3>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
                                                        <i className="fa-solid fa-user-tie"></i> Instruktur: <span className="font-semibold text-gray-700">{course.instructor?.name || "Admin"}</span>
                                                    </div>

                                                    {/* Progress Bar & Actions */}
                                                    <div className="mt-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
                                                        <div className="flex-1 max-w-md">
                                                            <div className="flex justify-between text-xs font-semibold mb-2">
                                                                <span className="text-gray-600">{completedMod} / {totalMod} Modul Selesai</span>
                                                                <span className={progress === 100 ? "text-[#3ECF4C]" : "text-gray-800"}>{progress}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                                                <div
                                                                    className={`h-2 rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-[#3ECF4C]' : 'bg-blue-500'}`}
                                                                    style={{ width: `${progress}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>

                                                        {progress === 100 ? (
                                                            <Link to={`/sertifikat/${course.id}`} className="block w-full md:w-auto px-6 py-2 border border-[#3ECF4C] text-[#3ECF4C] hover:bg-[#e8fbe9] text-sm font-bold rounded-lg transition-colors text-center shrink-0">
                                                                <i className="fa-solid fa-certificate mr-2"></i>Lihat Sertifikat
                                                            </Link>
                                                        ) : (
                                                            <Link to={`/learn/${course.id}`} className="block w-full md:w-auto px-6 py-2 bg-[#3ECF4C] hover:bg-green-600 text-white text-sm font-bold rounded-lg transition-colors text-center shrink-0 shadow-sm">
                                                                Lanjutkan
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200 m-6">
                                    <i className="fa-regular fa-folder-open text-4xl text-gray-300 mb-4"></i>
                                    <p className="text-gray-500 font-medium">Anda belum memiliki kelas yang berhasil dibeli.</p>
                                    <Link to="/" className="inline-block mt-4 text-[#3ECF4C] font-bold hover:underline">Jelajahi Kelas Sekarang</Link>
                                </div>
                            )}
                        </div>

                        {/* PAGINATION */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default KelasSaya;