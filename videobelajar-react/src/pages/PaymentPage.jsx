import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import CheckoutNavbar from '../components/CheckoutNavbar';
import PaymentAccordion from '../components/PaymentAccordion';
import CheckoutFooter from '../components/CheckoutFooter';
import CountdownTimer from '../components/CountdownTimer';

// IMPORT API (Satpam Pintar) & REDUX
import api from '../utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBanks } from '../store/bankSlice';

const PaymentPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 1. AMBIL DATA DARI REDUX
    const { data: courses } = useSelector((state) => state.courses);
    const { data: banks, isLoading: isBanksLoading } = useSelector((state) => state.banks);

    const selectedBankName = location.state?.paymentMethod || "BCA";

    const [expandedSection, setExpandedSection] = useState("mobile");
    const [vaNumber, setVaNumber] = useState("");
    const [bank, setBank] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // 2. TRIGGER FETCH BANK SAAT HALAMAN DIBUKA
    useEffect(() => {
        dispatch(fetchBanks());
        window.scrollTo(0, 0);
    }, [dispatch]);

    // 3. COCOKKAN BANK DENGAN DATABASE
    useEffect(() => {
        if (banks && banks.length > 0) {
            const foundBank = banks.find(b => b.name === selectedBankName) || banks[0];
            setBank(foundBank);

            const bankVaCode = foundBank.va_code || foundBank.vaCode || "0000";
            const randomSuffix = Math.floor(1000000000 + Math.random() * 9000000000);
            setVaNumber(`${bankVaCode}${randomSuffix}`);
        }
    }, [banks, selectedBankName]);

    // 4. TRANSFORMASI DATA KURSUS
    const course = useMemo(() => {
        if (!courses || courses.length === 0) return null;
        const rawCourse = courses.find((item) => item.id.toString() === id);
        if (!rawCourse) return null;

        const priceNum = Number(rawCourse.price) || 0;
        const originalPriceNum = priceNum === 0 ? 0 : priceNum + 450000;

        return {
            ...rawCourse,
            img: rawCourse.image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
            priceNum, originalPriceNum,
            priceDisplay: priceNum === 0 ? "Gratis" : "Rp " + priceNum.toLocaleString('id-ID'),
            originalPriceDisplay: originalPriceNum === 0 ? "" : "Rp " + originalPriceNum.toLocaleString('id-ID'),
            benefits: ["Akses Selamanya", `${rawCourse.modules ? rawCourse.modules.length : 0} Modul Materi`, "Sertifikat Kompetensi", "Grup Diskusi"]
        };
    }, [courses, id]);

    // 5. KIRIM PESANAN KE POSTGRESQL VIA API
    const handleSelesaikanPembayaran = async (statusPesanan) => {
        setIsProcessing(true);
        const totalPayment = course.priceNum + (course.priceNum === 0 ? 0 : 3000);

        try {
            const orderData = {
                courseId: course.id, courseTitle: course.title, courseImage: course.img,
                courseCategory: course.category || "Kategori", price: course.priceNum,
                totalPayment: totalPayment, paymentMethod: bank.name, status: statusPesanan
            };

            await api.post('/orders', orderData);
            navigate(statusPesanan === "Berhasil" ? '/payment-success' : '/payment-pending');
        } catch (error) {
            alert("Terjadi kesalahan sistem saat memproses pesanan.");
        } finally {
            setIsProcessing(false);
        }
    };

    // TAMPILAN LOADING JIKA DATA MASIH KOSONG
    if (!course || isBanksLoading || !bank) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
                <i className="fa-solid fa-spinner fa-spin text-3xl text-[#3ECF4C]"></i>
                <div className="text-lg font-bold text-gray-600">Mempersiapkan pembayaran...</div>
            </div>
        );
    }

    const totalPayment = course.priceNum + (course.priceNum === 0 ? 0 : 3000);
    const themeColor = bank.theme_color || bank.themeColor || "text-blue-600";

    return (
        <div className="min-h-screen bg-[#FFFDF3] pb-20 font-poppins">
            <CheckoutNavbar step="payment" />
            <div className="bg-[#FFF2E2] py-4 text-center border-b border-orange-200 sticky top-[73px] md:top-[88px] z-40 shadow-sm">
                <div className="flex justify-center items-center gap-3 text-gray-700 font-medium text-sm md:text-base">
                    <span>Selesaikan pemesanan dalam</span><CountdownTimer />
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* INFO KURSUS (Kanan) */}
                    <div className="lg:col-span-1 lg:col-start-3 h-fit order-1 lg:order-2">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-40">
                            <div className="relative h-48 rounded-lg overflow-hidden mb-4 bg-gray-100 border border-gray-100"><img src={course.img} alt={course.title} className="w-full h-full object-cover" /></div>
                            <h3 className="font-bold text-gray-900 mb-2 leading-snug text-lg">{course.title}</h3>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-[#3ECF4C] font-bold text-lg">{course.priceDisplay}</span>
                                {course.originalPriceNum > 0 && <span className="text-gray-400 line-through text-sm">{course.originalPriceDisplay}</span>}
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-800 text-sm">Kelas Ini Sudah Termasuk</h4>
                                <ul className="text-sm text-gray-500 space-y-3">{course.benefits.map((benefit, idx) => <li key={idx} className="flex items-center gap-3"><i className="fa-regular fa-file-lines w-4 text-gray-400"></i> {benefit}</li>)}</ul>
                            </div>
                        </div>
                    </div>

                    {/* INSTRUKSI PEMBAYARAN (Kiri) */}
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 space-y-8 order-2 lg:order-1">
                        <h2 className="text-2xl font-bold text-gray-900">Instruksi Pembayaran</h2>

                        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-center">
                            <div className="flex justify-center items-center gap-4 mb-6">
                                <div className="h-10 flex items-center justify-center"><img src={bank.logo} alt={bank.name} className="h-full w-auto object-contain" /></div>
                                <span className="font-bold text-gray-700 text-lg">{bank.name} Virtual Account</span>
                            </div>
                            <p className="text-gray-500 text-sm mb-2">Nomor Virtual Account</p>
                            <div className="flex justify-center items-center gap-4 mb-6 bg-gray-50 py-4 rounded-lg border border-gray-100 max-w-md mx-auto relative px-2">
                                <span className={`text-xl md:text-2xl font-bold tracking-wider break-all ${themeColor}`}>{vaNumber}</span>
                                <button onClick={() => navigator.clipboard.writeText(vaNumber)} className="text-[#FF5722] font-bold text-sm hover:underline absolute right-4 md:right-6 bg-white px-2 py-1 rounded shadow-sm md:shadow-none">Salin</button>
                            </div>
                            <div className="text-sm text-gray-500">Total Pembayaran: <span className="font-bold text-gray-900">Rp {totalPayment.toLocaleString('id-ID')}</span></div>
                        </div>

                        {/* TATA CARA PEMBAYARAN DINAMIS DARI DATABASE */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Tata Cara Pembayaran</h2>
                            {bank.instructions?.atm && bank.instructions.atm.length > 0 && (
                                <PaymentAccordion title={`ATM ${bank.name}`} isOpen={expandedSection === 'atm'} onToggle={() => setExpandedSection(expandedSection === 'atm' ? "" : 'atm')}>
                                    <ol className="list-decimal list-outside ml-5 text-sm text-gray-600 space-y-2 p-2">{bank.instructions.atm.map((step, idx) => <li key={idx} className="pl-1 leading-relaxed">{step}</li>)}</ol>
                                </PaymentAccordion>
                            )}
                            {bank.instructions?.mobile && bank.instructions.mobile.length > 0 && (
                                <PaymentAccordion title={`Mobile Banking ${bank.name}`} isOpen={expandedSection === 'mobile'} onToggle={() => setExpandedSection(expandedSection === 'mobile' ? "" : 'mobile')}>
                                    <ol className="list-decimal list-outside ml-5 text-sm text-gray-600 space-y-2 p-2">{bank.instructions.mobile.map((step, idx) => <li key={idx} className="pl-1 leading-relaxed">{step}</li>)}</ol>
                                </PaymentAccordion>
                            )}
                            {bank.instructions?.internet && bank.instructions.internet.length > 0 && (
                                <PaymentAccordion title={`Internet Banking ${bank.name}`} isOpen={expandedSection === 'internet'} onToggle={() => setExpandedSection(expandedSection === 'internet' ? "" : 'internet')}>
                                    <ol className="list-decimal list-outside ml-5 text-sm text-gray-600 space-y-2 p-2">{bank.instructions.internet.map((step, idx) => <li key={idx} className="pl-1 leading-relaxed">{step}</li>)}</ol>
                                </PaymentAccordion>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button onClick={() => handleSelesaikanPembayaran("Menunggu Pembayaran")} disabled={isProcessing} className="flex-1 border border-orange-500 text-orange-600 font-bold py-3 rounded-lg hover:bg-orange-50 transition-colors text-center disabled:opacity-50">Bayar Nanti (Pending)</button>
                            <button onClick={() => handleSelesaikanPembayaran("Berhasil")} disabled={isProcessing} className="flex-1 bg-[#3ECF4C] text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors shadow-md text-center disabled:opacity-50">{isProcessing ? "Memproses..." : "Simulasi Bayar Berhasil"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <CheckoutFooter />
        </div>
    );
};

export default PaymentPage;