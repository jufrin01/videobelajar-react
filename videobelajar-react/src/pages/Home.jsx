import React, { useState } from 'react';
import CourseCard from '../components/CourseCard';
import Layout from '../components/Layout';

const heroBg = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop";
const newsletterBg = "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop";

const Home = () => {
    // State untuk Tab Kategori Aktif
    const [activeTab, setActiveTab] = useState("Semua Kelas");
    const categories = ["Semua Kelas", "Pemasaran", "Desain", "Pengembangan Diri", "Bisnis"];

    return (
        // BUNGKUS SEMUA DENGAN LAYOUT
        <Layout>

            {/* === HERO SECTION === */}
            <div className="relative w-full h-[500px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('${heroBg}')` }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Revolusi Pembelajaran: Temukan <br className="hidden md:block" />
                        Ilmu Baru melalui Platform Video Interaktif!
                    </h1>
                    <p className="text-gray-200 text-sm md:text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                        Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi.
                    </p>
                    <button className="bg-primary hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg transform hover:scale-105">
                        Temukan Video Course untuk Dipelajari!
                    </button>
                </div>
            </div>

            {/* === SECTION KOLEKSI VIDEO === */}
            <div className="w-full max-w-7xl mx-auto px-6 py-12 pb-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Koleksi Video Pembelajaran Unggulan</h2>
                    <p className="text-gray-500">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
                </div>

                {/* Tab Kategori */}
                <div className="flex flex-wrap items-center gap-6 mb-10 border-b border-gray-100 pb-1">
                    {categories.map((cat) => (
                        <button key={cat} onClick={() => setActiveTab(cat)}
                                className={`pb-3 text-sm font-medium transition-all relative ${activeTab === cat ? 'text-orange' : 'text-gray-500 hover:text-gray-800'}`}>
                            {cat}
                            {activeTab === cat &&
                                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-orange rounded-t-md"></div>}
                        </button>
                    ))}
                </div>

                {/* Grid Kursus */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    <CourseCard
                        id={1}
                        img="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600"
                        title="Big 4 Auditor Financial Analyst"
                        desc="Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik."
                        authorName="Jufrin Abdul hamid"
                        authorRole="Senior Accountant di Gojek"
                        authorImg="https://ui-avatars.com/api/?name=Jenna+Ortega&background=FFD700&color=fff"
                        rating="3.5"
                        reviews="86"
                        price="Rp 300K"
                    />

                    {/* Kartu 2 */}
                    <CourseCard
                        id={2}
                        img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
                        title="Data Science Fundamentals"
                        desc="Pelajari dasar-dasar pengolahan data dengan Python dan SQL dari nol sampai mahir."
                        authorName="Budi Santoso"
                        authorRole="Data Scientist di Tokopedia"
                        authorImg="https://ui-avatars.com/api/?name=Budi+Santoso&background=0D8ABC&color=fff"
                        rating="4.2"
                        reviews="120"
                        price="Rp 300K"
                    />

                    {/* Kartu 3 */}
                    <CourseCard
                        id={3}
                        img="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600"
                        title="Digital Marketing Mastery"
                        desc="Kuasai strategi pemasaran digital, SEO, dan Social Media Ads untuk bisnis modern."
                        authorName="Siti Aminah"
                        authorRole="Marketing Lead di Shopee"
                        authorImg="https://ui-avatars.com/api/?name=Siti+Aminah&background=FF6B6B&color=fff"
                        rating="4.8"
                        reviews="45"
                        price="Rp 300K"
                    />

                    <CourseCard
                        id={4}
                        img="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600"
                        title="Corporate Finance 101"
                        desc="Memahami laporan keuangan perusahaan dan cara menganalisis kesehatan bisnis."
                        authorName="Jenna Ortega"
                        authorRole="Senior Accountant di Gojek"
                        authorImg="https://ui-avatars.com/api/?name=Jenna+Ortega&background=FFD700&color=fff"
                        rating="3.5"
                        reviews="86"
                        price="Rp 300K"
                    />
                    <CourseCard
                        id={4}
                        img="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"
                        title="Leadership & Management"
                        desc="Cara memimpin tim yang efektif dan produktif di era digital."
                        authorName="Michael Chen"
                        authorRole="VP HR di Traveloka"
                        authorImg="https://ui-avatars.com/api/?name=Michael+Chen&background=6C5CE7&color=fff"
                        rating="4.5"
                        reviews="60"
                        price="Rp 300K"
                    />
                    <CourseCard
                        id={5}
                        img="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
                        title="Business Strategy Expert"
                        desc="Rancang strategi bisnis yang unggul untuk memenangkan persaingan pasar."
                        authorName="Sarah Wijaya"
                        authorRole="CEO di Startup Indo"
                        authorImg="https://ui-avatars.com/api/?name=Sarah+Wijaya&background=00b894&color=fff"
                        rating="4.9"
                        reviews="210"
                        price="Rp 300K"
                    />

                </div>
            </div>

            {/* === NEWSLETTER SECTION === */}
            <div className="px-6 mb-20 mt-0">
                <div
                    className="relative w-full max-w-6xl mx-auto py-16 px-6 flex items-center justify-center bg-cover bg-center rounded-3xl overflow-hidden shadow-2xl"
                    style={{backgroundImage: `url('${newsletterBg}')`}}>
                    <div className="absolute inset-0 bg-black/70"></div>
                    <div className="relative z-10 text-center max-w-3xl mx-auto text-white">
                        <span
                            className="block text-sm font-semibold tracking-widest mb-3 uppercase text-gray-300">Newsletter</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Mau Belajar Lebih Banyak?</h2>
                        <p className="text-gray-200 mb-10 max-w-xl mx-auto leading-relaxed">
                            Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari
                            program-program terbaik kami.
                        </p>
                        <div className="bg-white p-2 rounded-full shadow-lg max-w-xl mx-auto flex items-center">
                            <input type="email" placeholder="Masukkan Emailmu"
                                   className="flex-1 px-6 py-3 rounded-full text-gray-700 focus:outline-none bg-transparent"/>
                            <button
                                className="bg-orange hover:bg-orange/90 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Home;