import React, { useMemo, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

// 1. IMPORT FIREBASE CONTEXT (Bukan Data Statis)
import { CourseContext } from '../context/CourseContext';

const DetailProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 2. PANGGIL DATA DARI FIREBASE
    const { courses } = useContext(CourseContext);

    // State untuk Accordion Kurikulum
    const [openModuleIndex, setOpenModuleIndex] = useState(0);

    // 3. AMBIL DATA KURSUS (HAPUS parseInt KARENA ID FIREBASE BERUPA STRING)
    const course = useMemo(() => {
        if (!courses) return null;
        return courses.find(c => c.id === id);
    }, [courses, id]);

    // 4. AMBIL REKOMENDASI KELAS LAINNYA
    const relatedCourses = useMemo(() => {
        if (!courses) return [];
        return courses
            .filter(c => c.id !== id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
    }, [courses, id]);

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

    // LOADING ATAU TIDAK KETEMU
    if (!course) {
        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center font-poppins">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Mencari kelas... / Kelas tidak ditemukan</h2>
                    <button onClick={() => navigate('/')} className="text-[#3ECF4C] font-bold hover:underline">
                        Kembali ke Beranda
                    </button>
                </div>
            </Layout>
        );
    }

    // --- HELPER UNTUK TAMPILAN DINAMIS ---
    // 1. Menghitung jumlah video dan dokumen dengan aman
    const totalVideos = (course.modules || []).reduce((acc, mod) => acc + (mod.items || []).filter(i => i.type === 'video').length, 0);
    const totalDocs = (course.modules || []).reduce((acc, mod) => acc + (mod.items || []).filter(i => i.type === 'doc').length, 0);

    // 2. Format Harga Dinamis
    const priceVal = Number(course.price) || 0;
    const isFree = priceVal === 0;
    const priceDisplay = isFree ? "Gratis" : `Rp ${priceVal.toLocaleString('id-ID')}`;
    const originalPriceDisplay = isFree ? "" : `Rp ${(priceVal + 450000).toLocaleString('id-ID')}`; // Logika diskon UI

    return (
        <Layout>
            <div className="font-poppins bg-[#FFFDF3] min-h-screen">

                {/* --- 1. HERO SECTION (Gelap) --- */}
                <div className="bg-[#1C1D20] text-white pt-12 pb-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                    <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
                        {/* Breadcrumb */}
                        <div className="text-xs text-gray-400 mb-6 flex items-center gap-2">
                            <span className="cursor-pointer hover:text-white" onClick={()=>navigate('/')}>Beranda</span> /
                            <span className="cursor-pointer hover:text-white" onClick={()=>navigate('/kategori')}>{course.category || "Kategori"}</span> /
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
                                        <i key={i} className={`fa-solid fa-star ${i < Math.floor(course.rating || 0) ? '' : 'text-gray-600'}`}></i>
                                    ))}
                                </div>
                                <span className="font-bold text-white">{course.rating || 0} ({course.reviews || 0})</span>
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
                                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-start">
                                        <img src={course.instructor?.avatar || `https://ui-avatars.com/api/?name=${course.instructor?.name || 'A'}`} alt="Tutor" className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900">{course.instructor?.name || "Nama Tutor"}</h4>
                                            <p className="text-xs text-gray-500 mb-2">{course.instructor?.role || "Tutor"}</p>
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
                                                        {(module.items || []).map((item, itemIdx) => (
                                                            <div key={itemIdx} className="flex justify-between text-sm text-gray-600 items-center">
                                                                <div className="flex items-center gap-3">
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
                                        <div className="p-5 text-center text-gray-500 text-sm">Modul sedang disiapkan oleh Tutor.</div>
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
                                    <span className="text-[#3ECF4C] font-bold text-2xl">{priceDisplay}</span>
                                    {originalPriceDisplay && (
                                        <>
                                            <span className="text-gray-400 text-sm line-through">{originalPriceDisplay}</span>
                                            <span className="bg-yellow-400 text-white text-[10px] font-bold px-2 py-0.5 rounded">Diskon</span>
                                        </>
                                    )}
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
                                            <i className="fa-solid fa-video text-gray-400 w-4"></i> {totalVideos > 0 ? totalVideos : '0'} Video
                                        </li>
                                        <li className="flex items-center gap-2 text-xs text-gray-600">
                                            <i className="fa-solid fa-file-lines text-gray-400 w-4"></i> {totalDocs > 0 ? totalDocs : '0'} Dokumen
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
                {relatedCourses.length > 0 && (
                    <div className="bg-[#FFFDF3] py-10 border-t border-gray-100">
                        <div className="max-w-7xl mx-auto px-5 md:px-10">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Video Pembelajaran Terkait Lainnya</h3>
                            <p className="text-gray-500 text-sm mb-6">Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedCourses.map((relCourse) => (
                                    <div
                                        key={relCourse.id}
                                        onClick={() => {
                                            navigate(`/course/${relCourse.id}`);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
                                    >
                                        <div className="aspect-video bg-gray-200 relative shrink-0">
                                            <img src={relCourse.image || relCourse.imageUrl} alt={relCourse.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="p-4 flex flex-col flex-1">
                                            <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{relCourse.title}</h4>
                                            <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">{relCourse.description}</p>

                                            <div className="flex items-center gap-2 mb-3 mt-auto">
                                                <img src={relCourse.instructor?.avatar || `https://ui-avatars.com/api/?name=${relCourse.instructor?.name || 'A'}`} alt="Instructor" className="w-6 h-6 rounded-full" />
                                                <span className="text-xs font-bold text-gray-700 truncate">{relCourse.instructor?.name || "Instruktur"}</span>
                                            </div>

                                            <div className="flex justify-between items-center mt-2">
                                                <div className="flex text-yellow-400 text-[10px] gap-0.5 items-center">
                                                    <i className="fa-solid fa-star"></i>
                                                    <span className="text-gray-500 ml-1 font-medium">{relCourse.rating || 0} ({relCourse.reviews || 0})</span>
                                                </div>
                                                <span className="text-[#3ECF4C] font-bold text-sm">
                                                    {Number(relCourse.price) === 0 ? "Gratis" : `Rp ${Number(relCourse.price).toLocaleString('id-ID')}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </Layout>
    );
};

export default DetailProduct;