import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import { coursesData } from '../data/coursesData';

const Certificate = () => {
    // 1. AMBIL ID DARI URL
    const { id } = useParams();

    const user = JSON.parse(localStorage.getItem("user"));

    // 2. CARI DATA KURSUS
    const course = useMemo(() => {
        return coursesData.find(c => c.id === parseInt(id));
    }, [id]);

    const studentName = user ? user.name : "Nama Peserta";
    const ceoName = "Jufrin";

    // 3. GENERATE NOMOR SERTIFIKAT
    const certificateNumber = useMemo(() => {
        if (!course) return "";
        const paddedId = course.id.toString().padStart(3, '0');
        const randomCode = Math.floor(10000 + Math.random() * 90000);
        return `RL/2025/${paddedId}/CERT-${randomCode}`;
    }, [course]);

    const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const handlePrint = () => {
        window.print();
    };

    if (!course) return (
        <Layout>
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-10 font-poppins">
                <div className="text-6xl text-gray-300 mb-4"><i className="fa-regular fa-folder-open"></i></div>
                <h2 className="text-xl font-bold text-gray-700">Data sertifikat tidak ditemukan.</h2>
                <Link to="/kelas-saya" className="mt-4 text-[#3ECF4C] font-bold hover:underline">Kembali ke Kelas Saya</Link>
            </div>
        </Layout>
    );

    // --- 4. KONFIGURASI BREADCRUMB SINKRON ---
    const breadcrumbItems = [
        { label: 'Beranda', path: '/home' },
        { label: 'Kelas Saya', path: '/kelas-saya' },
        // Kategori -> Link ke "Detail Kursus" (Sesuai App.jsx: /course/:id)
        { label: course.category, path: `/course/${course.id}` },
        // Judul Kursus -> Link ke "Modul Pelajaran" (Sesuai App.jsx: /learn/:id)
        { label: course.title, path: `/learn/${course.id}` },
        // Halaman Aktif
        { label: 'Sertifikat', path: null }
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-[#FFFDF3] font-poppins p-4 md:p-10 pb-20">

                <style>
                    {`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;600;700&display=swap');`}
                </style>

                {/* --- 5. GUNAKAN COMPONENT BREADCRUMB --- */}
                <Breadcrumb items={breadcrumbItems} />

                {/* --- CARD CONTAINER UTAMA --- */}
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 print:shadow-none print:border-none print:p-0 print:w-full">

                    {/* PREVIEW AREA */}
                    <div className="bg-[#FAFAFA] rounded-2xl p-4 md:p-8 flex justify-center items-center mb-8 print:p-0 print:bg-white print:mb-0">

                        {/* Desain Sertifikat */}
                        <div className="bg-white w-full max-w-[900px] aspect-[1.5/1] shadow-xl relative overflow-hidden flex flex-col items-center justify-between py-10 px-8 md:py-16 md:px-20 text-center select-none print:shadow-none print:w-full print:h-screen print:max-w-none print:aspect-auto">

                            {/* ORNAMEN BACKGROUND */}
                            <div className="absolute bottom-0 left-0 w-[20%] h-[40%] bg-[#00A99D] rounded-tr-[100%] opacity-90 z-0"></div>
                            <div className="absolute bottom-0 left-0 w-[15%] h-[30%] bg-[#3ECF4C] rounded-tr-[80%] opacity-80 z-0 ml-4 mb-[-10px]"></div>
                            <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-[#FFC107] rounded-full opacity-20 z-0 blur-3xl"></div>
                            <div className="absolute top-0 right-0 w-[15%] h-[30%] bg-[#FFC107] rounded-bl-[100%] opacity-90 z-0"></div>
                            <div className="absolute top-[20%] left-[10%] w-4 h-4 bg-[#FFC107] rounded-full opacity-60"></div>
                            <div className="absolute bottom-[20%] right-[10%] w-6 h-6 bg-[#3ECF4C] rounded-full opacity-40"></div>

                            {/* KONTEN */}
                            <div className="relative z-10 w-full h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <span className="text-[#FF5722] font-bold text-sm tracking-widest">video<span className="text-gray-800">belajar</span></span>
                                    </div>
                                    <h1 className="text-3xl md:text-6xl font-bold text-[#1a2e35] font-['Playfair_Display'] mb-2">Certificate</h1>
                                    <p className="text-lg md:text-2xl text-gray-500 font-['Playfair_Display'] italic">of Completion</p>
                                </div>

                                <div>
                                    <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mb-4">Proudly presented to</p>
                                    <h2 className="text-3xl md:text-6xl lg:text-7xl text-[#FFC107] font-['Great_Vibes'] mb-4 drop-shadow-sm pb-2 leading-tight">{studentName}</h2>
                                    <div className="w-1/2 h-[1px] bg-gray-200 mx-auto mb-4"></div>
                                    <p className="text-gray-600 text-xs md:text-base max-w-lg mx-auto leading-relaxed">
                                        For successfully completing the course <br/>
                                        <b className="text-gray-800 text-lg">"{course.title}"</b><br/>
                                        <span className="text-gray-400 text-xs mt-2 block">Given this {date}, at Jakarta, Indonesia</span>
                                    </p>
                                </div>

                                <div className="flex justify-between items-end px-4 md:px-12 mt-4">
                                    <div className="text-center min-w-[120px]">
                                        <div className="text-lg md:text-3xl font-['Great_Vibes'] text-gray-800 mb-1">{ceoName}</div>
                                        <div className="h-[1px] w-full bg-gray-300 mx-auto mb-1"></div>
                                        <p className="text-[8px] md:text-xs font-bold text-gray-700">Teddy Yu</p>
                                        <p className="text-[7px] md:text-[10px] text-gray-400">Creative Producer</p>
                                    </div>
                                    <div className="mb-2 hidden sm:block">
                                        <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-full border-4 border-[#FFC107] flex items-center justify-center shadow-md"><i className="fa-solid fa-star text-2xl md:text-4xl text-[#3ECF4C]"></i></div>
                                    </div>
                                    <div className="text-center min-w-[120px]">
                                        <div className="text-lg md:text-3xl font-['Great_Vibes'] text-gray-800 mb-1">Olivia Wilson</div>
                                        <div className="h-[1px] w-full bg-gray-300 mx-auto mb-1"></div>
                                        <p className="text-[8px] md:text-xs font-bold text-gray-700">Olivia Wilson</p>
                                        <p className="text-[7px] md:text-[10px] text-gray-400">Chief Executive</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DETAIL & DOWNLOAD */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 print:hidden">
                        <div className="flex-1">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{course.title}</h2>
                            <p className="text-gray-500 text-sm mb-6 max-w-2xl">{course.description || "Mulai transformasi dengan instruktur profesional."}</p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-200"><img src={course.instructor.avatar} alt="Instructor" className="w-full h-full object-cover" /></div>
                                    <div><p className="text-sm font-bold text-gray-900">{course.instructor.name}</p><p className="text-xs text-gray-500">{course.instructor.role}</p></div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                                    <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                                    <span className="text-sm text-gray-500 underline ml-1 decoration-gray-300">({course.reviews} Reviews)</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={handlePrint} className="w-full md:w-auto border border-[#3ECF4C] text-[#3ECF4C] hover:bg-green-50 px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 group">
                            <i className="fa-solid fa-download group-hover:scale-110 transition-transform"></i> Download Sertifikat
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    @page { size: landscape; margin: 0; }
                    body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    .print\\:hidden { display: none !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    .print\\:border-none { border: none !important; }
                    .print\\:bg-white { background: white !important; }
                    .print\\:p-0 { padding: 0 !important; }
                    .print\\:w-full { width: 100vw !important; max-width: none !important; }
                    .print\\:h-screen { height: 100vh !important; }
                    .min-h-screen { padding: 0 !important; background: white !important; }
                }
            `}</style>
        </Layout>
    );
};

export default Certificate;