import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { coursesData } from '../data/coursesData';

const DetailProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // State untuk Accordion Kurikulum
    const [openModuleIndex, setOpenModuleIndex] = useState(0);

    //Ambil Data Kursus (Pastikan ID berupa angka)
    const course = useMemo(() => {
        return coursesData.find(c => c.id === parseInt(id));
    }, [id]);

    // Ambil Rekomendasi Kelas (Kecuali kelas ini)
    const relatedCourses = useMemo(() => {
        return coursesData
            .filter(c => c.id !== parseInt(id)) // Buang kelas yang sedang dibuka
            .sort(() => 0.5 - Math.random())    // Acak urutan
            .slice(0, 3);                       // Ambil 3
    }, [id]);

    // Handle Tombol Beli
    const handleBuy = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Silakan login terlebih dahulu untuk membeli kelas.");
            navigate("/login");
        } else {
            navigate(`/checkout/${course.id}`);
        }
    };

    // Toggle Accordion
    const toggleAccordion = (index) => {
        setOpenModuleIndex(openModuleIndex === index ? -1 : index);
    };


    if (!course) {
        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center font-poppins">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Kelas tidak ditemukan</h2>
                    <button onClick={() => navigate('/')} className="text-[#3ECF4C] font-bold hover:underline">
                        Kembali ke Beranda
                    </button>
                </div>
            </Layout>
        );
    }

    // Helper: Hitung total durasi / materi (Opsional)
    const totalVideos = course.modules.reduce((acc, mod) => acc + mod.items.filter(i => i.type === 'video').length, 0);
    const totalDocs = course.modules.reduce((acc, mod) => acc + mod.items.filter(i => i.type === 'doc').length, 0);

    return (
        <Layout>
            <div className="font-poppins bg-[#FFFDF3] min-h-screen">

                {/* --- 1. HERO SECTION (Gelap) --- */}
                <div className="bg-[#1C1D20] text-white pt-12 pb-16 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                    <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
                        {/* Breadcrumb */}
                        <div className="text-xs text-gray-400 mb-6 flex items-center gap-2">
                            <span className="cursor-pointer hover:text-white" onClick={()=>navigate('/')}>Beranda</span> /
                            <span className="cursor-pointer hover:text-white" onClick={()=>navigate('/kategori')}>{course.category}</span> /
                            <span className="text-white font-medium truncate max-w-[200px]">{course.title}</span>
                        </div>

                        <div className="max-w-4xl">
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                                Gapai Karier Impianmu sebagai Seorang <br/>
                                <span className="text-[#3ECF4C]">{course.title}</span>
                            </h1>
                            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-2xl leading-relaxed">
                                {course.description}
                            </p>

                            {/* Rating Stars */}
                            <div className="flex items-center gap-2 text-sm">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={`fa-solid fa-star ${i < Math.floor(course.rating) ? '' : 'text-gray-600'}`}></i>
                                    ))}
                                </div>
                                <span className="font-bold text-white">{course.rating} ({course.reviews})</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 2. MAIN CONTENT (Grid Layout) --- */}
                <div className="max-w-7xl mx-auto px-5 md:px-10 py-10">
                    <div className="flex flex-col lg:flex-row gap-10 relative">

                        {/* === KOLOM KIRI (Konten) === */}
                        <div className="flex-1 space-y-10">

                            {/* Deskripsi */}
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Deskripsi</h3>
                                <p className="text-gray-600 leading-relaxed text-sm text-justify">
                                    {course.description} Materi ini disusun secara komprehensif untuk membantu Anda menguasai keahlian {course.category} dari dasar hingga tingkat lanjut.
                                </p>
                            </section>

                            {/* Tutor Profesional (Dinamis) */}
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Belajar bersama Tutor Profesional</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Tutor Utama */}
                                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-start">
                                        <img src={course.instructor.avatar} alt="Tutor" className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900">{course.instructor.name}</h4>
                                            <p className="text-xs text-gray-500 mb-2">{course.instructor.role}</p>
                                            <p className="text-xs text-gray-600 leading-relaxed">
                                                Instruktur profesional berpengalaman yang siap membimbing Anda dalam {course.title}.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Kurikulum (Accordion SINKRON DATA) */}
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Kamu akan Mempelajari</h3>
                                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    {course.modules && course.modules.length > 0 ? (
                                        course.modules.map((module, idx) => (
                                            <div key={idx} className="border-b border-gray-100 last:border-0">
                                                <button
                                                    onClick={() => toggleAccordion(idx)}
                                                    className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                                                >
                                                    <span className="font-bold text-[#3ECF4C] text-sm text-left">{module.title}</span>
                                                    <i className={`fa-solid fa-chevron-down text-gray-400 transition-transform ${openModuleIndex === idx ? 'rotate-180' : ''}`}></i>
                                                </button>

                                                {/* Isi Modul */}
                                                {openModuleIndex === idx && (
                                                    <div className="p-4 space-y-3 bg-white animate-fade-in-down">
                                                        {module.items.map((item, itemIdx) => (
                                                            <div key={itemIdx} className="flex justify-between text-sm text-gray-600 items-center">
                                                                <div className="flex items-center gap-3">
                                                                    {/* Ikon sesuai tipe */}
                                                                    {item.type === 'video' ? <i className="fa-regular fa-circle-play text-gray-400"></i> :
                                                                        item.type === 'quiz' ? <i className="fa-regular fa-clipboard-question text-gray-400"></i> :
                                                                            <i className="fa-regular fa-file-lines text-gray-400"></i>}

                                                                    <span>{item.title}</span>
                                                                </div>
                                                                <span className="text-gray-400 text-xs shrink-0">{item.time || "5 Menit"}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-5 text-center text-gray-500 text-sm">Belum ada modul yang tersedia.</div>
                                    )}
                                </div>
                            </section>

                            {/* Rating dan Review (SINKRON DATA) */}
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Rating dan Review</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.userReviews && course.userReviews.length > 0 ? (
                                        course.userReviews.map((review, idx) => (
                                            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <img src={review.avatar} alt="User" className="w-10 h-10 rounded-full border border-gray-100" />
                                                    <div>
                                                        <h5 className="font-bold text-sm text-gray-900">{review.name}</h5>
                                                        <p className="text-xs text-gray-400">{review.role}</p>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-600 leading-relaxed mb-3">"{review.comment}"</p>
                                                <div className="flex text-yellow-400 text-xs gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <i key={i} className={`fa-solid fa-star ${i < review.rating ? '' : 'text-gray-300'}`}></i>
                                                    ))}
                                                    <span className="text-gray-400 ml-2">{review.rating}.0</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-2 text-center text-gray-400 text-sm py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                            Belum ada review untuk kelas ini.
                                        </div>
                                    )}
                                </div>
                            </section>

                        </div>

                        {/* === KOLOM KANAN (Sidebar Sticky) === */}
                        <div className="w-full lg:w-[350px] shrink-0">
                            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h3 className="font-bold text-gray-900 text-lg mb-4 leading-tight">
                                    Gapai Karier Impianmu sebagai Seorang <span className="text-[#3ECF4C]">{course.title}</span>.
                                </h3>

                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-[#3ECF4C] font-bold text-2xl">Rp 300K</span>
                                    <span className="text-gray-400 text-sm line-through">Rp 750K</span>
                                    <span className="bg-yellow-400 text-white text-[10px] font-bold px-2 py-0.5 rounded">Diskon 60%</span>
                                </div>
                                <p className="text-blue-500 text-xs font-semibold mb-6 cursor-pointer hover:underline">Penawaran berakhir sebentar lagi!</p>

                                <button
                                    onClick={handleBuy}
                                    className="w-full bg-[#3ECF4C] hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-md transition-all active:scale-95 mb-6"
                                >
                                    Beli Sekarang
                                </button>

                                <div className="space-y-4">
                                    <h4 className="font-bold text-gray-900 text-sm">Kelas Ini Sudah Termasuk</h4>
                                    <ul className="grid grid-cols-2 gap-3">
                                        <li className="flex items-center gap-2 text-xs text-gray-600">
                                            <i className="fa-solid fa-video text-gray-400 w-4"></i> {totalVideos > 0 ? totalVideos : '12'} Video
                                        </li>
                                        <li className="flex items-center gap-2 text-xs text-gray-600">
                                            <i className="fa-solid fa-file-lines text-gray-400 w-4"></i> {totalDocs > 0 ? totalDocs : '5'} Dokumen
                                        </li>
                                        <li className="flex items-center gap-2 text-xs text-gray-600">
                                            <i className="fa-solid fa-file-pen text-gray-400 w-4"></i> Pretest
                                        </li>
                                        <li className="flex items-center gap-2 text-xs text-gray-600">
                                            <i className="fa-solid fa-infinity text-gray-400 w-4"></i> Seumur Hidup
                                        </li>
                                        <li className="flex items-center gap-2 text-xs text-gray-600">
                                            <i className="fa-solid fa-certificate text-gray-400 w-4"></i> Sertifikat
                                        </li>
                                    </ul>
                                </div>

                                <div className="border-t border-gray-100 my-6"></div>

                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm mb-2">Bahasa Pengantar</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <i className="fa-solid fa-globe text-gray-400"></i> Bahasa Indonesia
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- 3. VIDEO PEMBELAJARAN TERKAIT (SINKRON DATA) --- */}
                <div className="bg-[#FFFDF3] py-10 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-5 md:px-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Video Pembelajaran Terkait Lainnya</h3>
                        <p className="text-gray-500 text-sm mb-6">Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedCourses.map((relCourse) => (
                                <div
                                    key={relCourse.id}
                                    onClick={() => navigate(`/course/${relCourse.id}`)} // Navigate ke detail course lain
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
                                >
                                    <div className="aspect-video bg-gray-200 relative shrink-0">
                                        <img src={relCourse.image} alt={relCourse.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{relCourse.title}</h4>
                                        <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">{relCourse.description}</p>

                                        <div className="flex items-center gap-2 mb-3 mt-auto">
                                            <img src={relCourse.instructor.avatar} alt="Instructor" className="w-6 h-6 rounded-full" />
                                            <span className="text-xs font-bold text-gray-700 truncate">{relCourse.instructor.name}</span>
                                        </div>

                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex text-yellow-400 text-[10px] gap-0.5 items-center">
                                                <i className="fa-solid fa-star"></i>
                                                <span className="text-gray-500 ml-1 font-medium">{relCourse.rating} ({relCourse.reviews})</span>
                                            </div>
                                            <span className="text-[#3ECF4C] font-bold text-sm">Rp 300K</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- MOBILE STICKY BUTTON --- */}
                <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-40 flex justify-between items-center shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-xs line-through">Rp 750K</span>
                        <span className="text-[#3ECF4C] font-bold text-lg">Rp 300K</span>
                    </div>
                    <button onClick={handleBuy} className="bg-[#3ECF4C] text-white font-bold py-2.5 px-8 rounded-lg shadow-sm">
                        Beli Sekarang
                    </button>
                </div>

            </div>
        </Layout>
    );
};

export default DetailProduct;