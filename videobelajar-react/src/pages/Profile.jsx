import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

// 1. IMPORT FIREBASE AUTH
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
    // State untuk form input
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneCode: "+62",
        phone: "",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
    });

    // State untuk loading screen dan proses tombol
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // URL Realtime Database kamu
    const DB_URL = 'https://videobelajarweb-default-rtdb.asia-southeast1.firebasedatabase.app';

    // 2. EFEK UNTUK MENGAMBIL DATA SAAT HALAMAN DIBUKA
    useEffect(() => {
        // onAuthStateChanged akan otomatis berjalan saat user berhasil login
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // A. Siapkan data dasar dari Firebase Authentication
                const initialData = {
                    name: currentUser.displayName || "Pengguna Baru",
                    email: currentUser.email,
                    phoneCode: "+62",
                    phone: "",
                    avatar: currentUser.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                };

                // B. Coba cari data tambahan (Nomor HP) dari Realtime Database pakai Axios
                try {
                    const response = await axios.get(`${DB_URL}/users/${currentUser.uid}.json`);
                    if (response.data) {
                        // Jika di database sudah ada nomor HP-nya, gabungkan dengan data dasar
                        setFormData({ ...initialData, ...response.data });
                    } else {
                        // Jika belum ada di database, tampilkan data dasar saja
                        setFormData(initialData);
                    }
                } catch (error) {
                    console.error("Gagal mengambil data dari database:", error);
                    setFormData(initialData);
                }
            } else {
                // Opsional: Jika tidak ada yang login, kamu bisa arahkan ke halaman login
                // window.location.href = '/login';
            }
            setIsFetching(false);
        });

        return () => unsubscribe(); // Membersihkan listener jika pindah halaman
    }, []);

    // 3. FUNGSI UNTUK MENANGANI PERUBAHAN KETIKAN
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 4. FUNGSI UNTUK MENYIMPAN KE REALTIME DATABASE
    const handleSave = async (e) => {
        e.preventDefault(); // Mencegah halaman reload
        const currentUser = auth.currentUser;

        if (!currentUser) return alert("Anda belum login!");

        setIsLoading(true);
        try {
            // Kita simpan ke "folder" users, menggunakan UID sebagai nama file/kuncinya
            // Menggunakan PATCH agar hanya memperbarui sebagian data
            await axios.patch(`${DB_URL}/users/${currentUser.uid}.json`, {
                name: formData.name,
                phoneCode: formData.phoneCode,
                phone: formData.phone
            });
            alert("✅ Profil berhasil diperbarui!");
        } catch (error) {
            console.error("Gagal menyimpan:", error);
            alert("❌ Gagal menyimpan profil.");
        } finally {
            setIsLoading(false);
        }
    };

    // Jika data masih dicari, tampilkan loading agar form tidak kosong melompong
    if (isFetching) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <p className="text-gray-500 font-medium animate-pulse">Memuat profil Anda...</p>
                </div>
            </Layout>
        );
    }

    // TAMPILAN ANTARMUKA (UI)
    return (
        <Layout>
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 font-poppins">

                {/* JUDUL HALAMAN */}
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Ubah Profil</h2>
                    <p className="text-gray-500 text-sm md:text-base">Ubah data diri Anda</p>
                </div>

                <div className="bg-white rounded-xl shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-gray-100 p-6 md:p-10">
                    <form onSubmit={handleSave} className="flex flex-col md:flex-row gap-10 items-start">

                        {/* FOTO PROFIL (AVATAR) */}
                        <div className="flex flex-col items-center gap-4 w-full md:w-1/4 pt-2">
                            <div className="relative group cursor-pointer">
                                <img src={formData.avatar} alt="Profile" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <i className="fa-solid fa-camera text-white text-xl"></i>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 text-center px-4 leading-relaxed">Ukuran maksimum 2MB. Format: JPG, PNG, GIF.</p>
                        </div>

                        {/* INPUT FORM */}
                        <div className="flex-1 space-y-6 w-full">

                            {/* Input Nama */}
                            <div className="relative">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium z-10">Nama Lengkap</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-[50px] border border-gray-200 rounded-lg px-4 text-gray-900 text-sm focus:outline-none focus:border-[#3ECF4C] focus:ring-1 focus:ring-[#3ECF4C] transition-all bg-white" required />
                            </div>

                            {/* Input Email (Dibuat READONLY) */}
                            <div className="relative">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium z-10">Email</label>
                                {/* Kita sengaja buat readOnly karena email nempel dengan Auth login */}
                                <input type="email" name="email" value={formData.email} readOnly className="w-full h-[50px] border border-gray-200 rounded-lg px-4 text-gray-500 text-sm bg-gray-50 cursor-not-allowed select-none" title="Email tidak dapat diubah" />
                            </div>

                            {/* Input Nomor HP */}
                            <div className="flex gap-3">
                                <div className="relative w-24">
                                    <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium z-10">Kode</label>
                                    <input type="text" name="phoneCode" value={formData.phoneCode} onChange={handleChange} className="w-full h-[50px] border border-gray-200 rounded-lg px-4 text-gray-900 text-sm focus:outline-none focus:border-[#3ECF4C] focus:ring-1 focus:ring-[#3ECF4C] transition-all bg-white text-center" />
                                </div>
                                <div className="relative flex-1">
                                    <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium z-10">No. Hp</label>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full h-[50px] border border-gray-200 rounded-lg px-4 text-gray-900 text-sm focus:outline-none focus:border-[#3ECF4C] focus:ring-1 focus:ring-[#3ECF4C] transition-all bg-white" placeholder="Contoh: 81234567890" />
                                </div>
                            </div>

                            {/* TOMBOL SIMPAN */}
                            <div className="flex justify-end pt-4 border-t border-gray-100 mt-8">
                                <button type="submit" disabled={isLoading} className="bg-[#3ECF4C] hover:bg-green-600 text-white font-bold py-3 px-10 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 text-sm disabled:opacity-50 flex items-center gap-2">
                                    {isLoading ? (
                                        <><i className="fa-solid fa-spinner fa-spin"></i> Menyimpan...</>
                                    ) : (
                                        "Simpan Perubahan"
                                    )}
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;