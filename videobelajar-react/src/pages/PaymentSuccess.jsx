import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutNavbar from '../components/CheckoutNavbar';
import CheckoutFooter from '../components/CheckoutFooter';

const PaymentSuccess = () => {
    return (
        <div className="min-h-screen bg-[#FFFDF3] flex flex-col font-poppins">

            {/* 1. Navbar dengan step="done" agar indikator di 'Selesai' */}
            <CheckoutNavbar step="done" />

            {/* 2. Konten Tengah (Card) */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-sm border border-gray-100 flex flex-col items-center transform transition-all hover:scale-[1.01]">

                    {/* Ilustrasi */}
                    <div className="mb-6 w-full flex justify-center">
                        <img
                            src="https://img.freepik.com/free-vector/successful-payment-concept-illustration_114360-2566.jpg?w=740"
                            alt="Pembayaran Berhasil"
                            className="w-48 h-auto object-contain mix-blend-multiply"
                        />
                    </div>

                    {/* Judul & Deskripsi */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Pembayaran Berhasil!
                    </h2>

                    <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                        Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami jika ada kendala.
                    </p>

                    {/* Tombol Kembali */}
                    <Link
                        to="/pesanan-saya"
                        className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all transform active:scale-95"
                    >
                        Lihat Detail Pesanan
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;