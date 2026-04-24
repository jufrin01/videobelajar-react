import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { addCourse, updateCourse, deleteCourse, fetchCourses } from '../store/courseSlice';
import { addBank, updateBank, deleteBank, fetchBanks } from '../store/bankSlice';

const AdminDashboard = () => {
    const dispatch = useDispatch();

    // DATA KELAS
    const { data: courses, isLoading: isCoursesLoading } = useSelector((state) => state.courses);
    const [isEditingCourse, setIsEditingCourse] = useState(null);

    // DATA BANK
    const { data: banks, isLoading: isBanksLoading } = useSelector((state) => state.banks);
    const [isEditingBank, setIsEditingBank] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('courses'); // 'courses' atau 'banks'

    // Ambil data saat pertama kali buka Dashboard
    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchBanks());
    }, [dispatch]);

    // ==========================================
    // STATE & LOGIKA: KELAS
    // ==========================================
    const [courseForm, setCourseForm] = useState({
        title: "", category: "Teknologi", description: "", price: "", image: "",
        instructorName: "Admin", instructorRole: "Senior Tutor", modules: [], userReviews: []
    });

    const handleCourseChange = (e) => setCourseForm({ ...courseForm, [e.target.name]: e.target.value });

    const handleAddModule = () => setCourseForm({ ...courseForm, modules: [...courseForm.modules, { title: "", items: [] }] });
    const handleModuleTitleChange = (index, value) => {
        const newModules = [...courseForm.modules];
        newModules[index].title = value;
        setCourseForm({ ...courseForm, modules: newModules });
    };
    const handleAddItemToModule = (moduleIndex) => {
        const newModules = [...courseForm.modules];
        newModules[moduleIndex].items.push({ id: Date.now(), type: "video", title: "", time: "0 Menit", status: "locked", videoId: "" });
        setCourseForm({ ...courseForm, modules: newModules });
    };
    const handleItemChange = (mIndex, iIndex, field, value) => {
        const newModules = [...courseForm.modules];
        newModules[mIndex].items[iIndex][field] = value;
        setCourseForm({ ...courseForm, modules: newModules });
    };
    const handleDeleteModule = (mIndex) => setCourseForm({ ...courseForm, modules: courseForm.modules.filter((_, i) => i !== mIndex) });
    const handleDeleteItem = (mIndex, iIndex) => {
        const newModules = [...courseForm.modules];
        newModules[mIndex].items = newModules[mIndex].items.filter((_, i) => i !== iIndex);
        setCourseForm({ ...courseForm, modules: newModules });
    };

    const handleAddReview = () => setCourseForm({ ...courseForm, userReviews: [...courseForm.userReviews, { id: Date.now(), name: "", role: "Siswa", rating: 5, comment: "", avatar: "" }] });
    const handleReviewChange = (index, field, value) => {
        const newReviews = [...courseForm.userReviews];
        newReviews[index][field] = field === 'rating' ? Number(value) : value;
        if (field === 'name') newReviews[index].avatar = `https://ui-avatars.com/api/?name=${value.replace(/\s+/g, '+')}&background=random`;
        setCourseForm({ ...courseForm, userReviews: newReviews });
    };
    const handleDeleteReview = (index) => setCourseForm({ ...courseForm, userReviews: courseForm.userReviews.filter((_, i) => i !== index) });

    const handleCourseSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const totalRatingSum = courseForm.userReviews.reduce((sum, r) => sum + r.rating, 0);
        const calculatedRating = courseForm.userReviews.length > 0 ? (totalRatingSum / courseForm.userReviews.length).toFixed(1) : 0;

        const dataToSave = {
            title: courseForm.title, category: courseForm.category, description: courseForm.description,
            price: Number(courseForm.price) || 0, image: courseForm.image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
            progress: 0, totalModules: courseForm.modules.length, completedModules: 0,
            rating: Number(calculatedRating), reviews: courseForm.userReviews.length, userReviews: courseForm.userReviews,
            instructor: { name: courseForm.instructorName, role: courseForm.instructorRole, avatar: `https://ui-avatars.com/api/?name=${courseForm.instructorName.replace(/\s+/g, '+')}` },
            modules: courseForm.modules
        };

        try {
            if (isEditingCourse) {
                await dispatch(updateCourse({ id: isEditingCourse, updatedData: dataToSave })).unwrap();
                alert("Kelas berhasil diperbarui!");
            } else {
                await dispatch(addCourse(dataToSave)).unwrap();
                alert("Kelas baru berhasil ditambahkan!");
            }
            setIsEditingCourse(null);
            setCourseForm({ title: "", category: "Teknologi", description: "", price: "", image: "", instructorName: "Admin", instructorRole: "Senior Tutor", modules: [], userReviews: [] });
        } catch (error) { alert("Gagal menyimpan data kelas."); } finally { setIsSubmitting(false); }
    };

    const handleCourseEditClick = (course) => {
        setIsEditingCourse(course.id);
        setCourseForm({
            title: course.title || "", category: course.category || "Teknologi", description: course.description || "", price: course.price || 0, image: course.image || "",
            instructorName: course.instructor?.name || "", instructorRole: course.instructor?.role || "", modules: course.modules || [], userReviews: course.userReviews || []
        });
    };

    const handleCourseDeleteClick = async (id) => {
        if (window.confirm("Hapus kelas ini secara permanen?")) await dispatch(deleteCourse(id)).unwrap();
    };

    // ==========================================
    // STATE & LOGIKA: BANK
    // ==========================================
    const [bankForm, setBankForm] = useState({ name: "", logo: "", themeColor: "text-blue-600", vaCode: "", instAtm: "", instMobile: "", instInternet: "" });

    const handleBankChange = (e) => setBankForm({ ...bankForm, [e.target.name]: e.target.value });

    const handleBankSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Ubah text per baris menjadi Array JSON untuk disimpan di PostgreSQL
        const instructionsJson = {
            atm: bankForm.instAtm.split('\n').filter(Boolean),
            mobile: bankForm.instMobile.split('\n').filter(Boolean),
            internet: bankForm.instInternet.split('\n').filter(Boolean)
        };

        const bankData = {
            name: bankForm.name, logo: bankForm.logo, themeColor: bankForm.themeColor,
            vaCode: bankForm.vaCode, instructions: instructionsJson
        };

        try {
            if (isEditingBank) {
                await dispatch(updateBank({ id: isEditingBank, updatedData: bankData })).unwrap();
                alert("Bank berhasil diperbarui!");
            } else {
                await dispatch(addBank(bankData)).unwrap();
                alert("Bank berhasil ditambahkan!");
            }
            setIsEditingBank(null);
            setBankForm({ name: "", logo: "", themeColor: "text-blue-600", vaCode: "", instAtm: "", instMobile: "", instInternet: "" });
        } catch (error) { alert("Gagal menyimpan bank."); } finally { setIsSubmitting(false); }
    };

    const handleBankEditClick = (bank) => {
        setIsEditingBank(bank.id);
        setBankForm({
            name: bank.name, logo: bank.logo, themeColor: bank.theme_color || bank.themeColor, vaCode: bank.va_code || bank.vaCode,
            instAtm: bank.instructions?.atm?.join('\n') || "", instMobile: bank.instructions?.mobile?.join('\n') || "", instInternet: bank.instructions?.internet?.join('\n') || ""
        });
    };

    const handleBankDeleteClick = async (id) => {
        if (window.confirm("Hapus bank ini secara permanen?")) await dispatch(deleteBank(id)).unwrap();
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-10 font-poppins min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
                </div>

                {/* TABS NAVIGASI */}
                <div className="flex gap-4 border-b border-gray-200 mb-8">
                    <button onClick={() => setActiveTab('courses')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeTab === 'courses' ? 'border-[#3ECF4C] text-[#3ECF4C]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                        <i className="fa-solid fa-book mr-2"></i>Kelola Kelas
                    </button>
                    <button onClick={() => setActiveTab('banks')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeTab === 'banks' ? 'border-[#3ECF4C] text-[#3ECF4C]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                        <i className="fa-solid fa-building-columns mr-2"></i>Kelola Metode Pembayaran
                    </button>
                </div>

                {/* =========================================
                    TAB 1: KELOLA KELAS
                ========================================= */}
                {activeTab === 'courses' && (
                    <>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
                            <h2 className="font-bold text-lg mb-6 text-[#3ECF4C]">{isEditingCourse ? `Edit Kelas (ID: ${isEditingCourse})` : "Tambah Kelas Baru"}</h2>
                            <form onSubmit={handleCourseSubmit} className="space-y-6">
                                {/* INFORMASI DASAR */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">1. Informasi Dasar</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="col-span-2 md:col-span-1"><label className="block text-xs font-bold text-gray-600 mb-1">Judul Kelas</label><input type="text" name="title" value={courseForm.title} onChange={handleCourseChange} className="w-full border p-2.5 rounded focus:ring-2 focus:ring-[#3ECF4C]" required /></div>
                                        <div><label className="block text-xs font-bold text-gray-600 mb-1">Kategori</label><select name="category" value={courseForm.category} onChange={handleCourseChange} className="w-full border p-2.5 rounded focus:ring-2 focus:ring-[#3ECF4C]">{["Teknologi", "Bisnis", "Pemasaran", "Desain", "Pengembangan Diri"].map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
                                        <div><label className="block text-xs font-bold text-gray-600 mb-1">Harga (Rp)</label><input type="number" name="price" value={courseForm.price} onChange={handleCourseChange} className="w-full border p-2.5 rounded focus:ring-2 focus:ring-[#3ECF4C]" required /></div>
                                        <div><label className="block text-xs font-bold text-gray-600 mb-1">URL Gambar Thumbnail</label><input type="text" name="image" value={courseForm.image} onChange={handleCourseChange} className="w-full border p-2.5 rounded focus:ring-2 focus:ring-[#3ECF4C]" /></div>
                                        <div><label className="block text-xs font-bold text-gray-600 mb-1">Nama Instruktur</label><input type="text" name="instructorName" value={courseForm.instructorName} onChange={handleCourseChange} className="w-full border p-2.5 rounded focus:ring-2 focus:ring-[#3ECF4C]" required /></div>
                                        <div><label className="block text-xs font-bold text-gray-600 mb-1">Role Instruktur</label><input type="text" name="instructorRole" value={courseForm.instructorRole} onChange={handleCourseChange} className="w-full border p-2.5 rounded focus:ring-2 focus:ring-[#3ECF4C]" required /></div>
                                        <div className="col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Deskripsi Singkat</label><textarea name="description" value={courseForm.description} onChange={handleCourseChange} className="w-full border p-2.5 rounded focus:ring-2 focus:ring-[#3ECF4C]" rows="2" required></textarea></div>
                                    </div>
                                </div>

                                {/* KURIKULUM */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="flex justify-between items-center border-b pb-2 mb-4"><h3 className="font-bold text-gray-700">2. Kurikulum Kelas</h3><button type="button" onClick={handleAddModule} className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1"><i className="fa-solid fa-plus"></i> Tambah Modul</button></div>
                                    {courseForm.modules.length === 0 ? <p className="text-sm text-gray-500 italic text-center py-4">Belum ada modul.</p> : (
                                        <div className="space-y-6">
                                            {courseForm.modules.map((module, mIndex) => (
                                                <div key={mIndex} className="bg-white p-4 border border-blue-200 rounded-lg shadow-sm">
                                                    <div className="flex gap-2 mb-4"><input type="text" value={module.title} onChange={(e) => handleModuleTitleChange(mIndex, e.target.value)} placeholder={`Judul Modul ${mIndex + 1}`} className="flex-1 border-b-2 border-blue-100 p-2 font-bold focus:outline-none focus:border-blue-500" required /><button type="button" onClick={() => handleDeleteModule(mIndex)} className="text-red-500 hover:bg-red-50 px-3 rounded"><i className="fa-solid fa-trash"></i></button></div>
                                                    <div className="pl-4 space-y-3 border-l-2 border-gray-100">
                                                        {module.items.map((item, iIndex) => (
                                                            <div key={iIndex} className="flex flex-col md:flex-row gap-2 bg-gray-50 p-2 rounded border border-gray-200 relative">
                                                                <select value={item.type} onChange={(e) => handleItemChange(mIndex, iIndex, 'type', e.target.value)} className="text-xs border p-1 rounded bg-white"><option value="video">Video</option><option value="doc">Dokumen</option><option value="quiz">Quiz</option></select>
                                                                <input type="text" value={item.title} onChange={(e) => handleItemChange(mIndex, iIndex, 'title', e.target.value)} placeholder="Judul Materi..." className="flex-1 text-sm border p-1 rounded" required />
                                                                {item.type === 'video' && <input type="text" value={item.videoId} onChange={(e) => handleItemChange(mIndex, iIndex, 'videoId', e.target.value)} placeholder="ID Youtube" className="w-32 text-xs border p-1 rounded" />}
                                                                <input type="text" value={item.time} onChange={(e) => handleItemChange(mIndex, iIndex, 'time', e.target.value)} placeholder="Durasi" className="w-24 text-xs border p-1 rounded" />
                                                                <button type="button" onClick={() => handleDeleteItem(mIndex, iIndex)} className="text-red-400 hover:text-red-600 px-2"><i className="fa-solid fa-xmark"></i></button>
                                                            </div>
                                                        ))}
                                                        <button type="button" onClick={() => handleAddItemToModule(mIndex)} className="text-xs text-blue-500 hover:text-blue-700 mt-2 font-medium">+ Tambah Materi</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* REVIEW MANUAL */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="flex justify-between items-center border-b pb-2 mb-4"><div><h3 className="font-bold text-gray-700">3. Ulasan & Rating Manual</h3><p className="text-[10px] text-gray-500">Dihitung otomatis.</p></div><button type="button" onClick={handleAddReview} className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1"><i className="fa-solid fa-star"></i> Tambah Review</button></div>
                                    {courseForm.userReviews.length === 0 ? <p className="text-sm text-gray-500 italic text-center py-4">Belum ada review.</p> : (
                                        <div className="space-y-4">
                                            {courseForm.userReviews.map((review, rIndex) => (
                                                <div key={rIndex} className="bg-white p-4 border border-yellow-200 rounded-lg shadow-sm relative">
                                                    <button type="button" onClick={() => handleDeleteReview(rIndex)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 bg-red-50 w-6 h-6 rounded flex items-center justify-center"><i className="fa-solid fa-xmark text-xs"></i></button>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 pr-8">
                                                        <div><label className="block text-[10px] font-bold text-gray-500 mb-1">Nama</label><input type="text" value={review.name} onChange={(e) => handleReviewChange(rIndex, 'name', e.target.value)} className="w-full text-sm border p-1.5 rounded" required /></div>
                                                        <div><label className="block text-[10px] font-bold text-gray-500 mb-1">Role</label><input type="text" value={review.role} onChange={(e) => handleReviewChange(rIndex, 'role', e.target.value)} className="w-full text-sm border p-1.5 rounded" /></div>
                                                        <div><label className="block text-[10px] font-bold text-gray-500 mb-1">Bintang</label><select value={review.rating} onChange={(e) => handleReviewChange(rIndex, 'rating', e.target.value)} className="w-full text-sm border p-1.5 rounded text-yellow-600 font-bold"><option value="5">⭐⭐⭐⭐⭐</option><option value="4">⭐⭐⭐⭐</option><option value="3">⭐⭐⭐</option><option value="2">⭐⭐</option><option value="1">⭐</option></select></div>
                                                    </div>
                                                    <div><label className="block text-[10px] font-bold text-gray-500 mb-1">Komentar</label><textarea value={review.comment} onChange={(e) => handleReviewChange(rIndex, 'comment', e.target.value)} className="w-full text-sm border p-1.5 rounded" rows="2" required></textarea></div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button type="submit" disabled={isSubmitting} className="bg-[#3ECF4C] text-white px-6 py-2.5 rounded font-bold shadow-md hover:bg-green-600">{isSubmitting ? "Menyimpan..." : (isEditingCourse ? "Simpan Perubahan" : "Simpan Kelas")}</button>
                                    {isEditingCourse && <button type="button" onClick={() => { setIsEditingCourse(null); setCourseForm({ title: "", category: "Teknologi", description: "", price: "", image: "", instructorName: "Admin", instructorRole: "Senior Tutor", modules: [], userReviews: [] }) }} className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded font-bold">Batal</button>}
                                </div>
                            </form>
                        </div>

                        {/* TABEL KELAS */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b"><tr><th className="p-4 text-xs font-bold text-gray-500 uppercase">Kelas</th><th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Jml Modul</th><th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Rating</th><th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th></tr></thead>
                                <tbody className="divide-y divide-gray-100">
                                {isCoursesLoading ? <tr><td colSpan="4" className="text-center py-10 text-gray-500">Memuat data...</td></tr> : courses.map(course => (
                                    <tr key={course.id} className="hover:bg-gray-50">
                                        <td className="p-4"><div className="font-bold text-gray-800">{course.title}</div><div className="text-xs text-gray-500">{course.category} | {course.instructor?.name}</div></td>
                                        <td className="p-4 text-center text-sm font-semibold text-gray-600">{course.modules ? course.modules.length : 0} Modul</td>
                                        <td className="p-4 text-center"><div className="flex items-center justify-center gap-1 text-yellow-500 text-sm font-bold"><i className="fa-solid fa-star"></i> {course.rating || 0}</div></td>
                                        <td className="p-4 text-center">
                                            <button onClick={() => handleCourseEditClick(course)} className="mx-1 w-8 h-8 bg-orange-50 text-orange-500 rounded"><i className="fa-solid fa-pen-to-square"></i></button>
                                            <button onClick={() => handleCourseDeleteClick(course.id)} className="mx-1 w-8 h-8 bg-red-50 text-red-500 rounded"><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* =========================================
                    TAB 2: KELOLA BANK
                ========================================= */}
                {activeTab === 'banks' && (
                    <>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
                            <h2 className="font-bold text-lg mb-6 text-blue-600">{isEditingBank ? `Edit Bank (ID: ${isEditingBank})` : "Tambah Bank Baru"}</h2>
                            <form onSubmit={handleBankSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label className="block text-xs font-bold text-gray-600 mb-1">Nama Bank (Misal: BCA)</label><input type="text" name="name" value={bankForm.name} onChange={handleBankChange} className="w-full border p-2.5 rounded focus:ring-2 focus:ring-blue-400" required /></div>
                                    <div><label className="block text-xs font-bold text-gray-600 mb-1">Kode VA (Misal: 3901)</label><input type="text" name="vaCode" value={bankForm.vaCode} onChange={handleBankChange} className="w-full border p-2.5 rounded focus:ring-2 focus:ring-blue-400" required /></div>
                                    <div><label className="block text-xs font-bold text-gray-600 mb-1">URL Logo (SVG/PNG)</label><input type="text" name="logo" value={bankForm.logo} onChange={handleBankChange} className="w-full border p-2.5 rounded focus:ring-2 focus:ring-blue-400" required /></div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Warna Tema Teks</label>
                                        <select name="themeColor" value={bankForm.themeColor} onChange={handleBankChange} className="w-full border p-2.5 rounded focus:ring-2 focus:ring-blue-400">
                                            <option value="text-blue-600">Biru Terang</option>
                                            <option value="text-blue-800">Biru Gelap</option>
                                            <option value="text-orange-600">Orange</option>
                                            <option value="text-green-600">Hijau</option>
                                            <option value="text-teal-600">Teal (Hijau Kebiruan)</option>
                                            <option value="text-gray-800">Hitam/Abu</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Instruksi ATM (Pisahkan dengan Enter / Baris Baru)</label>
                                        <textarea name="instAtm" value={bankForm.instAtm} onChange={handleBankChange} className="w-full border p-2.5 rounded text-sm" rows="3" placeholder="Masukkan Kartu ATM&#10;Pilih Transfer&#10;Selesai"></textarea>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Instruksi Mobile Banking (Pisahkan dengan Enter)</label>
                                        <textarea name="instMobile" value={bankForm.instMobile} onChange={handleBankChange} className="w-full border p-2.5 rounded text-sm" rows="3" placeholder="Buka Aplikasi&#10;Pilih M-Transfer&#10;Selesai"></textarea>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Instruksi Internet Banking (Opsional)</label>
                                        <textarea name="instInternet" value={bankForm.instInternet} onChange={handleBankChange} className="w-full border p-2.5 rounded text-sm" rows="2"></textarea>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-6 py-2.5 rounded font-bold shadow-md hover:bg-blue-700">{isSubmitting ? "Menyimpan..." : (isEditingBank ? "Simpan Perubahan" : "Simpan Bank")}</button>
                                    {isEditingBank && <button type="button" onClick={() => { setIsEditingBank(null); setBankForm({ name: "", logo: "", themeColor: "text-blue-600", vaCode: "", instAtm: "", instMobile: "", instInternet: "" }) }} className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded font-bold">Batal</button>}
                                </div>
                            </form>
                        </div>

                        {/* TABEL BANK */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b"><tr><th className="p-4 text-xs font-bold text-gray-500 uppercase">Logo & Nama</th><th className="p-4 text-xs font-bold text-gray-500 uppercase">Kode VA</th><th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th></tr></thead>
                                <tbody className="divide-y divide-gray-100">
                                {isBanksLoading ? <tr><td colSpan="3" className="text-center py-10 text-gray-500">Memuat data bank...</td></tr> : banks.map(bank => (
                                    <tr key={bank.id} className="hover:bg-gray-50">
                                        <td className="p-4 flex items-center gap-3">
                                            <img src={bank.logo} alt={bank.name} className="w-12 h-8 object-contain" />
                                            <span className="font-bold text-gray-800">{bank.name}</span>
                                        </td>
                                        <td className="p-4 font-mono font-bold text-gray-600">{bank.va_code || bank.vaCode}</td>
                                        <td className="p-4 text-center">
                                            <button onClick={() => handleBankEditClick(bank)} className="mx-1 w-8 h-8 bg-blue-50 text-blue-600 rounded"><i className="fa-solid fa-pen-to-square"></i></button>
                                            <button onClick={() => handleBankDeleteClick(bank.id)} className="mx-1 w-8 h-8 bg-red-50 text-red-500 rounded"><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

            </div>
        </Layout>
    );
};

export default AdminDashboard;