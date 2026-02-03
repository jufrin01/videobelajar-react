import React, { useState, useMemo, useEffect } from 'react';
import Layout from '../components/Layout';
import UserSidebar from '../components/UserSidebar';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { ordersData } from '../data/ordersData';

const PesananSaya = () => {
    const [activeTab, setActiveTab] = useState("Semua Pesanan");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Helper Status
    const getStatusConfig = (status) => {
        switch(status) {
            case 'Berhasil': return { style: 'bg-green-100 text-green-600', label: 'Berhasil', actionLabel: 'Mulai Belajar', actionLink: '/learn/', actionStyle: 'bg-[#3ECF4C] hover:bg-green-600 text-white' };
            case 'Gagal': return { style: 'bg-red-100 text-red-600', label: 'Gagal', actionLabel: 'Beli Lagi', actionLink: '/checkout/', actionStyle: 'bg-[#FF5722] hover:bg-orange-600 text-white' };
            case 'Menunggu Pembayaran': return { style: 'bg-yellow-100 text-yellow-600', label: 'Menunggu Pembayaran', actionLabel: 'Bayar Sekarang', actionLink: '/payment/', actionStyle: 'bg-[#FFC107] hover:bg-yellow-500 text-white' };
            default: return { style: 'bg-gray-100 text-gray-600', label: status, actionLabel: 'Lihat Detail', actionLink: '/course/', actionStyle: 'bg-gray-200 text-gray-700' };
        }
    };

    const filteredOrders = useMemo(() => {
        if (activeTab === "Semua Pesanan") return ordersData;
        return ordersData.filter(order => order.status === activeTab);
    }, [activeTab]);

    // Pagination Logic
    useEffect(() => { setCurrentPage(1); }, [activeTab]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    return (
        <Layout>
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 font-poppins">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Daftar Pesanan</h2>
                    <p className="text-gray-500">Riwayat transaksi dan status pembayaran kelas Anda.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1"><UserSidebar activeMenu="Pesanan Saya" /></div>

                    <div className="lg:col-span-3">
                        {/* Tabs & Filter (Code sama) */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
                            <div className="flex flex-wrap gap-6 border-b border-gray-100 pb-4 mb-6">
                                {["Semua Pesanan", "Menunggu Pembayaran", "Berhasil", "Gagal"].map((tab) => (
                                    <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 text-sm font-semibold transition-all relative ${activeTab === tab ? 'text-[#FF5722]' : 'text-gray-500 hover:text-gray-800'}`}>{tab}{activeTab === tab && <span className="absolute bottom-[-17px] left-0 w-full h-[3px] bg-[#FF5722] rounded-t-full"></span>}</button>
                                ))}
                            </div>
                            <div className="relative">
                                <input type="text" placeholder="Cari pesanan..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500"/>
                                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                            </div>
                        </div>

                        {/* List Orders */}
                        <div className="space-y-6 min-h-[400px]">
                            {currentItems.length > 0 ? currentItems.map((order) => {
                                const statusConfig = getStatusConfig(order.status);
                                const course = order.courseDetails || {};
                                return (
                                    <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="bg-gray-50 px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between md:items-center gap-2 text-xs md:text-sm border-b border-gray-100">
                                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 text-gray-500">
                                                <span>Invoice: <span className="font-semibold text-gray-700">{order.invoice}</span></span>
                                                <span className="hidden md:inline">•</span>
                                                <span>{order.date}</span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider w-fit ${statusConfig.style}`}>{statusConfig.label}</span>
                                        </div>
                                        <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                                            <img src={course.image} alt={course.title} className="w-full h-32 md:w-32 md:h-20 rounded-lg object-cover flex-shrink-0 bg-gray-200" />
                                            <div className="flex-1 w-full">
                                                <h4 className="font-bold text-gray-900 mb-1 line-clamp-2 text-base md:text-lg">{course.title || "Nama Kelas Tidak Tersedia"}</h4>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3"><span>Total:</span><span className="font-bold text-gray-900">Rp {order.totalPaid.toLocaleString('id-ID')}</span></div>
                                                <div className="flex justify-end mt-2 md:mt-0">
                                                    <Link to={`${statusConfig.actionLink}${order.courseId}`} className={`px-6 py-2 rounded-lg text-sm font-bold shadow-sm transition-transform active:scale-95 text-center w-full md:w-auto ${statusConfig.actionStyle}`}>{statusConfig.actionLabel}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className="text-center py-16 text-gray-400"><p className="font-medium">Tidak ada pesanan.</p></div>
                            )}
                        </div>

                        {/* USE PAGINATION COMPONENT */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PesananSaya;