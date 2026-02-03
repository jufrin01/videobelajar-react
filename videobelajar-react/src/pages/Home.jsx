import React, { useState, useMemo, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import { coursesData } from '../data/coursesData';
import { useNavigate } from 'react-router-dom';

const heroBg = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop";
const newsletterBg = "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop";

const Home = () => {
    const navigate = useNavigate(); // 2. INISIALISASI NAVIGATE

    const [activeTab, setActiveTab] = useState("Semua Kelas");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const categories = ["Semua Kelas", "Teknologi", "Bisnis", "Desain", "Pemasaran", "Pengembangan Diri"];

    const filteredCourses = useMemo(() => {
        if (activeTab === "Semua Kelas") {
            return coursesData;
        }

        return coursesData.filter(course => {
            const cat = course.category;
            switch (activeTab) {
                case "Teknologi":
                    return ["Programming", "Data Science", "IT Security"].includes(cat);
                case "Bisnis":
                    return ["Business", "Finance"].includes(cat);
                case "Desain":
                    return ["UI/UX Design", "Creative"].includes(cat);
                case "Pemasaran":
                    return ["Marketing"].includes(cat);
                case "Pengembangan Diri":
                    return ["Soft Skills", "Language"].includes(cat);
                default:
                    return true;
            }
        });
    }, [activeTab]);

    // RESET HALAMAN KE 1 SAAT GANTI KATEGORI
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    // HITUNG DATA UNTUK HALAMAN SAAT INI
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    // Fungsi ganti halaman
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        const element = document.getElementById('course-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 3. FUNGSI HANDLER KLIK KE CHECKOUT
    const handleCourseClick = (courseId) => {
        // Arahkan ke halaman checkout dengan ID kursus
        navigate(`/checkout/${courseId}`);
    };

    return (
        <Layout>

            {/* === HERO SECTION === */}
            <div className="relative w-full h-[500px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('${heroBg}')` }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Revolusi Pembelajaran: Temukan <br className="hidden md:block" />
                        Ilmu Baru melalui Platform Video Interaktif!
                    </h1>
                    <p className="text-gray-200 text-sm md:text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                        Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi.
                    </p>
                    <button className="bg-[#FF5722] hover:bg-[#e64a19] text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg transform hover:scale-105">
                        Temukan Video Course untuk Dipelajari!
                    </button>
                </div>
            </div>

            {/* === SECTION KOLEKSI VIDEO === */}
            <div id="course-section" className="w-full max-w-7xl mx-auto px-6 py-12 pb-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Koleksi Video Pembelajaran Unggulan</h2>
                    <p className="text-gray-500">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
                </div>

                {/* Tab Kategori */}
                <div className="flex flex-wrap items-center gap-6 mb-10 border-b border-gray-100 pb-1 overflow-x-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`pb-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                                activeTab === cat ? 'text-[#FF5722]' : 'text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {cat}
                            {activeTab === cat && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FF5722] rounded-t-md"></div>}
                        </button>
                    ))}
                </div>

                {/* Grid Kursus */}
                {currentCourses.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentCourses.map((course) => (
                                // 4. WRAPPER KLIK KE CHECKOUT
                                <div
                                    key={course.id}
                                    onClick={() => handleCourseClick(course.id)}
                                    className="cursor-pointer group"
                                >
                                    <CourseCard
                                        id={course.id} // Tetap kirim ID props
                                        img={course.image}
                                        title={course.title}
                                        desc={course.description}
                                        authorName={course.instructor.name}
                                        authorRole={course.instructor.role}
                                        authorImg={course.instructor.avatar}
                                        rating={course.rating}
                                        reviews={course.reviews}
                                        price="Rp 300K"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="text-center py-20 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <i className="fa-regular fa-folder-open text-4xl mb-4"></i>
                        <p>Belum ada kelas di kategori ini.</p>
                    </div>
                )}
            </div>

            {/* === NEWSLETTER SECTION === */}
            <div className="px-4 md:px-6 mb-20 mt-0">
                <div
                    className="relative w-full max-w-6xl mx-auto py-12 md:py-16 px-4 md:px-6 flex items-center justify-center bg-cover bg-center rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
                    style={{backgroundImage: `url('${newsletterBg}')`}}>

                    <div className="absolute inset-0 bg-black/70"></div>

                    <div className="relative z-10 text-center max-w-3xl mx-auto text-white w-full">
                        <span className="block text-xs md:text-sm font-semibold tracking-widest mb-3 uppercase text-gray-300">
                            Newsletter
                        </span>
                        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
                            Mau Belajar Lebih Banyak?
                        </h2>
                        <p className="text-gray-200 text-sm md:text-base mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">
                            Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari
                            program-program terbaik kami.
                        </p>

                        <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0 md:bg-white md:p-2 md:rounded-full md:shadow-lg max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="Masukkan Emailmu"
                                className="flex-1 px-6 py-3 rounded-full text-gray-700 focus:outline-none bg-white md:bg-transparent shadow-lg md:shadow-none text-center md:text-left"
                            />
                            <button
                                className="bg-[#FF5722] hover:bg-[#e64a19] text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg md:shadow-none">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Home;