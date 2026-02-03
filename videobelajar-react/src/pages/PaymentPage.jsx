import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import CheckoutNavbar from '../components/CheckoutNavbar';
import PaymentAccordion from '../components/PaymentAccordion';
import CheckoutFooter from '../components/CheckoutFooter';
import CountdownTimer from '../components/CountdownTimer';
import { coursesData, bankData } from '../data/coursesData';

const PaymentPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // 1. AMBIL DATA BANK DARI IMPORT (BUKAN LOKAL LAGI)
    const selectedBankId = location.state?.paymentMethod || "BCA";
    // Gunakan bankData yang diimpor
    const bank = bankData[selectedBankId] || bankData["BCA"];

    const [expandedSection, setExpandedSection] = useState("mobile");
    const [vaNumber, setVaNumber] = useState("");

    // 2. LOGIKA AMBIL & TRANSFORMASI DATA KURSUS
    const course = useMemo(() => {
        const rawCourse = coursesData.find((item) => item.id === parseInt(id));

        if (!rawCourse) return null;

        const isFree = rawCourse.id % 5 === 0;
        const priceNum = isFree ? 0 : 300000;
        const originalPriceNum = isFree ? 0 : 600000;

        return {
            ...rawCourse,
            img: rawCourse.image,
            priceNum: priceNum,
            priceDisplay: isFree ? "Gratis" : "Rp " + priceNum.toLocaleString('id-ID'),
            originalPriceDisplay: isFree ? "" : "Rp " + originalPriceNum.toLocaleString('id-ID'),
            benefits: [
                "Akses Selamanya",
                `${rawCourse.totalModules} Modul Materi`,
                "Sertifikat Kompetensi",
                "Grup Diskusi"
            ]
        };
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Generate VA Random
        const randomSuffix = Math.floor(1000000000 + Math.random() * 9000000000);
        setVaNumber(`${bank.vaCode}${randomSuffix}`);
    }, [id, bank]);

    // Handle Not Found
    if (!course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <div className="text-xl font-bold text-gray-600">Data pembayaran tidak ditemukan</div>
                <button onClick={() => navigate('/')} className="text-green-500 underline">Kembali ke Beranda</button>
            </div>
        );
    }

    const adminFee = course.priceNum === 0 ? 0 : 7000;
    const totalPayment = course.priceNum + adminFee;

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? "" : section);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(vaNumber.replace(/\s/g, ''));
        alert(`Nomor VA ${bank.name} berhasil disalin!`);
    };

    return (
        <div className="min-h-screen bg-[#FFFDF3] pb-20 font-poppins">

            <CheckoutNavbar step="payment" />

            {/* TIMER BAR */}
            <div className="bg-[#FFF2E2] py-4 text-center border-b border-orange/20 sticky top-[73px] md:top-[88px] z-40 shadow-sm">
                <div className="flex justify-center items-center gap-3 text-gray-700 font-medium text-sm md:text-base">
                    <span>Selesaikan pemesanan dalam</span>
                    <CountdownTimer />
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* === INFO KURSUS (KANAN) === */}
                    <div className="lg:col-span-1 lg:col-start-3 h-fit order-1 lg:order-2">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-40">
                            <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                                <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 leading-snug text-lg">{course.title}</h3>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-green-500 font-bold text-lg">{course.priceDisplay}</span>
                                {course.originalPriceNum > 0 && (
                                    <span className="text-gray-400 line-through text-sm">{course.originalPriceDisplay}</span>
                                )}
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-800 text-sm">Kelas Ini Sudah Termasuk</h4>
                                <ul className="text-sm text-gray-500 space-y-3">
                                    {course.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <i className="fa-regular fa-file-lines w-4 text-gray-400"></i> {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* === INSTRUKSI PEMBAYARAN (KIRI) === */}
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 space-y-8 order-2 lg:order-1">

                        <h2 className="text-2xl font-bold text-gray-900">Instruksi Pembayaran</h2>

                        {/* BOX VIRTUAL ACCOUNT */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-center">
                            <div className="flex justify-center items-center gap-4 mb-6">
                                <div className="h-10 flex items-center justify-center">
                                    <img src={bank.logo} alt={bank.name} className="h-full w-auto object-contain" />
                                </div>
                                <span className="font-bold text-gray-700 text-lg">{bank.name} Virtual Account</span>
                            </div>

                            <p className="text-gray-500 text-sm mb-2">Nomor Virtual Account</p>

                            <div className="flex justify-center items-center gap-4 mb-6 bg-gray-50 py-4 rounded-lg border border-gray-100 max-w-md mx-auto relative px-2">
                                <span className={`text-xl md:text-2xl font-bold tracking-wider break-all ${bank.themeColor}`}>
                                    {vaNumber}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className="text-[#FF5722] font-bold text-sm hover:underline absolute right-4 md:right-6 bg-white px-2 py-1 rounded shadow-sm md:shadow-none"
                                >
                                    Salin
                                </button>
                            </div>

                            <div className="text-sm text-gray-500">
                                Total Pembayaran: <span className="font-bold text-gray-900">Rp {totalPayment.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        {/* TATA CARA PEMBAYARAN */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Tata Cara Pembayaran</h2>

                            {/* Render Instruksi sesuai Bank */}
                            {bank.instructions.atm && (
                                <PaymentAccordion title={`ATM ${bank.name}`} isOpen={expandedSection === 'atm'} onToggle={() => toggleSection('atm')}>
                                    <ol className="list-decimal list-outside ml-5 text-sm text-gray-600 space-y-2 p-2">
                                        {bank.instructions.atm.map((step, idx) => <li key={idx} className="pl-1 leading-relaxed">{step}</li>)}
                                    </ol>
                                </PaymentAccordion>
                            )}

                            {bank.instructions.mobile && (
                                <PaymentAccordion title={`Mobile Banking ${bank.name}`} isOpen={expandedSection === 'mobile'} onToggle={() => toggleSection('mobile')}>
                                    <ol className="list-decimal list-outside ml-5 text-sm text-gray-600 space-y-2 p-2">
                                        {bank.instructions.mobile.map((step, idx) => <li key={idx} className="pl-1 leading-relaxed">{step}</li>)}
                                    </ol>
                                </PaymentAccordion>
                            )}

                            {bank.instructions.internet && (
                                <PaymentAccordion title={`Internet Banking ${bank.name}`} isOpen={expandedSection === 'internet'} onToggle={() => toggleSection('internet')}>
                                    <ol className="list-decimal list-outside ml-5 text-sm text-gray-600 space-y-2 p-2">
                                        {bank.instructions.internet.map((step, idx) => <li key={idx} className="pl-1 leading-relaxed">{step}</li>)}
                                    </ol>
                                </PaymentAccordion>
                            )}
                        </div>

                        {/* TOMBOL AKSI */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to={`/checkout/${id}`} className="flex-1 border border-green-500 text-green-600 font-bold py-3 rounded-lg hover:bg-green-50 transition-colors text-center">
                                Ganti Metode Pembayaran
                            </Link>
                            <Link
                                to={Math.random() > 0.5 ? "/payment-success" : "/payment-pending"}
                                className="flex-1 bg-[#3ECF4C] text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors shadow-md text-center flex items-center justify-center"
                            >
                                Cek Status Pembayaran
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            <CheckoutFooter />
        </div>
    );
};

export default PaymentPage;