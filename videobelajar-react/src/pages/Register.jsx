import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FormInput from '../components/FormInput'; // Gunakan komponen yang sudah dibuat

const Register = () => {
    const navigate = useNavigate();

    // 1. State untuk menampung data input
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    // 2. State untuk fitur lihat password (mata)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // 3. Handle perubahan ketikan user
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 4. Handle Submit (Tombol Daftar)
    const handleRegister = (e) => {
        e.preventDefault();

        // Validasi Password Match
        if (formData.password !== formData.confirmPassword) {
            alert("❌ Password dan Konfirmasi Password tidak sama!");
            return;
        }

        // Simulasi Sukses
        console.log("Data Pendaftaran:", formData);
        alert("✅ Pendaftaran Berhasil! Silakan Login dengan akun baru Anda.");

        // Pindah ke halaman Login
        navigate("/login");
    };

    return (
        <>
            <Navbar />

            <div className="flex-1 flex justify-center items-center p-5 pb-20">
                <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 text-center">

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Pendaftaran Akun</h2>
                    <p className="text-gray-400 text-sm mb-8">Yuk, daftarkan akunmu sekarang juga!</p>

                    <form onSubmit={handleRegister} className="text-left">

                        {/* --- INPUT NAMA (Pakai Komponen) --- */}
                        <FormInput
                            label="Nama Lengkap"
                            type="text"
                            placeholder="Contoh: Jufrin Bima"
                            // Karena FormInput kita pakai props 'value' & 'onChange' biasa, kita sesuaikan:
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />

                        {/* --- INPUT EMAIL (Pakai Komponen) --- */}
                        <FormInput
                            label="E-Mail"
                            type="email"
                            placeholder="nama@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />

                        {/* --- INPUT NO HP (Custom Manual) --- */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                No. Hp <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-3">
                                {/* Kotak Bendera (Hiasan) */}
                                <div className="flex items-center justify-center px-3 py-3 border border-gray-200 rounded-lg bg-gray-50 w-[100px] select-none">
                                    <img src="https://flagcdn.com/w40/id.png" alt="ID" className="w-5 h-auto mr-2 rounded-sm shadow-sm" />
                                    <span className="text-sm font-medium text-gray-700">+62</span>
                                </div>
                                {/* Input Angka */}
                                <input
                                    type="tel"
                                    name="phone"
                                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder="81234567890"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* --- INPUT PASSWORD --- */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Kata Sandi <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <i
                                    className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600`}
                                    onClick={() => setShowPassword(!showPassword)}
                                ></i>
                            </div>
                        </div>

                        {/* --- INPUT KONFIRMASI PASSWORD --- */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Konfirmasi Kata Sandi <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <i
                                    className={`fa-solid ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'} absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600`}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                ></i>
                            </div>
                        </div>

                        {/* --- TOMBOL AKSI --- */}
                        <button type="submit" className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-600 transition-colors mb-4 shadow-sm shadow-green-100">
                            Daftar Sekarang
                        </button>

                        <Link to="/login" className="block w-full py-3 bg-secondary text-primary font-semibold rounded-lg text-center hover:bg-green-100 transition-colors">
                            Masuk
                        </Link>
                    </form>

                    {/* --- DIVIDER --- */}
                    <div className="flex items-center my-6 text-gray-400 text-xs">
                        <div className="flex-1 border-b border-gray-200"></div>
                        <span className="px-3">atau</span>
                        <div className="flex-1 border-b border-gray-200"></div>
                    </div>

                    {/* --- GOOGLE LOGIN --- */}
                    <button className="w-full py-3 bg-white border border-gray-200 text-gray-600 font-medium rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5" />
                        Daftar dengan Google
                    </button>

                </div>
            </div>
        </>
    );
};

export default Register;