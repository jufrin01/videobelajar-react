import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { CourseContext } from '../context/CourseContext';

const AdminDashboard = () => {
    const { courses, addCourse, updateCourse, deleteCourse, resetData } = useContext(CourseContext);

    const [isEditing, setIsEditing] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "Teknologi",
        description: "",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
        instructorName: "Admin",
        instructorRole: "Senior Tutor"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSave = {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            image: formData.image,
            instructor: {
                name: formData.instructorName,
                role: formData.instructorRole,
                avatar: "https://ui-avatars.com/api/?name=" + formData.instructorName
            }
        };

        if (isEditing) {
            updateCourse(isEditing, dataToSave);
            alert("Data berhasil diperbarui!");
        } else {
            addCourse(dataToSave);
            alert("Kelas baru berhasil ditambahkan!");
        }

        setIsEditing(null);
        setFormData({
            title: "", category: "Teknologi", description: "",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
            instructorName: "Admin", instructorRole: "Senior Tutor"
        });
    };

    const handleEditClick = (course) => {
        setIsEditing(course.id);
        setFormData({
            title: course.title,
            category: course.category,
            description: course.description,
            image: course.image,
            instructorName: course.instructor.name,
            instructorRole: course.instructor.role
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-10 font-poppins min-h-screen">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <button onClick={resetData} className="text-xs text-red-500 hover:underline">Reset Default Data</button>
                </div>

                {/* --- FORM INPUT --- */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-10">
                    <h2 className="font-bold text-lg mb-4 text-[#3ECF4C]">
                        {isEditing ? `Edit Kelas (ID: ${isEditing})` : "Tambah Kelas Baru"}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Judul */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs font-bold text-gray-600 mb-1">Judul Kelas</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-200" required placeholder="Contoh: Belajar React JS" />
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Kategori</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-200">
                                {["UI/UX Design", "Web Development", "Data Science", "Marketing", "Business", "Soft Skills", "Finance", "Design"].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Deskripsi */}
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-gray-600 mb-1">Deskripsi Singkat</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-200" rows="3" required placeholder="Jelaskan isi kelas..."></textarea>
                        </div>

                        {/* Data Instruktur */}
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Nama Instruktur</label>
                            <input type="text" name="instructorName" value={formData.instructorName} onChange={handleChange} className="w-full border rounded-lg p-2.5" required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Role Instruktur</label>
                            <input type="text" name="instructorRole" value={formData.instructorRole} onChange={handleChange} className="w-full border rounded-lg p-2.5" required />
                        </div>

                        {/* URL Gambar */}
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-gray-600 mb-1">URL Gambar Thumbnail</label>
                            <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm text-gray-500" />
                        </div>

                        {/* Tombol Action */}
                        <div className="col-span-2 flex gap-3 mt-2">
                            <button type="submit" className="bg-[#3ECF4C] hover:bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-md">
                                {isEditing ? "Simpan Perubahan" : "Tambah Kelas"}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={() => { setIsEditing(null); setFormData({ title: "", category: "Teknologi", description: "", image: "", instructorName: "", instructorRole: "" }) }} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2.5 px-6 rounded-lg transition-all">
                                    Batal
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* --- TABEL DATA --- */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">ID</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Kelas</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Instruktur</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {courses.map(course => (
                                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-sm text-gray-500">#{course.id}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={course.image} alt="" className="w-10 h-10 rounded object-cover bg-gray-200" />
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm line-clamp-1">{course.title}</p>
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{course.category}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        <p className="font-semibold">{course.instructor.name}</p>
                                        <p className="text-xs text-gray-400">{course.instructor.role}</p>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => handleEditClick(course)} className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors" title="Edit">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button onClick={() => deleteCourse(course.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;