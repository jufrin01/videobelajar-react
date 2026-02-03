import React, { useState, useMemo, useEffect } from 'react';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';
import FilterGroup from '../components/FilterGroup';
import CheckboxItem from '../components/CheckboxItem';
import Pagination from '../components/Pagination';
import { coursesData } from '../data/coursesData';

const Kategori = () => {
    // STATE FILTER & SEARCH
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [sortOption, setSortOption] = useState("default");

    // STATE PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Menampilkan 9 kursus per halaman

    // 2. DATA TRANSFORMATION / MAPPING
    const enrichedData = useMemo(() => {
        return coursesData.map(course => {
            let filterCat = "Lainnya";
            const c = course.category;
            if (["Marketing"].includes(c)) filterCat = "Pemasaran";
            if (["UI/UX Design", "Data Science", "IT Security", "Programming"].includes(c)) filterCat = "Digital & Teknologi";
            if (["Soft Skills", "Language", "Creative"].includes(c)) filterCat = "Pengembangan Diri";
            if (["Business", "Finance"].includes(c)) filterCat = "Bisnis Manajemen";

            const isFree = course.id % 5 === 0;
            const durationType = course.totalModules > 15 ? "Lebih dari 8 Jam" : (course.totalModules > 8 ? "4 - 8 Jam" : "Kurang dari 4 Jam");

            return {
                ...course,
                filterCategory: filterCat,
                priceType: isFree ? "Gratis" : "Berbayar",
                priceDisplay: isFree ? "Gratis" : "Rp 300K",
                durationFilter: durationType
            };
        });
    }, []);

    // 3. LOGIKA FILTERING UTAMA
    const filteredCourses = useMemo(() => {
        let result = enrichedData.filter((course) => {
            const matchSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(course.filterCategory);
            const matchPrice = selectedPrices.length === 0 || selectedPrices.includes(course.priceType);
            const matchDuration = selectedDurations.length === 0 || selectedDurations.includes(course.durationFilter);
            return matchSearch && matchCategory && matchPrice && matchDuration;
        });

        if (sortOption === "low") result.sort((a, b) => (a.priceType === "Gratis" ? -1 : 1));
        else if (sortOption === "high") result.sort((a, b) => (a.priceType === "Berbayar" ? -1 : 1));
        else if (sortOption === "rating") result.sort((a, b) => b.rating - a.rating);

        return result;
    }, [searchTerm, selectedCategories, selectedPrices, selectedDurations, sortOption, enrichedData]);

    // 4. LOGIKA PAGINATION
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedCategories, selectedPrices, selectedDurations]);

    // Handler Filter Checkbox
    const handleFilterChange = (value, state, setState) => {
        if (state.includes(value)) {
            setState(state.filter(item => item !== value));
        } else {
            setState([...state, value]);
        }
    };

    const handleReset = () => {
        setSearchTerm("");
        setSelectedCategories([]);
        setSelectedPrices([]);
        setSelectedDurations([]);
        setSortOption("default");
        setCurrentPage(1);
    };

    //const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Layout>
            <div className="w-full max-w-7xl mx-auto px-6 py-12 font-poppins">

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
                            <button onClick={handleReset} className="text-[#FF5722] text-sm font-semibold hover:underline">Reset</button>
                        </div>

                        {/* Filter: Bidang Studi (Kategori Luas) */}
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
                                    <select
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                        className="appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:border-green-500 text-sm cursor-pointer"
                                    >
                                        <option value="default">Urutkan</option>
                                        <option value="low">Harga Terendah</option>
                                        <option value="high">Harga Tertinggi</option>
                                        <option value="rating">Rating Tertinggi</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <i className="fa-solid fa-chevron-down text-xs"></i>
                                    </div>
                                </div>

                                {/* INPUT SEARCH */}
                                <div className="relative flex-1 sm:w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari Kelas..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* GRID KELAS (Menggunakan Data yang sudah diproses) */}
                        {currentItems.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {currentItems.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        id={course.id} // ID Penting untuk Link
                                        img={course.image}
                                        title={course.title}
                                        desc={course.description}
                                        authorName={course.instructor.name}
                                        authorRole={course.instructor.role}
                                        authorImg={course.instructor.avatar}
                                        rating={course.rating}
                                        reviews={course.reviews}
                                        price={course.priceDisplay} // Menggunakan harga yang sudah dimapping
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <i className="fa-regular fa-folder-open text-6xl text-gray-300 mb-4"></i>
                                <p className="text-gray-500 font-medium">Kelas tidak ditemukan.</p>
                                <button onClick={handleReset} className="text-[#FF5722] mt-2 hover:underline">Reset Filter</button>
                            </div>
                        )}

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Kategori;
