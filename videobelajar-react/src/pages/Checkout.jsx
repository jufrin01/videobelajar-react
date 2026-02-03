import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CheckoutNavbar from '../components/CheckoutNavbar';
import PaymentAccordion from '../components/PaymentAccordion';
import PaymentOption from '../components/PaymentOption';
import CheckoutFooter from '../components/CheckoutFooter';

// 1. DATA DUMMY KURSUS
const COURSES_DATA = [
    {
        id: 1,
        title: "Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.",
        img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
        priceDisplay: "Rp 250.000",
        originalPriceDisplay: "Rp 500.000",
        priceNum: 250000,
        originalPriceNum: 500000,
        benefits: ["Ujian Akhir", "49 Video", "7 Dokumen", "Sertifikat", "Pretest"]
    },
    {
        id: 2,
        title: "Data Science Fundamentals",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
        priceDisplay: "Rp 300.000",
        originalPriceDisplay: "Rp 500.000",
        priceNum: 300000,
        originalPriceNum: 500000,
        benefits: ["Akses Selamanya", "30 Video", "Sertifikat", "Forum Diskusi"]
    },
    {
        id: 3,
        title: "Digital Marketing Mastery",
        img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600",
        priceDisplay: "Rp 300.000",
        originalPriceDisplay: "Rp 750.000",
        priceNum: 300000,
        originalPriceNum: 750000,
        benefits: ["Template Iklan", "50 Video", "Mentoring", "Sertifikat"]
    },
];

const Checkout = () => {
    const { id } = useParams();

    // State untuk menyimpan pilihan pembayaran (Default BCA)
    const [selectedPayment, setSelectedPayment] = useState("BCA");
    const [expandedSection, setExpandedSection] = useState("bank"); // Default accordion bank terbuka

    // Cari data kursus berdasarkan ID URL
    const course = COURSES_DATA.find((item) => item.id === parseInt(id));

    // Scroll ke atas saat halaman dibuka
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!course) {
        return <div className="min-h-screen flex items-center justify-center">Kursus tidak ditemukan</div>;
    }

    // Kalkulasi Harga
    const adminFee = 7000;
    const totalPayment = course.priceNum + adminFee;

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? "" : section);
    };

    return (
        <div className="min-h-screen bg-[#FFFDF3] pb-20">

            {/* Navbar Khusus Checkout */}
            <CheckoutNavbar />

            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* === 1. INFO KURSUS (MOBILE: POSISI ATAS, DESKTOP: POSISI KANAN) === */}
                    <div className="lg:col-span-1 lg:col-start-3 h-fit">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">

                            {/* Judul (Mobile Only) */}
                            <h3 className="lg:hidden font-bold text-xl text-gray-900 mb-4">Detail Kelas</h3>

                            {/* Gambar Kursus */}
                            <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                                <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
                            </div>

                            {/* Judul & Harga */}
                            <h3 className="font-bold text-gray-900 mb-2 leading-snug text-lg">{course.title}</h3>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-green-500 font-bold text-lg">{course.priceDisplay}</span>
                                <span className="text-gray-400 line-through text-sm">{course.originalPriceDisplay}</span>
                                <span className="bg-orange text-white text-[10px] font-bold px-2 py-1 rounded">Diskon 50%</span>
                            </div>

                            {/* Fasilitas */}
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-800 text-sm">Kelas Ini Sudah Termasuk</h4>
                                <ul className="text-sm text-gray-500 space-y-3">
                                    {course.benefits && course.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <i className="fa-regular fa-file-lines w-4 text-gray-400"></i> {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-t border-gray-100 my-6"></div>

                            <div>
                                <h4 className="font-bold text-gray-800 text-sm mb-2">Bahasa Pengantar</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <i className="fa-solid fa-globe"></i> Bahasa Indonesia
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* === 2. METODE PEMBAYARAN & RINGKASAN (MOBILE: POSISI BAWAH, DESKTOP: POSISI KIRI) === */}
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 space-y-8">

                        {/* Header Judul (Desktop Only) */}
                        <div className="hidden lg:block">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Metode Pembayaran</h2>
                        </div>

                        {/* Accordion Pilihan Pembayaran */}
                        <div>
                            {/* Bank Transfer */}
                            <PaymentAccordion title="Transfer Bank" isOpen={expandedSection === 'bank'} onToggle={() => toggleSection('bank')}>
                                <PaymentOption id="BCA" logo="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" name="Bank BCA" selected={selectedPayment} onSelect={setSelectedPayment} />
                                <PaymentOption id="BNI" logo="https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg" name="Bank BNI" selected={selectedPayment} onSelect={setSelectedPayment} />
                                <PaymentOption id="BRI" logo="https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg" name="Bank BRI" selected={selectedPayment} onSelect={setSelectedPayment} />
                                <PaymentOption id="Mandiri" logo="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" name="Bank Mandiri" selected={selectedPayment} onSelect={setSelectedPayment} />
                            </PaymentAccordion>

                            {/* E-Wallet */}
                            <PaymentAccordion title="E-Wallet" isOpen={expandedSection === 'ewallet'} onToggle={() => toggleSection('ewallet')}>
                                <PaymentOption id="Dana" logo="https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg" name="Dana" selected={selectedPayment} onSelect={setSelectedPayment} />
                                <PaymentOption id="OVO" logo="https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg" name="OVO" selected={selectedPayment} onSelect={setSelectedPayment} />
                                <PaymentOption id="LinkAja" logo="https://upload.wikimedia.org/wikipedia/commons/8/85/LinkAja.svg" name="LinkAja" selected={selectedPayment} onSelect={setSelectedPayment} />
                                <PaymentOption id="ShopeePay" logo="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" name="Shopee Pay" selected={selectedPayment} onSelect={setSelectedPayment} />
                            </PaymentAccordion>

                            {/* Kartu Kredit */}
                            <PaymentAccordion title="Kartu Kredit/Debit" isOpen={expandedSection === 'cc'} onToggle={() => toggleSection('cc')}>
                                <div className="flex items-center gap-4 p-4">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                                </div>
                            </PaymentAccordion>
                        </div>

                        {/* Ringkasan Pesanan (Posisi Kiri Bawah) */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h4 className="font-bold text-lg mb-6 text-gray-900">Ringkasan Pesanan</h4>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-start text-gray-600">
                                    <span className="max-w-[70%]">Video Learning: {course.title}</span>
                                    <span className="font-medium text-gray-900">Rp {course.priceNum.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Biaya Admin</span>
                                    <span className="font-medium text-gray-900">Rp {adminFee.toLocaleString('id-ID')}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 my-4"></div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-gray-900">Total Pembayaran</span>
                                <span className="font-bold text-green-500 text-xl">Rp {totalPayment.toLocaleString('id-ID')}</span>
                            </div>

                            {/* TOMBOL BAYAR (Link ke PaymentPage dengan membawa data Bank) */}
                            <Link
                                to={`/payment/${id}`}
                                state={{ paymentMethod: selectedPayment }} // <--- Mengirim data bank yg dipilih
                                className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 text-center"
                            >
                                Beli Sekarang
                            </Link>
                        </div>

                    </div>

                </div>
            </div>

            {/* Footer (Hanya muncul di Mobile) */}
            <CheckoutFooter />

        </div>
    );
};

export default Checkout;