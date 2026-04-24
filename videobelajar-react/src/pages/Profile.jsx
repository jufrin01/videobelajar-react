import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';

const Profile = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneCode: "+62",
        phone: "",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    //  AMBIL DATA DARI LOCAL STORAGE SAAT HALAMAN DIBUKA
    useEffect(() => {
        const checkUser = async () => {
            try {
                // Ambil identitas user yang sedang login dari Local Storage
                const storedUser = localStorage.getItem('user');

                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);

                    // Siapkan data dasar
                    const initialData = {
                        name: parsedUser.name || "Pengguna",
                        email: parsedUser.email || "",
                        phoneCode: "+62",
                        phone: parsedUser.phone || "", // Diambil jika ada
                        avatar: parsedUser.avatar || `https://ui-avatars.com/api/?name=${parsedUser.name.replace(/\s+/g, '+')}&background=random`
                    };

                    // Set data ke form
                    setFormData(initialData);
                } else {
                    // Jika tidak ada user (belum login), kembalikan ke halaman login
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error("Gagal memuat profil:", error);
            } finally {
                setIsFetching(false);
            }
        };

        checkUser();
    }, []);

    // FUNGSI UNTUK MENANGANI PERUBAHAN KETIKAN
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // FUNGSI UNTUK MENYIMPAN PERUBAHAN PROFIL
    const handleSave = async (e) => {
        e.preventDefault();

        const storedUser = localStorage.getItem('user');
        if (!storedUser) return alert("Anda belum login!");
        const parsedUser = JSON.parse(storedUser);

        setIsLoading(true);
        try {

            const updatedUser = {
                ...parsedUser,
                name: formData.name,
                phone: formData.phone
            };

            // Simpan perubahan kembali ke Local Storage agar update langsung terasa
            localStorage.setItem('user', JSON.stringify(updatedUser));

            alert("Profil berhasil diperbarui!");
            // Muat ulang halaman untuk merefresh avatar navbar (jika nama diubah)
            window.location.reload();
        } catch (error) {
            console.error("Gagal menyimpan:", error);
            alert("Gagal menyimpan profil.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <p className="text-gray-500 font-medium animate-pulse">Memuat profil Anda...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 font-poppins">

                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Ubah Profil</h2>
                    <p className="text-gray-500 text-sm md:text-base">Ubah data diri Anda</p>
                </div>

                <div className="bg-white rounded-xl shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-gray-100 p-6 md:p-10">
                    <form onSubmit={handleSave} className="flex flex-col md:flex-row gap-10 items-start">

                        <div className="flex flex-col items-center gap-4 w-full md:w-1/4 pt-2">
                            <div className="relative group cursor-pointer">
                                <img src={formData.avatar} alt="Profile" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <i className="fa-solid fa-camera text-white text-xl"></i>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 text-center px-4 leading-relaxed">Ukuran maksimum 2MB. Format: JPG, PNG, GIF.</p>
                        </div>

                        <div className="flex-1 space-y-6 w-full">

                            <div className="relative">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium z-10">Nama Lengkap</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-[50px] border border-gray-200 rounded-lg px-4 text-gray-900 text-sm focus:outline-none focus:border-[#3ECF4C] focus:ring-1 focus:ring-[#3ECF4C] transition-all bg-white" required />
                            </div>

                            <div className="relative">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium z-10">Email</label>
                                <input type="email" name="email" value={formData.email} readOnly className="w-full h-[50px] border border-gray-200 rounded-lg px-4 text-gray-500 text-sm bg-gray-50 cursor-not-allowed select-none" title="Email tidak dapat diubah" />
                            </div>

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