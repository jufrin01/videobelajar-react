import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FormInput from '../components/FormInput';

// 1. IMPORT FIREBASE AUTH
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State Loading dan Error
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (formData.password !== formData.confirmPassword) {
            setErrorMsg("❌ Password dan Konfirmasi Password tidak sama!");
            return;
        }

        setIsLoading(true);

        try {
            // 2. PROSES DAFTAR KE FIREBASE
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // 3. SIMPAN NAMA USER KE FIREBASE
            await updateProfile(user, {
                displayName: formData.name
            });

            // 4. SIMPAN DATA KE LOCAL STORAGE (Untuk Navbar)
            const userData = {
                uid: user.uid,
                email: user.email,
                name: formData.name,
                role: "user" // Default menjadi user biasa
            };
            localStorage.setItem("user", JSON.stringify(userData));

            alert("✅ Pendaftaran Berhasil! Akun Anda sudah terdaftar di Server.");
            navigate("/"); // Langsung ke Beranda
            window.location.reload();

        } catch (error) {
            console.error("Firebase Error:", error.code);
            if (error.code === 'auth/email-already-in-use') {
                setErrorMsg("Email sudah terdaftar. Silakan gunakan email lain atau Masuk.");
            } else if (error.code === 'auth/weak-password') {
                setErrorMsg("Kata sandi terlalu lemah (minimal 6 karakter).");
            } else {
                setErrorMsg("Terjadi kesalahan sistem. Silakan coba lagi.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex-1 flex justify-center items-center p-5 pb-20">
                <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 text-center">

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Pendaftaran Akun</h2>
                    <p className="text-gray-400 text-sm mb-6">Yuk, daftarkan akunmu sekarang juga!</p>

                    {/* Pesan Error */}
                    {errorMsg && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm font-medium border border-red-100">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="text-left">

                        {/* --- NAMA LENGKAP --- */}
                        <FormInput
                            label="Nama Lengkap"
                            type="text"
                            placeholder="Contoh: Jufrin Bima"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} // <-- UBAH BAGIAN INI
                            required
                        />

                        {/* --- E-MAIL --- */}
                        <FormInput
                            label="E-Mail"
                            type="email"
                            placeholder="nama@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} // <-- UBAH BAGIAN INI
                            required
                        />
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                No. Hp <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center px-3 py-3 border border-gray-200 rounded-lg bg-gray-50 w-[100px] select-none">
                                    <img src="https://flagcdn.com/w40/id.png" alt="ID" className="w-5 h-auto mr-2 rounded-sm shadow-sm" />
                                    <span className="text-sm font-medium text-gray-700">+62</span>
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3ECF4C] focus:ring-1 focus:ring-[#3ECF4C] transition-colors"
                                    placeholder="81234567890"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Kata Sandi <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3ECF4C] focus:ring-1 focus:ring-[#3ECF4C]"
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

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Konfirmasi Kata Sandi <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3ECF4C] focus:ring-1 focus:ring-[#3ECF4C]"
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

                        <button type="submit" disabled={isLoading} className="w-full py-3 bg-[#3ECF4C] text-white font-semibold rounded-lg hover:bg-green-600 transition-colors mb-4 shadow-sm disabled:opacity-50">
                            {isLoading ? "Memproses..." : "Daftar Sekarang"}
                        </button>

                        <Link to="/login" className="block w-full py-3 bg-[#e8fbe9] text-[#3ECF4C] font-semibold rounded-lg text-center hover:bg-green-100 transition-colors">
                            Masuk
                        </Link>
                    </form>

                    <div className="flex items-center my-6 text-gray-400 text-xs">
                        <div className="flex-1 border-b border-gray-200"></div>
                        <span className="px-3">atau</span>
                        <div className="flex-1 border-b border-gray-200"></div>
                    </div>

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