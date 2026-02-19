import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FormInput from '../components/FormInput';

const Login = () => {
    const navigate = useNavigate();

    // State Data Login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Fungsi Handle Login (DENGAN SISTEM ROLE)
    const handleLogin = (e) => {
        e.preventDefault();

        // --- SIMULASI DATABASE USER ---
        const adminData = { email: "admin@gmail.com", pass: "123", role: "admin", name: "Pak Admin" };
        const userData = { email: "user@gmail.com", pass: "123", role: "user", name: "Siswa Teladan" };

        // Cek kecocokan
        let loggedInUser = null;

        if (email === adminData.email && password === adminData.pass) {
            loggedInUser = { name: adminData.name, email: adminData.email, role: adminData.role };
        } else if (email === userData.email && password === userData.pass) {
            loggedInUser = { name: userData.name, email: userData.email, role: userData.role };
        } else if (email === "jufrin@gmail.com" && password === "123") {
            // Menjaga login lama Anda tetap jalan sebagai USER
            loggedInUser = { name: "Jufrin Bima", email: "jufrin@gmail.com", role: "user" };
        }

        // --- LOGIKA SETELAH CEK ---
        if (loggedInUser) {
            // 1. Simpan data user beserta 'role' ke LocalStorage
            localStorage.setItem("user", JSON.stringify(loggedInUser));

            // 2. Beri notif & Pindah Halaman sesuai Role
            alert(`Login Sukses! Selamat datang, ${loggedInUser.name} (${loggedInUser.role.toUpperCase()})`);

            // Jika admin arahkan langsung ke Dashboard Admin, jika user ke Home
            if (loggedInUser.role === 'admin') {
                navigate("/admin");
            } else {
                navigate("/home");
            }

            window.location.reload(); // Refresh agar Navbar & Route mendeteksi perubahan
        } else {
            alert("❌ Login Gagal! Email atau Password salah.\n\n(Tips Akun Testing:\nAdmin = admin@gmail.com / 123\nUser = user@gmail.com / 123)");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50/50 font-poppins px-4 py-10">
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] w-full max-w-[450px] border border-gray-100 animate-fade-in-up">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Masuk ke Akun</h2>
                        <p className="text-sm text-gray-500">Yuk, lanjutin belajarmu di videobelajar.</p>
                    </div>

                    {/* Informasi Akun Demo */}
                    <div className="mb-6 bg-blue-50 border border-blue-100 p-3 rounded-lg text-xs text-blue-700 font-medium text-center">
                        <p>Demo Akun Admin: <b>admin@gmail.com</b> | Pass: <b>123</b></p>
                        <p>Demo Akun User: <b>user@gmail.com</b> | Pass: <b>123</b></p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin}>
                        {/* Input Email */}
                        <div className="mb-5">
                            <label className="block text-sm font-bold text-gray-700 mb-2">E-Mail</label>
                            <FormInput
                                type="email"
                                placeholder="Masukkan E-Mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Input Kata Sandi */}
                        <div className="mb-6 relative">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Kata Sandi</label>
                            <div className="relative">
                                <FormInput
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Masukkan Kata Sandi"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-lg`}></i>
                                </button>
                            </div>
                            <div className="flex justify-end mt-2">
                                <a href="#" className="text-sm font-semibold text-gray-500 hover:text-green-600 transition-colors">Lupa Kata Sandi?</a>
                            </div>
                        </div>

                        {/* Tombol Login */}
                        <button type="submit" className="w-full py-3 bg-[#3ECF4C] text-white font-semibold rounded-lg hover:bg-green-600 transition-colors mb-4 shadow-sm">
                            Masuk
                        </button>

                        {/* Tombol ke Register */}
                        <Link to="/register" className="block w-full py-3 bg-[#e8fbe9] text-[#3ECF4C] font-semibold rounded-lg text-center hover:bg-green-100 transition-colors">
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
                    <button className="w-full py-3 bg-white border border-gray-200 text-gray-600 font-medium rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5" />
                        Masuk dengan Google
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;