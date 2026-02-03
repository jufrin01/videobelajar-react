import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import CheckoutNavbar from '../components/CheckoutNavbar';
import PaymentAccordion from '../components/PaymentAccordion';
import CheckoutFooter from '../components/CheckoutFooter';
import CountdownTimer from '../components/CountdownTimer';

// 1. DATA DUMMY KURSUS
const COURSES_DATA = [
    {
        id: 1,
        title : "Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.",
        img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
        priceDisplay: "Rp 250.000",
        originalPriceDisplay: "Rp 500.000",
        priceNum: 250000,
        benefits: ["Ujian Akhir", "49 Video", "7 Dokumen", "Sertifikat", "Pretest"]
    },
    {
        id: 2,
        title: "Data Science Fundamentals",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
        priceDisplay: "Rp 300.000",
        originalPriceDisplay: "Rp 500.000",
        priceNum: 300000,
        benefits: ["Akses Selamanya", "30 Video", "Sertifikat", "Forum Diskusi"]
    },
    {
        id: 3,
        title: "Digital Marketing Mastery",
        img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600",
        priceDisplay: "Rp 300.000",
        originalPriceDisplay: "Rp 750.000",
        priceNum: 300000,
        benefits: ["Template Iklan", "50 Video", "Mentoring", "Sertifikat"]
    },
];

// 2. DATA DUMMY BANK (INSTRUKSI SESUAI GAMBAR)
const BANK_DATA = {
    BCA: {
        id: "BCA",
        name: "BCA",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
        vaCode: "11739",
        themeColor: "text-blue-600",
        instructions: {
            atm: [
                "Masukkan kartu ATM dan PIN BCA Anda",
                "Di menu utama, pilih \"Transaksi Lainnya\". Pilih \"Transfer\". Pilih \"Ke BCA Virtual Account\"",
                "Masukkan nomor Virtual Account",
                "Pastikan data Virtual Account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih \"Benar\"",
                "Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih \"Ya\", atau pilih \"Tidak\" jika data di layar masih salah",
                "Transaksi Anda sudah selesai. Pilih \"Tidak\" untuk tidak melanjutkan transaksi lain"
            ],
            mobile: [
                "Buka Aplikasi BCA Mobile",
                "Pilih \"m-BCA\", kemudian pilih \"m-Transfer\"",
                "Pilih \"BCA Virtual Account\"",
                "Masukkan nomor Virtual Account, lalu pilih \"OK\"",
                "Klik tombol \"Send\" yang berada di sudut kanan atas aplikasi untuk melakukan transfer",
                "Klik \"OK\" untuk melanjutkan pembayaran",
                "Masukkan PIN Anda untuk meng-otorisasi transaksi",
                "Transaksi Anda telah selesai"
            ],
            internet: [
                "Login ke KlikBCA Individual",
                "Pilih \"Transfer\", kemudian pilih \"Transfer ke BCA Virtual Account\"",
                "Masukkan nomor Virtual Account",
                "Pilih \"Lanjutkan\" untuk melanjutkan pembayaran",
                "Masukkan \"RESPON KEYBCA APPLI 1\" yang muncul pada Token BCA Anda, lalu klik tombol \"Kirim\"",
                "Pembayaran telah selesai"
            ]
        }
    },
    BNI: {
        id: "BNI",
        name: "BNI",
        logo: "https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg",
        vaCode: "8808",
        themeColor: "text-orange",
        instructions: {
            atm: [
                "Masukkan kartu ATM BNI & PIN",
                "Pilih Menu Lain > Transfer > Virtual Account Billing",
                "Masukkan nomor Virtual Account yang tertera",
                "Periksa konfirmasi pembayaran, lalu pilih YA",
                "Transaksi selesai"
            ],
            mobile: [
                "Buka BNI Mobile Banking",
                "Pilih menu Transfer > Virtual Account Billing",
                "Masukkan nomor Virtual Account",
                "Masukkan Password Transaksi",
                "Transaksi selesai"
            ],
            internet: [
                "Login BNI Internet Banking",
                "Pilih Transaksi > Virtual Account Billing",
                "Masukkan nomor Virtual Account",
                "Lanjutkan proses otorisasi dengan BNI e-Secure"
            ]
        }
    },
    BRI: {
        id: "BRI",
        name: "BRI",
        logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg",
        vaCode: "12345",
        themeColor: "text-blue-800",
        instructions: {
            atm: [
                "Masukkan kartu ATM BRI & PIN",
                "Pilih Transaksi Lain > Pembayaran > Lainnya > BRIVA",
                "Masukkan nomor Virtual Account",
                "Konfirmasi pembayaran, pilih YA",
                "Transaksi selesai"
            ],
            mobile: [
                "Buka aplikasi BRImo",
                "Pilih menu Pembayaran > BRIVA",
                "Masukkan nomor Virtual Account",
                "Masukkan PIN BRImo",
                "Transaksi berhasil"
            ],
            internet: [
                "Login Internet Banking BRI",
                "Pilih Pembayaran > BRIVA",
                "Masukkan Kode Bayar (Nomor VA)",
                "Masukkan Password & m-Token",
                "Kirim"
            ]
        }
    },
    Mandiri: {
        id: "Mandiri",
        name: "Mandiri",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg",
        vaCode: "89898",
        themeColor: "text-blue-900",
        instructions: {
            atm: [
                "Masukkan kartu ATM Mandiri & PIN",
                "Pilih Bayar/Beli > Lainnya > Multi Payment",
                "Masukkan Kode Perusahaan (jika diminta) lalu Nomor VA",
                "Konfirmasi rincian pembayaran",
                "Transaksi selesai"
            ],
            mobile: [
                "Buka Livin' by Mandiri",
                "Pilih menu Bayar > Cari Penyedia Jasa > Masukkan No VA",
                "Lanjut Bayar dan masukkan PIN",
                "Transaksi selesai"
            ],
            internet: [
                "Login Mandiri Online",
                "Pilih menu Bayar > Multi Payment",
                "Pilih Penyedia Jasa dan masukkan Nomor VA",
                "Lanjutkan dan konfirmasi dengan Token"
            ]
        }
    }
};

const PaymentPage = () => {
    const { id } = useParams();
    const location = useLocation();

    const selectedBankId = location.state?.paymentMethod || "BCA";
    const bank = BANK_DATA[selectedBankId] || BANK_DATA["BCA"];

    const [expandedSection, setExpandedSection] = useState("mobile"); // Default Buka Mobile Banking
    const [vaNumber, setVaNumber] = useState("");

    const course = COURSES_DATA.find((item) => item.id === parseInt(id)) || COURSES_DATA[0];

    useEffect(() => {
        window.scrollTo(0, 0);
        const randomSuffix = Math.floor(1000000000 + Math.random() * 9000000000);
        setVaNumber(`${bank.vaCode} ${randomSuffix}`);
    }, [id, bank]);

    const adminFee = 7000;
    const totalPayment = (course?.priceNum || 0) + adminFee;

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? "" : section);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(vaNumber.replace(/\s/g, ''));
        alert(`Nomor VA ${bank.name} berhasil disalin!`);
    };

    return (
        <div className="min-h-screen bg-[#FFFDF3] pb-20">

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

                    {/* INFO KURSUS */}
                    <div className="lg:col-span-1 lg:col-start-3 h-fit order-1 lg:order-2">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-40">
                            <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                                <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 leading-snug text-lg">{course.title}</h3>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-green-500 font-bold text-lg">{course.priceDisplay}</span>
                                {course.originalPriceDisplay && (
                                    <span className="text-gray-400 line-through text-sm">{course.originalPriceDisplay}</span>
                                )}
                            </div>
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
                        </div>
                    </div>

                    {/* KONTEN UTAMA */}
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 space-y-8 order-2 lg:order-1">

                        <h2 className="text-2xl font-bold text-gray-900">Instruksi Pembayaran</h2>

                        {/* BOX VA DINAMIS */}
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
                                    className="text-[#F64920] font-bold text-sm hover:underline absolute right-4 md:right-6 bg-white px-2 py-1 rounded shadow-sm md:shadow-none"
                                >
                                    Salin
                                </button>
                            </div>

                            <div className="text-sm text-gray-500">
                                Total Pembayaran: <span className="font-bold text-gray-900">Rp {totalPayment.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        {/* TATA CARA PEMBAYARAN - UPDATE RENDERING LIST */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Tata Cara Pembayaran</h2>

                            <PaymentAccordion title={`ATM ${bank.name}`} isOpen={expandedSection === 'atm'} onToggle={() => toggleSection('atm')}>
                                <ol className="list-decimal list-outside ml-5 text-sm text-gray-600 space-y-2 p-2">
                                    {bank.instructions.atm.map((step, idx) => (
                                        <li key={idx} className="pl-1 leading-relaxed">{step}</li>
                                    ))}
                                </ol>
                            </PaymentAccordion>

                            <PaymentAccordion title={`Mobile Banking ${bank.name}`} isOpen={expandedSection === 'mobile'} onToggle={() => toggleSection('mobile')}>
                                <ol className="list-decimal list-outside ml-5 text-sm text-gray-600 space-y-2 p-2">
                                    {bank.instructions.mobile.map((step, idx) => (
                                        <li key={idx} className="pl-1 leading-relaxed">{step}</li>
                                    ))}
                                </ol>
                            </PaymentAccordion>

                            <PaymentAccordion title={`Internet Banking ${bank.name}`} isOpen={expandedSection === 'internet'} onToggle={() => toggleSection('internet')}>
                                <ol className="list-decimal list-outside ml-5 text-sm text-gray-600 space-y-2 p-2">
                                    {bank.instructions.internet.map((step, idx) => (
                                        <li key={idx} className="pl-1 leading-relaxed">{step}</li>
                                    ))}
                                </ol>
                            </PaymentAccordion>
                        </div>

                        {/* TOMBOL AKSI */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to={`/checkout/${id}`} className="flex-1 border border-green-500 text-green-600 font-bold py-3 rounded-lg hover:bg-green-50 transition-colors text-center">
                                Ganti Metode Pembayaran
                            </Link>
                            <Link
                                to={Math.random() > 0.5 ? "/payment-success" : "/payment-pending"}
                                className="flex-1 bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors shadow-md text-center flex items-center justify-center"
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