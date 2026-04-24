import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import UserSidebar from '../components/UserSidebar';
import Pagination from '../components/Pagination';

import api from '../utils/api';

const PesananSaya = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Semua Pesanan");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // STATE UNTUK DATA PESANAN DARI POSTGRESQL
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Helper Status (Warna dan Tombol Aksi)
    const getStatusConfig = (status) => {
        switch(status) {
            case 'Berhasil':
                return {
                    style: 'bg-green-100 text-green-600',
                    label: 'Berhasil',
                    actionLabel: 'Mulai Belajar',
                    actionLink: '/learn/',
                    actionStyle: 'bg-[#3ECF4C] hover:bg-green-600 text-white'
                };
            case 'Gagal':
                return {
                    style: 'bg-red-100 text-red-600',
                    label: 'Gagal',
                    actionLabel: 'Beli Lagi',
                    actionLink: '/checkout/',
                    actionStyle: 'bg-[#FF5722] hover:bg-orange-600 text-white'
                };
            case 'Menunggu Pembayaran':
                return {
                    style: 'bg-yellow-100 text-yellow-600',
                    label: 'Menunggu',
                    actionLabel: 'Bayar Sekarang',
                    actionLink: '/payment/',
                    actionStyle: 'bg-[#FFC107] hover:bg-yellow-500 text-white'
                };
            default:
                return {
                    style: 'bg-gray-100 text-gray-600',
                    label: status || "Diproses",
                    actionLabel: 'Detail',
                    actionLink: '#',
                    actionStyle: 'bg-gray-200 text-gray-700'
                };
        }
    };

    // MENGAMBIL DATA PESANAN BERDASARKAN USER YANG LOGIN (JWT)
    useEffect(() => {
        const fetchOrders = async () => {
            const storedUser = localStorage.getItem("user");

            if (!storedUser) {
                navigate('/login');
                return;
            }

            const user = JSON.parse(storedUser);

            try {
                const response = await api.get(`/orders/user/${user.id}`);

                if (response.data && Array.isArray(response.data)) {
                    const fetchedOrders = response.data;

                    // Urutkan dari pesanan terbaru (berdasarkan field created_at atau date)
                    fetchedOrders.sort((a, b) => {
                        const dateA = new Date(a.created_at || a.date);
                        const dateB = new Date(b.created_at || b.date);
                        return dateB - dateA;
                    });

                    setOrders(fetchedOrders);
                }
            } catch (error) {
                console.error("Gagal mengambil data pesanan:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    // Logika Filter Tab
    const filteredOrders = orders.filter(order => activeTab === "Semua Pesanan" ? true : order.status === activeTab);

    // Logika Pagination
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
    const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Layout>
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 font-poppins flex flex-col md:flex-row gap-8">

                {/* Sidebar Kiri */}
                <div className="w-full md:w-64 shrink-0">
                    <UserSidebar />
                </div>

                {/* Konten Kanan */}
                <div className="flex-1">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Pesanan Saya</h2>
                        <p className="text-gray-500 text-sm md:text-base">Lacak status pesanan dan riwayat pembelian Anda.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                        {/* Tab Filter */}
                        <div className="flex overflow-x-auto border-b border-gray-100 scrollbar-hide">
                            {["Semua Pesanan", "Menunggu Pembayaran", "Berhasil", "Gagal"].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                                    className={`px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                                        activeTab === tab ? "border-[#3ECF4C] text-[#3ECF4C]" : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Daftar Pesanan */}
                        <div className="p-0">
                            {isLoading ? (
                                <div className="text-center py-16 text-gray-400">
                                    <i className="fa-solid fa-spinner fa-spin text-3xl mb-3 text-[#3ECF4C]"></i>
                                    <p className="font-medium">Memuat pesanan Anda...</p>
                                </div>
                            ) : currentOrders.length > 0 ? (
                                currentOrders.map((order, index) => {
                                    const statusConfig = getStatusConfig(order.status);


                                    const orderDate = order.created_at || order.date || new Date();
                                    const formattedDate = new Date(orderDate).toLocaleDateString('id-ID', {
                                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    });

                                    // Menggunakan ID pesanan dari DB
                                    const displayId = order.id ? String(order.id).padStart(5, '0') : `ORD-${index}`;

                                    // Mendukung snake_case (Postgres) atau camelCase
                                    const courseId = order.course_id || order.courseId;
                                    const courseImage = order.course_image || order.courseImage;
                                    const courseTitle = order.course_title || order.courseTitle;
                                    const courseCategory = order.course_category || order.courseCategory;
                                    const totalPayment = order.total_payment || order.totalPayment;
                                    const paymentMethod = order.payment_method || order.paymentMethod;

                                    return (
                                        <div key={order.id || index} className="p-4 md:p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-4">
                                                <div className="flex items-center gap-3">
                                                    <i className="fa-solid fa-bag-shopping text-gray-400"></i>
                                                    <div>
                                                        <span className="text-xs font-bold text-gray-500">ID: {displayId}</span>
                                                        <span className="text-xs text-gray-400 ml-2">• {formattedDate}</span>
                                                    </div>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-max ${statusConfig.style}`}>
                                                    {statusConfig.label}
                                                </div>
                                            </div>

                                            <div className="flex gap-4 mb-4">
                                                <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-gray-100 bg-gray-200">
                                                    <img src={courseImage} alt={courseTitle} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug">{courseTitle}</h4>
                                                    <p className="text-xs text-gray-500 mt-1">{courseCategory}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-4 border-t border-gray-50 pt-4">
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">Metode Pembayaran</p>
                                                    <p className="text-sm font-semibold text-gray-700">{paymentMethod}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">Total Belanja</p>
                                                    <span className="text-sm font-bold text-[#3ECF4C]">Rp {Number(totalPayment).toLocaleString('id-ID')}</span>
                                                </div>
                                                <div className="flex justify-end mt-2 md:mt-0">
                                                    <Link to={`${statusConfig.actionLink}${courseId}`} className={`px-6 py-2 rounded-lg text-sm font-bold shadow-sm transition-transform active:scale-95 text-center w-full md:w-auto ${statusConfig.actionStyle}`}>
                                                        {statusConfig.actionLabel}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-16 text-gray-400">
                                    <img src="https://cdn-icons-png.flaticon.com/512/11450/11450146.png" className="w-20 opacity-30 mx-auto mb-4" alt="kosong" />
                                    <p className="font-medium">Tidak ada pesanan.</p>
                                </div>
                            )}
                        </div>

                        {/* PAGINATION */}
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