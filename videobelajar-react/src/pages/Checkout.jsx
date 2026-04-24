import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import CheckoutNavbar from '../components/CheckoutNavbar';
import PaymentAccordion from '../components/PaymentAccordion';
import PaymentOption from '../components/PaymentOption';
import CheckoutFooter from '../components/CheckoutFooter';

import { useSelector, useDispatch } from 'react-redux';
import { fetchBanks } from '../store/bankSlice';

// Data statis tambahan untuk E-Wallet dan Kartu (karena di DB kita baru nyimpan Transfer Bank)
const STATIC_EWALLET_CARD = [
    { id: "Dana", name: "Dana", logo: "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg" },
    { id: "Gopay", name: "GoPay", logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg" },
    { id: "OVO", name: "OVO", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/OVO_logo.svg" },
    { id: "Visa", name: "Visa", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" },
    { id: "Mastercard", name: "Mastercard", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" }
];

const Checkout = () => {
    const { id } = useParams();
    const dispatch = useDispatch();


    const { data: courses } = useSelector((state) => state.courses);
    const { data: dbBanks, isLoading: isLoadingBanks } = useSelector((state) => state.banks);

    const [selectedPayment, setSelectedPayment] = useState("BCA");
    const [expandedSection, setExpandedSection] = useState("bank");

    // Fungsi buka tutup accordion
    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? "" : section);
    };

    // TRIGGER PENGAMBILAN DATA BANK DARI POSTGRESQL SAAT HALAMAN DIBUKA
    useEffect(() => {
        dispatch(fetchBanks());
        window.scrollTo(0, 0);
    }, [dispatch]);

    // GABUNGKAN DATA BANK DARI DB DENGAN E-WALLET STATIS
    const banksData = useMemo(() => {
        const mappedDbBanks = dbBanks.map(b => ({
            id: b.name, // Gunakan nama bank sebagai ID (contoh: "BCA")
            name: b.name,
            logo: b.logo
        }));
        return [...mappedDbBanks, ...STATIC_EWALLET_CARD];
    }, [dbBanks]);

    //  AMBIL DATA KELAS YANG DIPILIH
    const course = useMemo(() => {
        if (!courses || courses.length === 0) return null;

        // Pencarian aman (menyesuaikan tipe data ID)
        const rawCourse = courses.find((item) => item.id.toString() === id);
        if (!rawCourse) return null;

        const priceNum = Number(rawCourse.price) || 0;
        const originalPriceNum = priceNum === 0 ? 0 : priceNum + 450000;

        return {
            ...rawCourse,
            img: rawCourse.image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
            priceNum: priceNum,
            originalPriceNum: originalPriceNum,
            categoryStr: rawCourse.category || "Kategori",
            instructorName: rawCourse.instructor?.name || "Instruktur"
        };
    }, [courses, id]);

    const [adminFee] = useState(3000);
    const [totalPayment, setTotalPayment] = useState(0);

    useEffect(() => {
        if (course) {
            const fee = course.priceNum > 0 ? adminFee : 0;
            setTotalPayment(course.priceNum + fee);
        }
    }, [course, adminFee]);

    // Kategori Pembayaran
    const eWalletKeys = ["Dana", "Gopay", "OVO", "ShopeePay"];
    const cardKeys = ["Visa", "Mastercard"];

    const listTransferBank = banksData.filter(b => !eWalletKeys.includes(b.id) && !cardKeys.includes(b.id));
    const listEWallet = banksData.filter(b => eWalletKeys.includes(b.id));
    const listCard = banksData.filter(b => cardKeys.includes(b.id));

    // Loading State
    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col font-poppins items-center justify-center">
                <i className="fa-solid fa-spinner fa-spin text-3xl text-[#3ECF4C] mb-4"></i>
                <h2 className="text-xl font-bold mb-4 text-gray-700">Memuat detail pesanan...</h2>
                <Link to="/" className="text-[#3ECF4C] hover:underline text-sm font-medium">Kembali ke Beranda</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-poppins">
            <CheckoutNavbar />

            <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Checkout Pembayaran</h1>
                    <p className="text-gray-500 text-sm">Selesaikan pembayaran Anda untuk mulai belajar</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    <div className="flex-1 lg:max-w-3xl">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Pilih Metode Pembayaran</h2>

                            <div className="space-y-3">

                                <PaymentAccordion title="Transfer Bank / Virtual Account" isOpen={expandedSection === 'bank'} onToggle={() => toggleSection('bank')}>
                                    <div className="flex flex-col gap-3 mt-3">
                                        {isLoadingBanks ? (
                                            <p className="text-sm text-gray-500 px-2 animate-pulse">Memuat bank dari server...</p>
                                        ) : listTransferBank.map(bank => (
                                            <PaymentOption
                                                key={bank.id}
                                                id={bank.id}
                                                name={`${bank.name} Virtual Account`}
                                                logo={bank.logo}
                                                selected={selectedPayment}
                                                onSelect={setSelectedPayment}
                                            />
                                        ))}
                                    </div>
                                </PaymentAccordion>

                                <PaymentAccordion title="E-Wallet" isOpen={expandedSection === 'ewallet'} onToggle={() => toggleSection('ewallet')}>
                                    <div className="flex flex-col gap-3 mt-3">
                                        {listEWallet.length > 0 ? listEWallet.map(ewallet => (
                                            <PaymentOption
                                                key={ewallet.id}
                                                id={ewallet.id}
                                                name={ewallet.name}
                                                logo={ewallet.logo}
                                                selected={selectedPayment}
                                                onSelect={setSelectedPayment}
                                            />
                                        )) : (
                                            <p className="text-sm text-gray-400 italic px-2">Belum ada e-wallet tersedia.</p>
                                        )}
                                    </div>
                                </PaymentAccordion>

                                <PaymentAccordion title="Kartu Kredit / Debit" isOpen={expandedSection === 'card'} onToggle={() => toggleSection('card')}>
                                    <div className="flex flex-col gap-3 mt-3">
                                        {listCard.length > 0 ? listCard.map(card => (
                                            <PaymentOption
                                                key={card.id}
                                                id={card.id}
                                                name={card.name}
                                                logo={card.logo}
                                                selected={selectedPayment}
                                                onSelect={setSelectedPayment}
                                            />
                                        )) : (
                                            <p className="text-sm text-gray-400 italic px-2">Belum ada kartu tersedia.</p>
                                        )}
                                    </div>
                                </PaymentAccordion>

                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[400px]">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

                            <div className="flex gap-4 mb-6">
                                <div className="w-20 h-14 rounded overflow-hidden shrink-0 border border-gray-100 bg-gray-100">
                                    <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug">{course.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{course.categoryStr} • {course.instructorName}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 my-4"></div>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Harga Kelas</span>
                                    <span className="font-medium text-gray-900">
                                        {course.priceNum === 0 ? "Gratis" : `Rp ${course.originalPriceNum.toLocaleString('id-ID')}`}
                                    </span>
                                </div>

                                {course.priceNum > 0 && course.originalPriceNum > course.priceNum && (
                                    <div className="flex justify-between text-gray-600">
                                        <span>Potongan Diskon</span>
                                        <span className="font-medium text-green-500">- Rp {(course.originalPriceNum - course.priceNum).toLocaleString('id-ID')}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-gray-600">
                                    <span>Biaya Admin</span>
                                    <span className="font-medium text-gray-900">
                                        {course.priceNum === 0 ? "Gratis" : `Rp ${adminFee.toLocaleString('id-ID')}`}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 my-4"></div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-gray-900">Total Pembayaran</span>
                                <span className="font-bold text-green-500 text-xl">
                                    {totalPayment === 0 ? "Gratis" : `Rp ${totalPayment.toLocaleString('id-ID')}`}
                                </span>
                            </div>

                            <Link
                                to={`/payment/${id}`}
                                state={{ paymentMethod: selectedPayment, total: totalPayment }}
                                className="block w-full bg-[#3ECF4C] hover:bg-green-600 text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 text-center"
                            >
                                {totalPayment === 0 ? "Dapatkan Kelas (Gratis)" : "Bayar Sekarang"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <CheckoutFooter />
        </div>
    );
};

export default Checkout;