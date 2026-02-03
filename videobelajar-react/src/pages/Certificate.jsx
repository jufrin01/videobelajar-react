import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { coursesData } from '../data/coursesData';

const Certificate = () => {
    const { id } = useParams();

    const course = useMemo(() => {
        return coursesData.find(c => c.id === parseInt(id));
    }, [id]);

    const studentName = "Jufrin Abdul Hamid";
    const ceoName = "Jufrin";

    // GENERATE NOMOR
    const certificateNumber = useMemo(() => {
        if (!course) return "";
        const paddedId = course.id.toString().padStart(3, '0');
        const randomCode = Math.floor(10000 + Math.random() * 90000);
        return `RL/2025/${paddedId}/CERT-${randomCode}`;
    }, [course]);

    // TANGGAL
    const date = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const handlePrint = () => {
        window.print();
    };

    if (!course) return <div className="text-center p-10 font-poppins">Data tidak ditemukan.</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-poppins">

            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;700&display=swap');`}
            </style>

            {/* --- TOMBOL NAVIGASI (MOBILE RESPONSIVE) --- */}
            <div className="w-full max-w-[1100px] flex flex-col md:flex-row justify-between mb-6 gap-3 print:hidden">
                <Link to="/kelas-saya?tab=Selesai" className="bg-white border border-gray-300 text-gray-700 px-4 py-3 md:py-2 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2 text-sm md:text-base">
                    <i className="fa-solid fa-arrow-left"></i> Kembali
                </Link>

                {/* Tombol Print (Sembunyikan di HP karena print dari HP jarang support layout complex, tapi tetap ada) */}
                <button
                    onClick={handlePrint}
                    className="bg-[#3ECF4C] hover:bg-green-600 text-white px-6 py-3 md:py-2 rounded-lg font-bold shadow-md transition-transform transform hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                    <i className="fa-solid fa-print"></i> Download PDF
                </button>
            </div>

            {/* --- AREA SERTIFIKAT (RESPONSIVE SCALING) --- */}
            {/* Aspect Ratio dikunci agar bentuknya selalu sertifikat */}
            <div className="bg-white w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl relative border-[4px] md:border-[10px] border-double border-[#3ECF4C] print:shadow-none print:w-full print:h-full print:border-none print:m-0 overflow-hidden select-none">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] print:opacity-10"></div>

                {/* Hiasan Sudut (Ukuran disesuaikan Mobile/Desktop) */}
                <div className="absolute top-2 left-2 w-8 h-8 md:top-4 md:left-4 md:w-16 md:h-16 border-t-2 border-l-2 md:border-t-4 md:border-l-4 border-[#FFC107]"></div>
                <div className="absolute top-2 right-2 w-8 h-8 md:top-4 md:right-4 md:w-16 md:h-16 border-t-2 border-r-2 md:border-t-4 md:border-r-4 border-[#FFC107]"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 md:bottom-4 md:left-4 md:w-16 md:h-16 border-b-2 border-l-2 md:border-b-4 md:border-l-4 border-[#FFC107]"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 md:bottom-4 md:right-4 md:w-16 md:h-16 border-b-2 border-r-2 md:border-b-4 md:border-r-4 border-[#FFC107]"></div>

                {/* KONTEN UTAMA (Padding Responsive: p-4 di HP, p-14 di Desktop) */}
                <div className="relative z-10 flex flex-col h-full justify-between py-4 px-4 md:py-8 md:px-14 text-center">

                    {/* Header */}
                    <div>
                        <div className="flex justify-center items-center gap-1 md:gap-2 mb-1 md:mb-2 opacity-80">
                            <i className="fa-solid fa-graduation-cap text-lg md:text-4xl text-[#3ECF4C]"></i>
                            <span className="text-[8px] md:text-xl font-bold tracking-widest text-gray-700 uppercase">Riselearn Academy</span>
                        </div>
                        {/* Judul Besar Responsif */}
                        <h1 className="text-xl md:text-6xl font-serif font-bold text-gray-800 mb-1 md:mb-3 uppercase tracking-wide leading-tight font-['Playfair_Display']">
                            Sertifikat Kompetensi
                        </h1>
                        <p className="text-gray-500 text-[8px] md:text-base tracking-[0.15em] uppercase font-semibold font-mono">
                            No: {certificateNumber}
                        </p>
                    </div>

                    {/* Body */}
                    <div className="flex-1 flex flex-col justify-center my-2 md:my-0">
                        <p className="text-gray-600 text-[10px] md:text-xl italic mb-1 md:mb-3 font-serif">Diberikan kepada:</p>

                        {/* Nama Siswa */}
                        <h2 className="text-lg md:text-5xl font-bold text-[#1a1a1a] mb-2 md:mb-6 font-['Playfair_Display'] border-b md:border-b-2 border-gray-200 inline-block pb-1 md:pb-4 px-4 md:px-12 mx-auto">
                            {studentName}
                        </h2>

                        <p className="text-gray-600 text-[10px] md:text-xl mb-1 md:mb-3 font-serif">Atas keberhasilannya menyelesaikan kelas:</p>

                        {/* Judul Kursus */}
                        <h3 className="text-sm md:text-4xl font-bold text-[#3ECF4C] max-w-4xl mx-auto leading-tight font-['Playfair_Display'] px-2">
                            "{course.title}"
                        </h3>
                    </div>

                    {/* Footer / Signatures */}
                    <div className="flex justify-between items-end px-2 md:px-16 mt-2 md:mt-4">

                        {/* Tanggal */}
                        <div className="text-left mb-1 md:mb-2">
                            <p className="text-gray-500 text-[8px] md:text-sm mb-0 md:mb-1 font-serif italic">Diterbitkan pada:</p>
                            <p className="font-bold text-gray-800 text-[9px] md:text-lg capitalize">{date}</p>
                            <p className="text-[7px] md:text-xs text-gray-400 mt-0 md:mt-1">Jakarta, Indonesia</p>
                        </div>

                        {/* Tanda Tangan CEO */}
                        <div className="text-center relative min-w-[80px] md:min-w-[200px]">

                            {/* TANDA TANGAN NATURAL (Ukuran Responsif) */}
                            <div
                                className="text-3xl md:text-7xl text-gray-800 mb-0 transform -rotate-3 origin-bottom-left"
                                style={{
                                    fontFamily: "'Great Vibes', cursive",
                                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                                    color: "#1a202c"
                                }}
                            >
                                {ceoName}
                            </div>

                            <div className="h-[1px] md:h-[2px] w-full bg-gray-800 mx-auto mb-1 md:mb-2 mt-[-5px] md:mt-[-10px] relative z-10 opacity-80"></div>

                            <p className="font-bold text-gray-900 text-[9px] md:text-lg">{ceoName}</p>
                            <p className="text-[7px] md:text-sm text-gray-500 uppercase tracking-wider font-bold">Chief Executive Officer</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Hint Rotasi Layar (Hanya Muncul di Mobile Portrait) */}
            <div className="mt-4 md:hidden text-center text-gray-500 text-xs flex items-center gap-2 justify-center bg-white p-2 rounded-full shadow-sm border border-gray-200">
                <i className="fa-solid fa-mobile-screen-button fa-rotate-90"></i>
                Putar layar Anda (Landscape) untuk tampilan sertifikat terbaik.
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    @page { 
                        size: landscape; 
                        margin: 0cm;
                    }
                    body { 
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important; 
                        margin: 0; 
                        padding: 0; 
                    }
                    .print\\:hidden { display: none !important; }
                    .min-h-screen { 
                        height: 100vh; 
                        width: 100vw;
                        background: white; 
                        padding: 0; 
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default Certificate;