import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';

const COURSES_DATA = [
    {
        id: 1,
        title: "Big 4 Auditor Financial Analyst",
        desc: "Mulai transformasi dengan instruktur profesional.",
        authorName: "Jenna Ortega",
        authorRole: "Senior Accountant",
        authorImg: "https://ui-avatars.com/api/?name=Jenna+Ortega&background=FFD700&color=fff",
        rating: "4.5",
        reviews: "86",
        price: "Rp 300K",
        category: "Bisnis Manajemen", // Kategori untuk filter
        priceType: "Berbayar",        // Tipe harga untuk filter
        duration: "4 - 8 Jam"         // Durasi untuk filter
    },
    {
        id: 2,
        title: "Data Science Fundamentals",
        desc: "Pelajari dasar-dasar pengolahan data dengan Python.",
        authorName: "Budi Santoso",
        authorRole: "Data Scientist",
        authorImg: "https://ui-avatars.com/api/?name=Budi+Santoso&background=0D8ABC&color=fff",
        rating: "4.2",
        reviews: "120",
        price: "Rp 300K",
        category: "Digital & Teknologi",
        priceType: "Berbayar",
        duration: "Lebih dari 8 Jam"
    },
    {
        id: 3,
        title: "Digital Marketing Mastery",
        desc: "Kuasai strategi pemasaran digital modern.",
        authorName: "Siti Aminah",
        authorRole: "Marketing Lead",
        authorImg: "https://ui-avatars.com/api/?name=Siti+Aminah&background=FF6B6B&color=fff",
        rating: "4.8",
        reviews: "45",
        price: "Rp 1000K",
        category: "Pemasaran",
        priceType: "Berbayar",
        duration: "Kurang dari 4 Jam"
    },
    {
        id: 4,
        title: "Intro to Psychology",
        desc: "Memahami perilaku dasar manusia.",
        authorName: "Sigmund F",
        authorRole: "Psychologist",
        authorImg: "https://ui-avatars.com/api/?name=Sigmund&background=red&color=fff",
        rating: "4.6",
        reviews: "120",
        price: "Gratis",
        category: "Pengembangan Diri",
        priceType: "Gratis",
        duration: "Kurang dari 4 Jam"
    },

];


const Kategori = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedDurations, setSelectedDurations] = useState([]);

    // STATE SORTING (BARU)
    const [sortOption, setSortOption] = useState("default"); // default, low, high, rating

    // Handle Perubahan Filter Checkbox
    const handleFilterChange = (value, state, setState) => {
        if (state.includes(value)) {
            setState(state.filter(item => item !== value));
        } else {
            setState([...state, value]);
        }
    };

    // Handle Reset
    const handleReset = () => {
        setSearchTerm("");
        setSelectedCategories([]);
        setSelectedPrices([]);
        setSelectedDurations([]);
        setSortOption("default");
    };

    // LOGIKA UTAMA: FILTER -> KEMUDIAN SORT
    const getProcessedCourses = () => {
        // 1. Lakukan Filtering
        let result = COURSES_DATA.filter((course) => {
            const matchSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
            const matchPrice = selectedPrices.length === 0 || selectedPrices.includes(course.priceType);
            const matchDuration = selectedDurations.length === 0 || selectedDurations.includes(course.duration);

            return matchSearch && matchCategory && matchPrice && matchDuration;
        });

        // 2. Lakukan Sorting pada hasil filter
        if (sortOption === "low") {
            result.sort((a, b) => a.priceVal - b.priceVal);
        } else if (sortOption === "high") {
            result.sort((a, b) => b.priceVal - a.priceVal);
        } else if (sortOption === "rating") {
            result.sort((a, b) => b.rating - a.rating);
        }

        return result;
    };

    const filteredCourses = getProcessedCourses();


    return (
        <Layout>
            <div className="w-full max-w-7xl mx-auto px-6 py-12">

                {/* Header Judul */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Koleksi Video Pembelajaran Unggulan</h2>
                    <p className="text-gray-500">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* === SIDEBAR FILTER === */}
                    <div className="w-full lg:w-1/4 h-fit bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-800">Filter</h3>
                            <button onClick={handleReset} className="text-orange text-sm font-semibold hover:underline">Reset</button>
                        </div>

                        {/* Filter: Bidang Studi */}
                        <FilterGroup title="Bidang Studi" defaultOpen={true}>
                            {["Pemasaran", "Digital & Teknologi", "Pengembangan Diri", "Bisnis Manajemen"].map(cat => (
                                <CheckboxItem
                                    key={cat}
                                    label={cat}
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => handleFilterChange(cat, selectedCategories, setSelectedCategories)}
                                />
                            ))}
                        </FilterGroup>
                        <div className="border-t border-gray-100 my-4"></div>

                        {/* Filter: Harga */}
                        <FilterGroup title="Harga" defaultOpen={true}>
                            {["Gratis", "Berbayar"].map(price => (
                                <CheckboxItem
                                    key={price}
                                    label={price}
                                    checked={selectedPrices.includes(price)}
                                    onChange={() => handleFilterChange(price, selectedPrices, setSelectedPrices)}
                                />
                            ))}
                        </FilterGroup>
                        <div className="border-t border-gray-100 my-4"></div>

                        {/* Filter: Durasi */}
                        <FilterGroup title="Durasi" defaultOpen={true}>
                            {["Kurang dari 4 Jam", "4 - 8 Jam", "Lebih dari 8 Jam"].map(dur => (
                                <CheckboxItem
                                    key={dur}
                                    label={dur}
                                    checked={selectedDurations.includes(dur)}
                                    onChange={() => handleFilterChange(dur, selectedDurations, setSelectedDurations)}
                                />
                            ))}
                        </FilterGroup>
                    </div>

                    {/* === KONTEN KANAN === */}
                    <div className="flex-1">

                        {/* Search Bar & Sort */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0"></div>

                            <div className="flex gap-4 w-full sm:w-auto">
                                <div className="relative">
                                    <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:border-primary text-sm cursor-pointer">
                                        <option>Urutkan</option>
                                        <option>Harga Rendah</option>
                                        <option>Harga Tinggi</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <i className="fa-solid fa-chevron-down text-xs"></i>
                                    </div>
                                </div>

                                {/* INPUT SEARCH (Sudah dikoneksikan ke State) */}
                                <div className="relative flex-1 sm:w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari Kelas..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* GRID KELAS (Render Hasil Filter) */}
                        {filteredCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {filteredCourses.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        img="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600"
                                        title={course.title}
                                        desc={course.desc}
                                        authorName={course.authorName}
                                        authorRole={course.authorRole}
                                        authorImg={course.authorImg}
                                        rating={course.rating}
                                        reviews={course.reviews}
                                        price={course.price}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <i className="fa-regular fa-folder-open text-6xl text-gray-300 mb-4"></i>
                                <p className="text-gray-500 font-medium">Kelas tidak ditemukan.</p>
                                <button onClick={handleReset} className="text-primary mt-2 hover:underline">Reset Filter</button>
                            </div>
                        )}

                        {/* Pagination (Di Bawah Grid) */}
                        <div className="flex justify-center items-center gap-2">
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange text-white font-bold shadow-md shadow-orange/30">
                                1
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-orange font-medium transition-colors">
                                2
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-orange font-medium transition-colors">
                                3
                            </button>
                            <span className="text-gray-400 px-2">...</span>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-orange font-medium transition-colors">
                                6
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

// --- KOMPONEN KECIL UNTUK FILTER (Agar Rapi) ---
const FilterGroup = ({ title, children, defaultOpen = false }) => (
    <details className="group mb-2" open={defaultOpen}>
        <summary className="flex justify-between items-center font-semibold text-gray-700 cursor-pointer list-none py-2">
            <span className="flex items-center gap-2">{title}</span>
            <span className="transition group-open:rotate-180">
                <i className="fa-solid fa-chevron-down text-xs text-gray-400"></i>
            </span>
        </summary>
        <div className="text-sm text-gray-500 mt-2 mb-4 space-y-3 pl-1">
            {children}
        </div>
    </details>
);

const CheckboxItem = ({ label, checked = false }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center">
            <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded checked:bg-primary checked:border-primary transition-colors" defaultChecked={checked} />
            <i className="fa-solid fa-check text-white text-xs absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none"></i>
        </div>
        <span className="group-hover:text-primary transition-colors">{label}</span>
    </label>
);

export default Kategori;