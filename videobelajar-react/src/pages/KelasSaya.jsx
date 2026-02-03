import React, { useState, useMemo, useEffect } from 'react';
import Layout from '../components/Layout';
import UserSidebar from '../components/UserSidebar';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { coursesData } from '../data/coursesData';

const KelasSaya = () => {
    const [activeTab, setActiveTab] = useState("Semua Kelas");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // LOGIKA FILTER
    const filteredCourses = useMemo(() => {
        switch (activeTab) {
            case "Sedang Berjalan":
                return coursesData.filter(c => c.progress < 100);
            case "Selesai":
                return coursesData.filter(c => c.progress === 100);
            case "Semua Kelas":
            default:
                return coursesData;
        }
    }, [activeTab]);

    // Reset halaman saat ganti tab
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    // LOGIKA PAGINATION
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(pageNumber);
    };

    return (
        <Layout>
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 font-poppins">

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Kelas Saya</h2>
                    <p className="text-gray-500">Lanjutkan pembelajaran kelas yang Anda miliki.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <UserSidebar activeMenu="Kelas Saya" />
                    </div>

                    <div className="lg:col-span-3">
                        {/* TABS */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
                            <div className="flex flex-wrap gap-6 border-b border-gray-100 pb-4">
                                {["Semua Kelas", "Sedang Berjalan", "Selesai"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-2 text-sm font-semibold transition-all relative ${
                                            activeTab === tab ? 'text-[#FF5722]' : 'text-gray-500 hover:text-gray-800'
                                        }`}
                                    >
                                        {tab}
                                        {activeTab === tab && <span className="absolute bottom-[-17px] left-0 w-full h-[3px] bg-[#FF5722] rounded-t-full"></span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* LIST KURSUS */}
                        <div className="space-y-6 min-h-[500px]">
                            {currentItems.length > 0 ? (
                                currentItems.map((course) => (
                                    <div key={course.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6 items-start">
                                            <img src={course.image} alt={course.title} className="w-full h-40 md:w-48 md:h-32 rounded-lg object-cover flex-shrink-0" />
                                            <div className="flex-1 w-full">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-lg text-gray-900 line-clamp-2 pr-4">{course.title}</h4>
                                                    {course.progress === 100 && (
                                                        <span className="shrink-0 px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full border border-green-200">Selesai</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <img src={course.instructor.avatar} alt="Instructor" className="w-8 h-8 rounded-full border border-gray-100" />
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800">{course.instructor.name}</p>
                                                        <p className="text-xs text-gray-500">{course.instructor.role}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                                                        <span>Progres Kelas</span>
                                                        <span>{course.progress}%</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full transition-all duration-500 ${course.progress === 100 ? 'bg-green-500' : 'bg-[#FF5722]'}`} style={{ width: `${course.progress}%` }}></div>
                                                    </div>
                                                </div>

                                                {/* === UPDATE TOMBOL AKSI DI SINI === */}
                                                <div className="mt-4">
                                                    {course.progress === 100 ? (
                                                        <div className="flex flex-col sm:flex-row gap-3">
                                                            {/* Tombol Sertifikat */}
                                                            <Link
                                                                to={`/certificate/${course.id}`}
                                                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-lg transition-colors text-center flex items-center justify-center gap-2 flex-1"
                                                            >
                                                                <i className="fa-solid fa-certificate"></i> Lihat Sertifikat
                                                            </Link>

                                                            {/* Tombol Detail Kelas (Baru) */}
                                                            <Link
                                                                to={`/learn/${course.id}`}
                                                                className="px-4 py-2 bg-white border border-green-500 text-green-600 hover:bg-green-50 text-sm font-bold rounded-lg transition-colors text-center flex-1"
                                                            >
                                                                Detail Kelas
                                                            </Link>
                                                        </div>
                                                    ) : (
                                                        <Link to={`/learn/${course.id}`} className="block w-full px-4 py-2 bg-[#3ECF4C] hover:bg-green-600 text-white text-sm font-bold rounded-lg transition-colors text-center">
                                                            Lanjutkan Pembelajaran
                                                        </Link>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <i className="fa-regular fa-folder-open text-4xl text-gray-300 mb-4"></i>
                                    <p className="text-gray-500 font-medium">Tidak ada kelas di kategori ini.</p>
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