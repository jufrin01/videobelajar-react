import React from 'react';
import logoImage from '../assets/images/logo.png'; // Pastikan path logo benar

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto">

                {/* === BAGIAN ATAS (Grid 4 Kolom) === */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

                    {/* Kolom 1: Logo & Alamat */}
                    <div className="lg:col-span-1">
                        <img src={logoImage} alt="Videobelajar Logo" className="h-8 mb-6" />
                        <h3 className="font-bold text-gray-800 text-lg mb-4 leading-snug">
                            Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">
                            Jl. Usman Effendi No. 50 Lowokwaru, Malang
                        </p>
                        <p className="text-gray-500 text-sm mb-2">
                            +62-877-7123-1234
                        </p>
                    </div>

                    {/* Kolom 2: Kategori */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-5">Kategori</h4>
                        <ul className="space-y-3 text-gray-500 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Digital & Teknologi</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Pemasaran</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Manajemen Bisnis</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Pengembangan Diri</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Desain</a></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Perusahaan */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-5">Perusahaan</h4>
                        <ul className="space-y-3 text-gray-500 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Tentang Kami</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Ketentuan Layanan</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Bantuan</a></li>
                        </ul>
                    </div>

                    {/* Kolom 4: Komunitas */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-5">Komunitas</h4>
                        <ul className="space-y-3 text-gray-500 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Tips Sukses</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                        </ul>
                    </div>
                </div>

                {/* === GARIS PEMBATAS === */}
                <div className="border-t border-gray-100 my-8"></div>

                {/* === BAGIAN BAWAH (Copyright & Sosmed) === */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm text-center md:text-left">
                        @2023 Gerobak Sayur All Rights Reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        {/* Icon Sosmed (LinkedIn, FB, IG, Twitter) */}
                        <SocialIcon icon="fa-linkedin-in" />
                        <SocialIcon icon="fa-facebook-f" />
                        <SocialIcon icon="fa-instagram" />
                        <SocialIcon icon="fa-twitter" />
                    </div>
                </div>

            </div>
        </footer>
    );
};

// Komponen Kecil untuk Icon Sosmed
const SocialIcon = ({ icon }) => (
    <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all">
        <i className={`fa-brands ${icon}`}></i>
    </a>
);

export default Footer;