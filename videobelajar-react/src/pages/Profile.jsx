import React, { useState } from 'react';
import Layout from '../components/Layout';
import UserSidebar from '../components/UserSidebar';
import UserPhoto from '../assets/images/user.png';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: "Jufrin abdul hamid",
        email: "jufrin@gmail.com",
        phoneCode: "+62",
        phone: "81234567890",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Layout>
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 font-poppins">

                {/* JUDUL HALAMAN */}
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Ubah Profil</h2>
                    <p className="text-gray-500 text-sm md:text-base">Ubah data diri Anda</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* SIDEBAR (Kiri) */}
                    <div className="lg:col-span-1">
                        <UserSidebar activeMenu="Profil Saya" />
                    </div>

                    {/* KONTEN UTAMA (Kanan) */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">

                            {/* BAGIAN FOTO PROFIL (Background Abu) */}
                            <div className="bg-[#F9FAFB] rounded-xl p-6 mb-8 border border-gray-100 flex flex-col md:flex-row items-center gap-6">
                                <img
                                    src={UserPhoto}
                                    alt="Profile"
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shadow-sm"
                                />
                                <div className="text-center md:text-left space-y-1">
                                    <h3 className="font-bold text-lg text-gray-900">{formData.name}</h3>
                                    <p className="text-gray-500 text-sm">{formData.email}</p>
                                    <button className="text-[#FF5722] font-bold text-sm hover:text-orange-600 transition-colors pt-1 block mx-auto md:mx-0">
                                        Ganti Foto Profil
                                    </button>
                                </div>
                            </div>

                            {/* FORM INPUT (Grid 3 Kolom di Desktop) */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-start">

                                {/* 1. INPUT NAMA */}
                                <div className="relative w-full">
                                    <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium z-10">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full h-[50px] border border-green-500 rounded-lg px-4 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 transition-all bg-white"
                                    />
                                </div>

                                {/* 2. INPUT EMAIL */}
                                <div className="relative w-full">
                                    <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium z-10">
                                        E-Mail
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full h-[50px] border border-gray-200 rounded-lg px-4 text-gray-600 text-sm focus:outline-none bg-white cursor-not-allowed"
                                        readOnly
                                    />
                                </div>

                                {/* 3. INPUT NO HP (Gabungan) */}
                                <div className="flex gap-3 w-full">
                                    {/* Kode Negara (+62) */}
                                    <div className="relative w-[80px] flex-shrink-0">
                                        <select
                                            name="phoneCode"
                                            value={formData.phoneCode}
                                            onChange={handleChange}
                                            className="w-full h-[50px] appearance-none border border-gray-200 rounded-lg pl-3 pr-6 text-gray-700 text-sm bg-white focus:outline-none cursor-pointer"
                                        >
                                            <option value="+62">+62</option>
                                            <option value="+1">+1</option>
                                        </select>
                                        {/* Icon Panah Kecil */}
                                        <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
                                    </div>

                                    {/* Input Nomor */}
                                    <div className="relative flex-1">
                                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-medium z-10">
                                            No. Hp
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full h-[50px] border border-gray-200 rounded-lg px-4 text-gray-900 text-sm focus:outline-none focus:border-green-500 transition-all bg-white"
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* TOMBOL SIMPAN */}
                            <div className="flex justify-end">
                                <button className="bg-[#3ECF4C] hover:bg-green-600 text-white font-bold py-3 px-10 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 text-sm">
                                    Simpan
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;