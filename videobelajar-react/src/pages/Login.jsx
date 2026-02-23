import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FormInput from '../components/FormInput';

// 1. IMPORT FIREBASE AUTH
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // State Loading dan Error
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setIsLoading(true);

        // --- BYPASS ADMIN MANUAL (Sampai Anda punya tabel Admin di DB) ---
        if (email === "admin@gmail.com" && password === "admin123") {
            const adminData = { email: "admin@gmail.com", role: "admin", name: "Super Admin" };
            localStorage.setItem("user", JSON.stringify(adminData));
            navigate("/admin");
            window.location.reload();
            return;
        }

        try {
            // 2. CEK LOGIN KE FIREBASE
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 3. SIMPAN DATA KE LOCAL STORAGE
            const userData = {
                uid: user.uid,
                email: user.email,
                name: user.displayName || user.email.split('@')[0],
                role: "user"
            };
            localStorage.setItem("user", JSON.stringify(userData));

            alert("✅ Berhasil Masuk!");
            navigate("/");
            window.location.reload();

        } catch (error) {
            console.error("Firebase Login Error:", error.code);
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                setErrorMsg("Email atau Kata Sandi salah.");
            } else if (error.code === 'auth/too-many-requests') {
                setErrorMsg("Terlalu banyak percobaan gagal. Coba lagi nanti.");
            } else {
                setErrorMsg("Terjadi kesalahan. Silakan coba lagi.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50/50 font-poppins px-4 py-10">
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] w-full max-w-[450px] border border-gray-100 animate-fade-in-up">

                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Masuk ke Akun</h2>
                        <p className="text-sm text-gray-500">Yuk, lanjutin belajarmu di videobelajar.</p>
                    </div>

                    <div className="mb-6 bg-blue-50 border border-blue-100 p-3 rounded-lg text-xs text-blue-700 font-medium text-center">
                        <p>Demo Akun Admin: <b>admin@gmail.com</b> | Pass: <b>admin123</b></p>
                    </div>

                    {/* Pesan Error */}
                    {errorMsg && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm font-medium border border-red-100 text-center">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="mb-5">
                            <label className="block text-sm font-bold text-gray-700 mb-2">E-Mail</label>
                            <FormInput
                                type="email"
                                placeholder="Masukkan E-Mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

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
                                <a href="#" className="text-sm font-semibold text-gray-500 hover:text-[#3ECF4C] transition-colors">Lupa Kata Sandi?</a>
                            </div>
                        </div>

                        <button type="submit" disabled={isLoading} className="w-full py-3 bg-[#3ECF4C] text-white font-semibold rounded-lg hover:bg-green-600 transition-colors mb-4 shadow-sm disabled:opacity-50">
                            {isLoading ? "Memeriksa..." : "Masuk"}
                        </button>

                        <Link to="/register" className="block w-full py-3 bg-[#e8fbe9] text-[#3ECF4C] font-semibold rounded-lg text-center hover:bg-green-100 transition-colors">
                            Daftar
                        </Link>
                    </form>

                    <div className="flex items-center my-6 text-gray-400 text-xs">
                        <div className="flex-1 border-b border-gray-200"></div>
                        <span className="px-3">atau</span>
                        <div className="flex-1 border-b border-gray-200"></div>
                    </div>

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