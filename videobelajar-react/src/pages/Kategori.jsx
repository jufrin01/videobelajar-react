import React, { useState, useMemo, useEffect } from 'react';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';
import FilterGroup from '../components/FilterGroup';
import CheckboxItem from '../components/CheckboxItem';
import Pagination from '../components/Pagination';


import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../store/courseSlice';

const Kategori = () => {
    const dispatch = useDispatch();
    const { data: courses, isLoading } = useSelector((state) => state.courses);

    // STATE FILTER & SEARCH
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [sortOption, setSortOption] = useState("default");

    // STATE PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // TRIGGER BACKEND (SERVER-SIDE SEARCH & SORT)

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            const queryParams = {};

            if (searchTerm) queryParams.search = searchTerm;
            if (sortOption !== "default") queryParams.sort = sortOption;
            // Mengirim parameter ke Backend via Redux
            dispatch(fetchCourses(queryParams));

        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, sortOption, dispatch]);

    // MAPPING DATA (Persiapan Filter Sidebar Lokal)
    const enrichedData = useMemo(() => {
        if (!courses || courses.length === 0) return [];

        return courses.map(course => {
            let filterCat = "Lainnya";
            const c = course.category || "";

            if (["Marketing", "Pemasaran"].includes(c)) filterCat = "Pemasaran";
            if (["UI/UX Design", "Data Science", "IT Security", "Programming", "Teknologi", "IT & Software", "Web Development"].includes(c)) filterCat = "Digital & Teknologi";
            if (["Soft Skills", "Language", "Creative", "Pengembangan Diri", "Desain"].includes(c)) filterCat = "Pengembangan Diri";
            if (["Business", "Finance", "Bisnis"].includes(c)) filterCat = "Bisnis Manajemen";

            const priceVal = Number(course.price) || 0;
            const isFree = priceVal === 0;

            const totalMod = course.modules ? course.modules.length : 0;
            const durationType = totalMod > 15 ? "Lebih dari 8 Jam" : (totalMod > 8 ? "4 - 8 Jam" : "Kurang dari 4 Jam");

            return {
                ...course,
                filterCategory: filterCat,
                priceType: isFree ? "Gratis" : "Berbayar",
                priceDisplay: isFree ? "Gratis" : `Rp ${priceVal.toLocaleString('id-ID')}`,
                durationFilter: durationType
            };
        });
    }, [courses]);

    // LOGIKA FILTERING CHECKBOX LOKAL (Tanpa Search & Sort)
    const filteredCourses = useMemo(() => {
        return enrichedData.filter((course) => {
            const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(course.filterCategory);
            const matchPrice = selectedPrices.length === 0 || selectedPrices.includes(course.priceType);
            const matchDuration = selectedDurations.length === 0 || selectedDurations.includes(course.durationFilter);
            return matchCategory && matchPrice && matchDuration;
        });
    }, [selectedCategories, selectedPrices, selectedDurations, enrichedData]);

    // LOGIKA PAGINATION
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedCategories, selectedPrices, selectedDurations]);

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
                            <button onClick={handleReset} className="text-[#3ECF4C] text-sm font-semibold hover:underline">Reset</button>
                        </div>

                        <FilterGroup title="Bidang Studi" defaultOpen={true}>
                            {["Pemasaran", "Digital & Teknologi", "Pengembangan Diri", "Bisnis Manajemen"].map(cat => (
                                <CheckboxItem key={cat} label={cat} checked={selectedCategories.includes(cat)} onChange={() => handleFilterChange(cat, selectedCategories, setSelectedCategories)} />
                            ))}
                        </FilterGroup>
                        <div className="border-t border-gray-100 my-4"></div>

                        <FilterGroup title="Harga" defaultOpen={true}>
                            {["Gratis", "Berbayar"].map(price => (
                                <CheckboxItem key={price} label={price} checked={selectedPrices.includes(price)} onChange={() => handleFilterChange(price, selectedPrices, setSelectedPrices)} />
                            ))}
                        </FilterGroup>
                        <div className="border-t border-gray-100 my-4"></div>

                        <FilterGroup title="Durasi" defaultOpen={true}>
                            {["Kurang dari 4 Jam", "4 - 8 Jam", "Lebih dari 8 Jam"].map(dur => (
                                <CheckboxItem key={dur} label={dur} checked={selectedDurations.includes(dur)} onChange={() => handleFilterChange(dur, selectedDurations, setSelectedDurations)} />
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
                                        className="appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:border-[#3ECF4C] focus:ring-1 focus:ring-[#3ECF4C] text-sm cursor-pointer"
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
                                        placeholder="Cari Kelas di Server..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#3ECF4C] focus:ring-1 focus:ring-[#3ECF4C] text-sm"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* GRID KELAS */}
                        {isLoading ? (
                            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <i className="fa-solid fa-spinner fa-spin text-4xl mb-4 text-[#3ECF4C]"></i>
                                <p className="text-gray-500 font-medium">Mencari data dari server...</p>
                            </div>
                        ) : currentItems.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {currentItems.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        id={course.id}
                                        img={course.image || course.imageUrl}
                                        title={course.title}
                                        desc={course.description}
                                        authorName={course.instructor?.name || "Instruktur"}
                                        authorRole={course.instructor?.role || "Tutor"}
                                        authorImg={course.instructor?.avatar || `https://ui-avatars.com/api/?name=${course.instructor?.name || 'A'}`}
                                        rating={course.rating || 0}
                                        reviews={course.reviews || 0}
                                        price={course.priceDisplay}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 border border-dashed border-gray-200 rounded-xl bg-gray-50">
                                <i className="fa-regular fa-folder-open text-6xl text-gray-300 mb-4"></i>
                                <p className="text-gray-500 font-medium">Kelas tidak ditemukan.</p>
                                <button onClick={handleReset} className="text-[#3ECF4C] mt-2 font-bold hover:underline">Reset Filter</button>
                            </div>
                        )}

                        {/* KOMPONEN PAGINATION */}
                        {!isLoading && totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => {
                                    setCurrentPage(page);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Kategori;