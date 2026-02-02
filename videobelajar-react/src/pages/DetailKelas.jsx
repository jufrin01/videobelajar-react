import React, { useState, useEffect } from 'react';
import { useParams , Link } from 'react-router-dom';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';
import AccordionItem from '../components/AccordionItem';

// 1. DATA DUMMY LENGKAP (Update Struktur Kurikulum)
const COURSES_DATA = [
    {
        id: 1,
        title: "Big 4 Auditor Financial Analyst",
        category: "Bisnis Manajemen",
        desc: "Mulai transformasi dengan instruktur profesional. Pelajari teknik audit modern, analisis laporan keuangan, dan standar akuntansi internasional yang digunakan oleh firma Big 4.",
        price: "Rp 300K",
        originalPrice: "Rp 600K",
        tutor: {
            name: "Jenna Ortega",
            role: "Senior Accountant di Gojek",
            avatar: "https://ui-avatars.com/api/?name=Jenna+Ortega&background=FFD700&color=fff",
            bio: "Berpengalaman lebih dari 10 tahun di bidang audit dan akuntansi. Pernah bekerja di Deloitte dan PwC sebelum bergabung dengan Gojek."
        },
        rating: 4.5,
        reviews: 86,
        benefits: ["Sertifikat Kompetensi", "49 Video Materi", "12 Dokumen Studi", "Ujian Akhir"],
        curriculum: [
            {
                section: "Chapter 1: Introduction to Financial Audit",
                lessons: [
                    { title: "What is Financial Audit?", time: "12 Menit", type: "Video" },
                    { title: "Audit Process Overview", time: "15 Menit", type: "Video" },
                    { title: "Role of an Auditor", time: "10 Menit", type: "Video" }
                ]
            },
            {
                section: "Chapter 2: Understanding Balance Sheets",
                lessons: [
                    { title: "Assets, Liabilities, and Equity", time: "20 Menit", type: "Video" },
                    { title: "Reading Financial Statements", time: "25 Menit", type: "Video" }
                ]
            },
            {
                section: "Chapter 3: Risk Assessment Procedures",
                lessons: [
                    { title: "Identifying Risks", time: "15 Menit", type: "Video" },
                    { title: "Internal Control Testing", time: "30 Menit", type: "Video" },
                    { title: "Case Study: Risk Analysis", time: "45 Menit", type: "Quiz" }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Data Science Fundamentals",
        category: "Digital & Teknologi",
        desc: "Pelajari dasar-dasar pengolahan data dengan Python. Kursus ini mencakup manipulasi data, visualisasi, dan pengantar machine learning sederhana.",
        price: "Rp 300K",
        originalPrice: "Rp 500K",
        tutor: {
            name: "Budi Santoso",
            role: "Data Scientist di Tokopedia",
            avatar: "https://ui-avatars.com/api/?name=Budi+Santoso&background=0D8ABC&color=fff",
            bio: "Lulusan S2 Computer Science UI, aktif meneliti AI dan Big Data. Saat ini memimpin tim data di Tokopedia."
        },
        rating: 4.2,
        reviews: 120,
        benefits: ["Akses Python Notebook", "30 Video Materi", "Forum Diskusi", "Sertifikat"],
        curriculum: [
            {
                section: "Module 1: Intro to Python for Data Science",
                lessons: [
                    { title: "Setting up Environment (Anaconda)", time: "10 Menit", type: "Video" },
                    { title: "Python Basics: Variables & Loops", time: "25 Menit", type: "Video" }
                ]
            },
            {
                section: "Module 2: Pandas & NumPy Basics",
                lessons: [
                    { title: "Working with DataFrames", time: "30 Menit", type: "Video" },
                    { title: "Data Cleaning Techniques", time: "25 Menit", type: "Video" }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "UI/UX Design Mastering with Figma",
        category: "Desain Kreatif",
        desc: "Kuasai pembuatan user interface yang menarik dan user experience yang intuitif. Dari prototyping hingga hand-off ke developer.",
        price: "Rp 250K",
        originalPrice: "Rp 450K",
        tutor: {
            name: "Sarah Wijaya",
            role: "Product Designer di Traveloka",
            avatar: "https://ui-avatars.com/api/?name=Sarah+Wijaya&background=f43f5e&color=fff",
            bio: "Desainer produk dengan fokus pada sistem desain dan interaksi manusia. Memiliki portofolio global."
        },
        rating: 4.8,
        reviews: 215,
        benefits: ["UI Kit Eksklusif", "20 Video Tutorial", "Review Portofolio", "Grup WhatsApp"],
        curriculum: [
            {
                section: "Bab 1: UX Research Essentials",
                lessons: [
                    { title: "User Persona & Journey Mapping", time: "20 Menit", type: "Video" },
                    { title: "Conducting User Interviews", time: "35 Menit", type: "Video" }
                ]
            },
            {
                section: "Bab 2: High-Fidelity Design",
                lessons: [
                    { title: "Figma Components & Auto Layout", time: "40 Menit", type: "Video" },
                    { title: "Prototyping Interaction", time: "30 Menit", type: "Video" }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Digital Marketing Strategy 2024",
        category: "Pemasaran",
        desc: "Tingkatkan penjualan bisnis melalui SEO, SEM, dan Content Marketing. Belajar cara mengelola budget iklan secara efisien.",
        price: "Rp 150K",
        originalPrice: "Rp 350K",
        tutor: {
            name: "Andi Pratama",
            role: "Marketing Manager di Shopee",
            avatar: "https://ui-avatars.com/api/?name=Andi+Pratama&background=10b981&color=fff",
            bio: "Ahli dalam growth hacking dan performa marketing dengan pengalaman mengelola budget iklan milyaran rupiah."
        },
        rating: 4.6,
        reviews: 340,
        benefits: ["E-Book Strategi Iklan", "Sertifikat", "Update Materi Tahunan"],
        curriculum: [
            {
                section: "Section 1: SEO & SEM",
                lessons: [
                    { title: "Keyword Research Mastery", time: "15 Menit", type: "Video" },
                    { title: "Google Ads Setup Guide", time: "25 Menit", type: "Video" }
                ]
            },
            {
                section: "Section 2: Social Media Ads",
                lessons: [
                    { title: "FB & IG Ads Manager", time: "30 Menit", type: "Video" },
                    { title: "Copywriting for Conversions", time: "20 Menit", type: "Video" }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Public Speaking & Leadership",
        category: "Pengembangan Diri",
        desc: "Jadilah pemimpin yang berpengaruh dan komunikator yang handal di depan umum. Atasi rasa gugup dan kuasai teknik storytelling.",
        price: "Rp 200K",
        originalPrice: "Rp 400K",
        tutor: {
            name: "Merry Riana",
            role: "Motivational Speaker",
            avatar: "https://ui-avatars.com/api/?name=Merry+Riana&background=6366f1&color=fff",
            bio: "Inspirator nomor satu di Indonesia dan Asia. Penulis buku best-seller 'Mimpi Sejuta Dolar'."
        },
        rating: 4.9,
        reviews: 512,
        benefits: ["Sesi Live Tanya Jawab", "Panduan Storytelling", "Sertifikat"],
        curriculum: [
            {
                section: "Bab 1: Menghancurkan Mental Block",
                lessons: [
                    { title: "Mengatasi Rasa Takut", time: "15 Menit", type: "Video" },
                    { title: "Body Language Basics", time: "20 Menit", type: "Video" }
                ]
            },
            {
                section: "Bab 2: Art of Storytelling",
                lessons: [
                    { title: "Menyusun Struktur Pidato", time: "25 Menit", type: "Video" },
                    { title: "Teknik Olah Vokal", time: "20 Menit", type: "Video" }
                ]
            }
        ]
    }
];

const DetailKelas = () => {
    const { id } = useParams();

    // State untuk Accordion (Menyimpan index mana yang sedang terbuka)
    // Default 0 berarti bab pertama langsung terbuka
    const [openIndex, setOpenIndex] = useState(0);

    const course = COURSES_DATA.find(item => item.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Fungsi Toggle Accordion
    const toggleAccordion = (index) => {
        // Jika diklik yang sedang terbuka, maka tutup (-1). Jika beda, buka yang baru.
        setOpenIndex(openIndex === index ? -1 : index);
    };

    if (!course) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <h2 className="text-xl font-bold text-gray-600">Kursus tidak ditemukan :(</h2>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>

            {/* HERO SECTION */}
            <div className="bg-[#1c1c1c] text-white py-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000')" }}></div>
                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="text-sm text-gray-400 mb-4">
                        Beranda &gt; {course.category} &gt; <span className="text-white">{course.title}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-4xl">{course.title}</h1>
                    <p className="text-gray-300 mb-6 text-lg line-clamp-2 max-w-2xl">{course.desc}</p>
                    <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400 text-sm">
                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <span className="font-semibold underline">{course.rating} ({course.reviews} Review)</span>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="w-full max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* KONTEN KIRI */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Deskripsi */}
                        <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Deskripsi</h3>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                {course.desc} <br/><br/>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                            </p>
                        </div>

                        {/* Tutor */}
                        <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Belajar bersama Tutor Profesional</h3>
                            <div className="border border-gray-200 rounded-lg p-5">
                                <div className="flex items-center gap-4 mb-3">
                                    <img src={course.tutor.avatar} className="w-12 h-12 rounded-full" alt="Tutor" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{course.tutor.name}</h4>
                                        <p className="text-xs text-gray-500">{course.tutor.role}</p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">{course.tutor.bio}</p>
                            </div>
                        </div>

                        {/* KURIKULUM (ACCORDION BERFUNGSI) */}
                        <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Kurikulum Kelas</h3>
                            <div className="space-y-4">
                                {course.curriculum && course.curriculum.map((chapter, idx) => (
                                    <AccordionItem
                                        key={idx}
                                        title={chapter.section}
                                        isOpen={openIndex === idx} // Cek apakah index ini sedang dibuka
                                        onClick={() => toggleAccordion(idx)} // Fungsi klik
                                    >
                                        {/* Loop Materi di dalam Bab */}
                                        {chapter.lessons.map((lesson, i) => (
                                            <div key={i} className="flex justify-between items-center text-sm text-gray-500 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded transition-colors">
                                        <span className="flex items-center gap-3">
                                            <i className={`fa-regular ${lesson.type === 'Quiz' ? 'fa-clipboard-question text-orange' : 'fa-circle-play text-green-500'}`}></i>
                                            {lesson.title}
                                        </span>
                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{lesson.time}</span>
                                            </div>
                                        ))}
                                    </AccordionItem>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* SIDEBAR KANAN */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg sticky top-24">
                            <h3 className="font-bold text-lg mb-4 leading-snug">{course.title}</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-primary font-bold text-2xl">{course.price}</span>
                                <span className="text-gray-400 line-through text-sm">{course.originalPrice}</span>
                            </div>
                            <Link to={`/checkout/${course.id}`} className="block w-full text-center bg-primary hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all mb-6 transform hover:scale-105">
                                Beli Sekarang
                            </Link>
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-800 text-sm">Fasilitas Kelas</h4>
                                <ul className="text-sm text-gray-500 space-y-3">
                                    {course.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <i className="fa-solid fa-check text-green-500 w-4"></i> {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RELATED COURSES */}
                <div className="mt-20">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Video Pembelajaran Lainnya</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {COURSES_DATA.filter(c => c.id !== course.id).slice(0, 3).map(rel => (
                            <CourseCard
                                key={rel.id}
                                id={rel.id}
                                img="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600"
                                title={rel.title}
                                desc={rel.desc}
                                authorName={rel.tutor.name}
                                authorRole={rel.tutor.role}
                                authorImg={rel.tutor.avatar}
                                rating={rel.rating}
                                reviews={rel.reviews}
                                price={rel.price}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </Layout>
    );
};


export default DetailKelas;