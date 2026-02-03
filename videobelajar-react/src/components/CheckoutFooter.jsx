import React from 'react';
import logoImage from '../assets/images/logo.png';

const CheckoutFooter = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-10 pb-8 px-6 mt-12 md:hidden">

            {/* 1. Logo & Alamat */}
            <div className="mb-8">
                <img src={logoImage} alt="Videobelajar Logo" className="h-8 w-auto mb-6" />

                <h3 className="font-bold text-gray-900 text-lg mb-4 leading-snug">
                    Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
                </h3>

                <p className="text-gray-500 text-sm mb-1">
                    Jl. Usman Effendi No. 50 Lowokwaru, Malang
                </p>
                <p className="text-gray-500 text-sm">
                    +62-877-7123-1234
                </p>
            </div>

            {/* 2. Menu Link (Accordions/List Style) */}
            <div className="mb-8">
                <FooterLinkItem label="Kategori" />
                <FooterLinkItem label="Perusahaan" />
                <FooterLinkItem label="Komunitas" />
            </div>

            {/* 3. Social Media */}
            <div className="flex gap-4 mb-8">
                <SocialIcon icon="fa-linkedin-in" />
                <SocialIcon icon="fa-facebook-f" />
                <SocialIcon icon="fa-instagram" />
                <SocialIcon icon="fa-twitter" />
            </div>

            {/* 4. Copyright */}
            <p className="text-gray-400 text-sm">
                @2023 Gerobak Sayur All Rights Reserved.
            </p>

        </footer>
    );
};

// --- Sub-Components ---

const FooterLinkItem = ({ label }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group">
        <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">{label}</span>
        <i className="fa-solid fa-chevron-right text-gray-400 text-sm group-hover:text-primary transition-colors"></i>
    </div>
);

const SocialIcon = ({ icon }) => (
    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all">
        <i className={`fa-brands ${icon}`}></i>
    </a>
);

export default CheckoutFooter;