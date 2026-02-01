import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FormInput from '../components/FormInput'; // Import komponen Input

const Login = () => {
    const navigate = useNavigate();

    // State Data Login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Fungsi Handle Login
    const handleLogin = (e) => {
        e.preventDefault();

        // DATA DUMMY (Simulasi Backend)
        const validEmail = "jufrin@gmail.com";
        const validPass = "123";

        if (email === validEmail && password === validPass) {
            // 1. Simpan data user ke LocalStorage (anggap token)
            const userData = { name: "Jufrin Bima", email: validEmail };
            localStorage.setItem("user", JSON.stringify(userData));

            // 2. Beri notif & Pindah ke Home
            alert("✅ Login Sukses! Selamat datang.");
            navigate("/home");
            window.location.reload(); // Refresh agar Navbar mendeteksi perubahan
        } else {
            alert("❌ Login Gagal! Email atau Password salah.\n(Tips: Gunakan jufrin@gmail.com & 123)");
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex-1 flex justify-center items-center p-5 pb-20">

                {/* KARTU LOGIN */}
                <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 text-center">

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Masuk ke Akun</h2>
                    <p className="text-gray-400 text-sm mb-8">Yuk, lanjutin belajarmu di videobelajar.</p>

                    <form onSubmit={handleLogin} className="text-left">

                        {/* 1. Input Email (Pakai Komponen FormInput) */}
                        <FormInput
                            label="E-Mail"
                            type="email"
                            placeholder="nama@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {/* 2. Input Password (Manual karena butuh Icon Mata) */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Kata Sandi <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {/* Icon Mata */}
                                <i
                                    className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600`}
                                    onClick={() => setShowPassword(!showPassword)}
                                ></i>
                            </div>
                        </div>

                        <a href="#" className="block text-right text-sm font-medium text-gray-500 mb-6 hover:text-primary">Lupa Password?</a>

                        {/* Tombol Login */}
                        <button type="submit" className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-600 transition-colors mb-4 shadow-sm">
                            Masuk
                        </button>

                        {/* Tombol ke Register */}
                        <Link to="/register" className="block w-full py-3 bg-secondary text-primary font-semibold rounded-lg text-center hover:bg-green-100 transition-colors">
                            Daftar
                        </Link>
                    </form>

                    {/* Divider Atau */}
                    <div className="flex items-center my-6 text-gray-400 text-xs">
                        <div className="flex-1 border-b border-gray-200"></div>
                        <span className="px-3">atau</span>
                        <div className="flex-1 border-b border-gray-200"></div>
                    </div>

                    {/* Login Google */}
                    <button className="w-full py-3 bg-white border border-gray-200 text-gray-600 font-medium rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5" />
                        Masuk dengan Google
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;