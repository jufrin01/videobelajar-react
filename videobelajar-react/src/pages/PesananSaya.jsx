import React, { useState } from 'react';
import Layout from '../components/Layout';
import UserSidebar from '../components/UserSidebar';

// DATA DUMMY PESANAN
const ORDERS_DATA = [
    {
        id: 1,
        invoice: "HEL/VI/10062023",
        date: "10 Juni 2023, 14.17",
        status: "Berhasil", // Status: Berhasil, Gagal, Belum Bayar
        courseTitle: "Belajar Microsoft Office dan Google Workspace untuk Pemula",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200",
        price: 300000,
        total: 300000
    },
    {
        id: 2,
        invoice: "HEL/VI/10062024",
        date: "11 Juni 2023, 10.00",
        status: "Gagal",
        courseTitle: "Data Science Fundamentals with Python",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200",
        price: 300000,
        total: 300000
    },
    {
        id: 3,
        invoice: "HEL/VI/10062025",
        date: "12 Juni 2023, 09.30",
        status: "Belum Bayar",
        courseTitle: "Digital Marketing Mastery: Social Media Ads",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=200",
        price: 300000,
        total: 300000
    },
    {
        id: 4,
        invoice: "HEL/VI/10062023",
        date: "10 Juni 2023, 14.17",
        status: "Berhasil",
        courseTitle: "Belajar Microsoft Office dan Google Workspace untuk Pemula",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200",
        price: 300000,
        total: 300000
    },
];

const PesananSaya = () => {
    const [activeTab, setActiveTab] = useState("Semua Pesanan");

    // Helper untuk warna badge status
    const getStatusColor = (status) => {
        switch(status) {
            case 'Berhasil': return 'bg-green-100 text-green-600';
            case 'Gagal': return 'bg-red-100 text-red-600';
            case 'Belum Bayar': return 'bg-yellow-100 text-yellow-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    // Filter Data berdasarkan Tab
    const filteredOrders = activeTab === "Semua Pesanan"
        ? ORDERS_DATA
        : ORDERS_DATA.filter(order => order.status === activeTab.replace('Menunggu', 'Belum Bayar'));
    // Mapping 'Menunggu' di tab ke 'Belum Bayar' di data

    return (
        <Layout>
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12">

                {/* Header Title */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Daftar Pesanan</h2>
                    <p className="text-gray-500">Informasi terperinci mengenai pembelian</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* SIDEBAR (Kiri) */}
                    <div className="lg:col-span-1">
                        <UserSidebar activeMenu="Pesanan Saya" />
                    </div>

                    {/* KONTEN UTAMA (Kanan) */}
                    <div className="lg:col-span-3">

                        {/* TABS & FILTER */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
                            {/* Tabs */}
                            <div className="flex flex-wrap gap-6 border-b border-gray-100 pb-4 mb-6">
                                {["Semua Pesanan", "Menunggu", "Berhasil", "Gagal"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-2 text-sm font-semibold transition-all relative ${
                                            activeTab === tab
                                                ? 'text-orange'
                                                : 'text-gray-500 hover:text-gray-800'
                                        }`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <span className="absolute bottom-[-17px] left-0 w-full h-[3px] bg-orange rounded-t-full"></span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Search & Sort */}
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Cari Kelas"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange"
                                    />
                                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                                </div>
                                <div className="relative w-full md:w-40">
                                    <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-lg text-sm focus:outline-none cursor-pointer">
                                        <option>Urutkan</option>
                                        <option>Terbaru</option>
                                        <option>Terlama</option>
                                    </select>
                                    <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none"></i>
                                </div>
                            </div>
                        </div>

                        {/* LIST KARTU PESANAN */}
                        <div className="space-y-6">
                            {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                                <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">

                                    {/* Header Kartu */}
                                    <div className="bg-gray-50 px-6 py-3 flex flex-col md:flex-row justify-between md:items-center gap-2 text-xs md:text-sm border-b border-gray-100">
                                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 text-gray-500">
                                            <span>No. Invoice: <span className="font-semibold text-gray-700">{order.invoice}</span></span>
                                            <span className="hidden md:inline">•</span>
                                            <span>Waktu Pembayaran: {order.date}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded font-bold text-xs w-fit ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                                    </div>

                                    {/* Body Kartu */}
                                    <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                                        <img src={order.image} alt={order.courseTitle} className="w-24 h-24 md:w-32 md:h-20 rounded-lg object-cover flex-shrink-0" />
                                        <div className="flex-1 w-full">
                                            <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{order.courseTitle}</h4>
                                            <p className="text-gray-500 text-sm">Harga</p>
                                            <p className="font-bold text-gray-900">Rp {order.price.toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>

                                    {/* Footer Kartu */}
                                    <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-white">
                                        <span className="text-sm text-gray-500">Total Pembayaran</span>
                                        <span className="font-bold text-green-500 text-lg">Rp {order.total.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-12 text-gray-400">
                                    <i className="fa-regular fa-folder-open text-4xl mb-2"></i>
                                    <p>Tidak ada pesanan di kategori ini.</p>
                                </div>
                            )}
                        </div>

                        {/* PAGINATION */}
                        <div className="flex justify-end mt-8 gap-2">
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                            <button className="w-8 h-8 flex items-center justify-center rounded bg-orange text-white font-bold text-sm">1</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm">2</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm">3</button>
                            <span className="flex items-end px-1 text-gray-400">...</span>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm">6</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50"><i className="fa-solid fa-chevron-right text-xs"></i></button>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PesananSaya;