import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { CourseContext } from '../context/CourseContext';

const AdminDashboard = () => {
    const { courses, addCourse, updateCourse, deleteCourse, refreshData } = useContext(CourseContext);

    const [isEditing, setIsEditing] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. UPDATE STATE: Menambahkan array 'userReviews'
    const [formData, setFormData] = useState({
        title: "",
        category: "Teknologi",
        description: "",
        price: "",
        image: "",
        instructorName: "Admin",
        instructorRole: "Senior Tutor",
        modules: [],
        userReviews: [] // <-- Array untuk menampung review manual
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ==========================================
    // FUNGSI BUILDER KURIKULUM (MODUL)
    // ==========================================
    const handleAddModule = () => {
        setFormData({ ...formData, modules: [...formData.modules, { title: "", items: [] }] });
    };

    const handleModuleTitleChange = (index, value) => {
        const newModules = [...formData.modules];
        newModules[index].title = value;
        setFormData({ ...formData, modules: newModules });
    };

    const handleAddItemToModule = (moduleIndex) => {
        const newModules = [...formData.modules];
        newModules[moduleIndex].items.push({
            id: Date.now(), type: "video", title: "", time: "0 Menit", status: "locked", videoId: ""
        });
        setFormData({ ...formData, modules: newModules });
    };

    const handleItemChange = (moduleIndex, itemIndex, field, value) => {
        const newModules = [...formData.modules];
        newModules[moduleIndex].items[itemIndex][field] = value;
        setFormData({ ...formData, modules: newModules });
    };

    const handleDeleteModule = (moduleIndex) => {
        const newModules = formData.modules.filter((_, i) => i !== moduleIndex);
        setFormData({ ...formData, modules: newModules });
    };

    const handleDeleteItem = (moduleIndex, itemIndex) => {
        const newModules = [...formData.modules];
        newModules[moduleIndex].items = newModules[moduleIndex].items.filter((_, i) => i !== itemIndex);
        setFormData({ ...formData, modules: newModules });
    };

    // ==========================================
    // FUNGSI BUILDER REVIEW MANUAL
    // ==========================================
    const handleAddReview = () => {
        setFormData({
            ...formData,
            userReviews: [...formData.userReviews, {
                id: Date.now(),
                name: "",
                role: "Siswa",
                rating: 5, // Default bintang 5
                comment: "",
                avatar: ""
            }]
        });
    };

    const handleReviewChange = (index, field, value) => {
        const newReviews = [...formData.userReviews];
        // Pastikan rating tersimpan sebagai angka
        newReviews[index][field] = field === 'rating' ? Number(value) : value;

        // Auto-generate avatar berdasarkan nama yang diketik
        if (field === 'name') {
            newReviews[index].avatar = `https://ui-avatars.com/api/?name=${value.replace(/\s+/g, '+')}&background=random`;
        }

        setFormData({ ...formData, userReviews: newReviews });
    };

    const handleDeleteReview = (index) => {
        const newReviews = formData.userReviews.filter((_, i) => i !== index);
        setFormData({ ...formData, userReviews: newReviews });
    };

    // ==========================================
    // SUBMIT DATA
    // ==========================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Menghitung rata-rata rating secara otomatis dari array userReviews
        const totalRatingSum = formData.userReviews.reduce((sum, r) => sum + r.rating, 0);
        const calculatedRating = formData.userReviews.length > 0 ? (totalRatingSum / formData.userReviews.length).toFixed(1) : 0;

        const dataToSave = {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            price: Number(formData.price) || 0,
            image: formData.image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
            progress: 0,
            totalModules: formData.modules.length,
            completedModules: 0,
            // SINKRONISASI RATING & REVIEWS
            rating: Number(calculatedRating),
            reviews: formData.userReviews.length,
            userReviews: formData.userReviews,
            instructor: {
                name: formData.instructorName,
                role: formData.instructorRole,
                avatar: `https://ui-avatars.com/api/?name=${formData.instructorName.replace(/\s+/g, '+')}`
            },
            modules: formData.modules
        };

        try {
            if (isEditing) {
                await updateCourse(isEditing, dataToSave);
                alert("✅ Data berhasil diperbarui di server!");
            } else {
                await addCourse(dataToSave);
                alert("✅ Kelas baru berhasil ditambahkan!");
            }

            // Reset Form
            setIsEditing(null);
            setFormData({
                title: "", category: "Teknologi", description: "", price: "", image: "",
                instructorName: "Admin", instructorRole: "Senior Tutor", modules: [], userReviews: []
            });
        } catch (error) {
            console.error(error);
            alert("❌ Gagal menyimpan data.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditClick = (course) => {
        setIsEditing(course.id);
        setFormData({
            title: course.title || "",
            category: course.category || "Teknologi",
            description: course.description || "",
            price: course.price || 0,
            image: course.image || "",
            instructorName: course.instructor?.name || "",
            instructorRole: course.instructor?.role || "",
            modules: course.modules || [],
            userReviews: course.userReviews || [] // Muat data review jika ada
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-10 font-poppins min-h-screen">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
                    <button onClick={refreshData} className="text-xs text-blue-500 hover:underline">
                        <i className="fa-solid fa-rotate-right mr-1"></i> Refresh Data
                    </button>
                </div>

                {/* FORM INPUT UTAMA */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
                    <h2 className="font-bold text-lg mb-6 text-[#3ECF4C]">
                        {isEditing ? `Edit Kelas (ID: ${isEditing})` : "Tambah Kelas Baru"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* --- BAGIAN 1: INFORMASI DASAR --- */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">1. Informasi Dasar</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Judul Kelas</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2.5 rounded focus:ring-2 focus:ring-[#3ECF4C]" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Kategori</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2.5 rounded">
                                        {["Teknologi", "UI/UX Design", "Web Development", "Business"].map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Harga (Rp)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border p-2.5 rounded" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">URL Gambar Thumbnail</label>
                                    <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border p-2.5 rounded" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Nama Instruktur</label>
                                    <input type="text" name="instructorName" value={formData.instructorName} onChange={handleChange} className="w-full border p-2.5 rounded" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Role Instruktur</label>
                                    <input type="text" name="instructorRole" value={formData.instructorRole} onChange={handleChange} className="w-full border p-2.5 rounded" required />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Deskripsi Singkat</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2.5 rounded" rows="2" required></textarea>
                                </div>
                            </div>
                        </div>

                        {/* --- BAGIAN 2: KURIKULUM / MODUL BUILDER --- */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center border-b pb-2 mb-4">
                                <h3 className="font-bold text-gray-700">2. Kurikulum Kelas</h3>
                                <button type="button" onClick={handleAddModule} className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1">
                                    <i className="fa-solid fa-plus"></i> Tambah Modul
                                </button>
                            </div>

                            {formData.modules.length === 0 ? (
                                <p className="text-sm text-gray-500 italic text-center py-4">Belum ada modul. Klik tombol Tambah Modul di atas.</p>
                            ) : (
                                <div className="space-y-6">
                                    {formData.modules.map((module, mIndex) => (
                                        <div key={mIndex} className="bg-white p-4 border border-blue-200 rounded-lg shadow-sm">
                                            <div className="flex gap-2 mb-4">
                                                <input
                                                    type="text" value={module.title} onChange={(e) => handleModuleTitleChange(mIndex, e.target.value)}
                                                    placeholder={`Judul Modul ${mIndex + 1}`} className="flex-1 border-b-2 border-blue-100 p-2 font-bold focus:outline-none focus:border-blue-500" required
                                                />
                                                <button type="button" onClick={() => handleDeleteModule(mIndex)} className="text-red-500 hover:bg-red-50 px-3 rounded">
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>

                                            <div className="pl-4 space-y-3 border-l-2 border-gray-100">
                                                {module.items.map((item, iIndex) => (
                                                    <div key={iIndex} className="flex flex-col md:flex-row gap-2 bg-gray-50 p-2 rounded border border-gray-200 relative">
                                                        <select value={item.type} onChange={(e) => handleItemChange(mIndex, iIndex, 'type', e.target.value)} className="text-xs border p-1 rounded bg-white">
                                                            <option value="video">Video</option>
                                                            <option value="doc">Dokumen</option>
                                                        </select>
                                                        <input type="text" value={item.title} onChange={(e) => handleItemChange(mIndex, iIndex, 'title', e.target.value)} placeholder="Judul Materi..." className="flex-1 text-sm border p-1 rounded" required />
                                                        {item.type === 'video' && (
                                                            <input type="text" value={item.videoId} onChange={(e) => handleItemChange(mIndex, iIndex, 'videoId', e.target.value)} placeholder="ID Youtube" className="w-32 text-xs border p-1 rounded" />
                                                        )}
                                                        <input type="text" value={item.time} onChange={(e) => handleItemChange(mIndex, iIndex, 'time', e.target.value)} placeholder="Durasi (10 Menit)" className="w-24 text-xs border p-1 rounded" />
                                                        <button type="button" onClick={() => handleDeleteItem(mIndex, iIndex)} className="text-red-400 hover:text-red-600 px-2">
                                                            <i className="fa-solid fa-xmark"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => handleAddItemToModule(mIndex)} className="text-xs text-blue-500 hover:text-blue-700 mt-2 font-medium">
                                                    + Tambah Materi
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* --- BAGIAN 3: REVIEW BUILDER (BARU) --- */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center border-b pb-2 mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-700">3. Ulasan & Rating Manual</h3>
                                    <p className="text-[10px] text-gray-500">Total Rating & Jumlah Review akan dihitung otomatis.</p>
                                </div>
                                <button type="button" onClick={handleAddReview} className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1">
                                    <i className="fa-solid fa-star"></i> Tambah Review
                                </button>
                            </div>

                            {formData.userReviews.length === 0 ? (
                                <p className="text-sm text-gray-500 italic text-center py-4">Belum ada review. Klik tombol di atas untuk menambahkan testimoni.</p>
                            ) : (
                                <div className="space-y-4">
                                    {formData.userReviews.map((review, rIndex) => (
                                        <div key={rIndex} className="bg-white p-4 border border-yellow-200 rounded-lg shadow-sm relative">
                                            <button type="button" onClick={() => handleDeleteReview(rIndex)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 bg-red-50 w-6 h-6 rounded flex items-center justify-center">
                                                <i className="fa-solid fa-xmark text-xs"></i>
                                            </button>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 pr-8">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Nama User</label>
                                                    <input type="text" value={review.name} onChange={(e) => handleReviewChange(rIndex, 'name', e.target.value)} placeholder="Misal: Budi Santoso" className="w-full text-sm border p-1.5 rounded" required />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Role/Pekerjaan</label>
                                                    <input type="text" value={review.role} onChange={(e) => handleReviewChange(rIndex, 'role', e.target.value)} placeholder="Misal: Mahasiswa" className="w-full text-sm border p-1.5 rounded" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Bintang (1-5)</label>
                                                    <select value={review.rating} onChange={(e) => handleReviewChange(rIndex, 'rating', e.target.value)} className="w-full text-sm border p-1.5 rounded text-yellow-600 font-bold">
                                                        <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                                                        <option value="4">⭐⭐⭐⭐ (4)</option>
                                                        <option value="3">⭐⭐⭐ (3)</option>
                                                        <option value="2">⭐⭐ (2)</option>
                                                        <option value="1">⭐ (1)</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 mb-1">Komentar Testimoni</label>
                                                <textarea value={review.comment} onChange={(e) => handleReviewChange(rIndex, 'comment', e.target.value)} placeholder="Ketik ulasan di sini..." className="w-full text-sm border p-1.5 rounded" rows="2" required></textarea>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* TOMBOL SIMPAN KESELURUHAN */}
                        <div className="flex gap-3">
                            <button type="submit" disabled={isSubmitting} className="bg-[#3ECF4C] text-white px-6 py-2.5 rounded font-bold shadow-md hover:bg-green-600 disabled:opacity-50">
                                {isSubmitting ? "Menyimpan..." : (isEditing ? "Simpan Perubahan" : "Simpan Kelas Baru")}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={() => { setIsEditing(null); setFormData({ title: "", category: "Teknologi", description: "", price: "", image: "", instructorName: "Admin", instructorRole: "Senior Tutor", modules: [], userReviews: [] }) }} className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded font-bold">
                                    Batal
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* --- TABEL DATA --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Kelas</th>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Jml Modul</th>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Rating</th>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {courses.map(course => (
                            <tr key={course.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="font-bold text-gray-800">{course.title}</div>
                                    <div className="text-xs text-gray-500">{course.category} | Instruktur: {course.instructor?.name}</div>
                                </td>
                                <td className="p-4 text-center text-sm font-semibold text-gray-600">
                                    {course.modules ? course.modules.length : 0} Modul
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex items-center justify-center gap-1 text-yellow-500 text-sm font-bold">
                                        <i className="fa-solid fa-star"></i> {course.rating || 0}
                                        <span className="text-gray-400 text-xs font-normal">({course.reviews || 0})</span>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <button onClick={() => handleEditClick(course)} className="mx-1 w-8 h-8 bg-orange-50 text-orange-500 rounded hover:bg-orange-500 hover:text-white"><i className="fa-solid fa-pen-to-square text-xs"></i></button>
                                    <button onClick={() => deleteCourse(course.id)} className="mx-1 w-8 h-8 bg-red-50 text-red-500 rounded hover:bg-red-500 hover:text-white"><i className="fa-solid fa-trash text-xs"></i></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;