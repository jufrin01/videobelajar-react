import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { CourseContext } from '../context/CourseContext';

const AdminDashboard = () => {
    // Mengambil fungsi CRUD dari Context (yang sudah terhubung ke Firestore)
    const { courses, addCourse, updateCourse, deleteCourse, resetData } = useContext(CourseContext);

    const [isEditing, setIsEditing] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // State untuk loading tombol simpan

    const [formData, setFormData] = useState({
        title: "",
        category: "Teknologi",
        description: "",
        price: "", // Tambahan kolom harga
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
        instructorName: "Admin",
        instructorRole: "Senior Tutor"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Mulai loading

        const dataToSave = {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            price: Number(formData.price) || 0, // Pastikan harga disimpan sebagai angka
            image: formData.image,
            instructor: {
                name: formData.instructorName,
                role: formData.instructorRole,
                // Mengubah spasi menjadi '+' agar URL avatar valid (misal: Bima+Jufrin)
                avatar: `https://ui-avatars.com/api/?name=${formData.instructorName.replace(/\s+/g, '+')}`
            }
        };

        try {
            if (isEditing) {
                await updateCourse(isEditing, dataToSave); // Tunggu sampai Firestore selesai update
                alert("✅ Data berhasil diperbarui di server!");
            } else {
                await addCourse(dataToSave); // Tunggu sampai Firestore selesai membuat data
                alert("✅ Kelas baru berhasil ditambahkan ke server!");
            }

            // Reset form setelah berhasil
            setIsEditing(null);
            setFormData({
                title: "", category: "Teknologi", description: "", price: "",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
                instructorName: "Admin", instructorRole: "Senior Tutor"
            });
        } catch (error) {
            console.error(error);
            alert("❌ Gagal menyimpan data ke database.");
        } finally {
            setIsSubmitting(false); // Matikan loading
        }
    };

    const handleEditClick = (course) => {
        setIsEditing(course.id);
        setFormData({
            title: course.title,
            category: course.category,
            description: course.description,
            price: course.price || 0, // Ambil harga jika ada
            image: course.image,
            instructorName: course.instructor?.name || "",
            instructorRole: course.instructor?.role || ""
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-10 font-poppins min-h-screen animate-fade-in-up">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
                    <button onClick={resetData} className="text-xs text-red-500 hover:underline">Reset Default Data Lokal</button>
                </div>

                {/* --- FORM INPUT --- */}
                <div className="bg-white p-6 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 mb-10">
                    <h2 className="font-bold text-lg mb-4 text-[#3ECF4C]">
                        {isEditing ? `Edit Kelas (ID: ${isEditing})` : "Tambah Kelas Baru"}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Judul */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs font-bold text-gray-600 mb-1">Judul Kelas</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#3ECF4C]" required placeholder="Contoh: Belajar React JS" />
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Kategori</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#3ECF4C]">
                                {["Teknologi", "UI/UX Design", "Web Development", "Data Science", "Marketing", "Business", "Soft Skills", "Finance", "Design"].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Harga */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs font-bold text-gray-600 mb-1">Harga Kelas (Rp)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#3ECF4C]" required placeholder="Contoh: 150000" />
                        </div>

                        {/* URL Gambar */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs font-bold text-gray-600 mb-1">URL Gambar Thumbnail</label>
                            <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3ECF4C]" />
                        </div>

                        {/* Deskripsi */}
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-gray-600 mb-1">Deskripsi Singkat</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#3ECF4C]" rows="3" required placeholder="Jelaskan isi kelas..."></textarea>
                        </div>

                        {/* Data Instruktur */}
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Nama Instruktur</label>
                            <input type="text" name="instructorName" value={formData.instructorName} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#3ECF4C]" required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Role Instruktur</label>
                            <input type="text" name="instructorRole" value={formData.instructorRole} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#3ECF4C]" required placeholder="Contoh: Senior Tutor" />
                        </div>

                        {/* Tombol Action */}
                        <div className="col-span-2 flex gap-3 mt-4">
                            <button type="submit" disabled={isSubmitting} className="bg-[#3ECF4C] hover:bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed">
                                {isSubmitting ? (
                                    <span><i className="fa-solid fa-spinner fa-spin mr-2"></i> Menyimpan...</span>
                                ) : (
                                    isEditing ? "Simpan Perubahan" : "Tambah Kelas"
                                )}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={() => { setIsEditing(null); setFormData({ title: "", category: "Teknologi", description: "", price: "", image: "", instructorName: "", instructorRole: "" }) }} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-lg transition-all">
                                    Batal
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* --- TABEL DATA --- */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Kelas</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Harga</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Instruktur</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {courses.map(course => (
                                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={course.image} alt="" className="w-12 h-10 rounded object-cover bg-gray-200 border border-gray-100" />
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm line-clamp-1">{course.title}</p>
                                                <span className="text-[10px] bg-[#e8fbe9] text-[#3ECF4C] px-2 py-0.5 rounded-full font-bold uppercase">{course.category}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-semibold text-gray-700 text-sm">
                                        Rp {course.price ? Number(course.price).toLocaleString('id-ID') : '0'}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        <p className="font-bold text-gray-800">{course.instructor?.name}</p>
                                        <p className="text-[11px] text-gray-500 uppercase">{course.instructor?.role}</p>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => handleEditClick(course)} className="w-8 h-8 flex items-center justify-center bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white rounded transition-colors shadow-sm" title="Edit">
                                                <i className="fa-solid fa-pen-to-square text-xs"></i>
                                            </button>
                                            <button onClick={() => deleteCourse(course.id)} className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors shadow-sm" title="Hapus">
                                                <i className="fa-solid fa-trash text-xs"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {courses.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-10 text-gray-500 text-sm font-medium">Belum ada data kelas di database server.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;