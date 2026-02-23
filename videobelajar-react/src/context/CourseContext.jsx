import React, { createContext, useState, useEffect } from 'react';
import { coursesData as initialData } from '../data/coursesData.js';

// 1. IMPORT FIREBASE FIRESTORE
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // File yg  tadi kita buat

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Referensi ke koleksi (tabel) 'courses' di Firestore
    const coursesCollectionRef = collection(db, "courses");

    // ==========================================
    // 1. GET DATA DARI FIRESTORE SAAT APLIKASI DIBUKA
    // ==========================================
    const fetchCourses = async () => {
        setLoading(true);
        try {
            const data = await getDocs(coursesCollectionRef);
            const formattedData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id // ID unik dari Firestore (berupa string seperti "a1b2c3d4")
            }));

            // Jika database kosong, pakai data awal (initialData)
            if (formattedData.length === 0) {
                setCourses(initialData);
            } else {
                setCourses(formattedData);
            }
        } catch (error) {
            console.error("Gagal mengambil data dari Firestore:", error);
            // Fallback: Jika internet mati / Firebase error, pakai data awal
            setCourses(initialData);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // ==========================================
    // 2. CREATE (TAMBAH DATA KE FIRESTORE)
    // ==========================================
    const addCourse = async (newCourseData) => {
        try {
            const fullCourseData = {
                ...newCourseData,
                progress: 0,
                totalModules: 0,
                completedModules: 0,
                rating: 0,
                reviews: 0,
                userReviews: [],
                modules: [],
                createdAt: new Date().toISOString()
            };

            // Simpan ke Firestore
            const docRef = await addDoc(coursesCollectionRef, fullCourseData);

            // Update state lokal
            setCourses([...courses, { ...fullCourseData, id: docRef.id }]);

        } catch (error) {
            console.error("Gagal menambah kelas:", error);
            alert("Terjadi kesalahan saat menyimpan ke database.");
        }
    };

    // ==========================================
    // 3. UPDATE (EDIT DATA DI FIRESTORE)
    // ==========================================
    const updateCourse = async (id, updatedData) => {
        try {
            // Kita skip update ke Firestore kalau ID-nya masih ID angka (bawaan dari coursesData statis)
            if (typeof id === 'string') {
                const courseDoc = doc(db, "courses", id);
                await updateDoc(courseDoc, updatedData);
            }

            setCourses(courses.map(course =>
                course.id === id ? { ...course, ...updatedData } : course
            ));
        } catch (error) {
            console.error("Gagal mengupdate kelas:", error);
        }
    };

    // ==========================================
    // 4. DELETE (HAPUS DATA DARI FIRESTORE)
    // ==========================================
    const deleteCourse = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus kelas ini secara permanen dari server?")) {
            try {
                if (typeof id === 'string') {
                    const courseDoc = doc(db, "courses", id);
                    await deleteDoc(courseDoc);
                }
                setCourses(courses.filter(course => course.id !== id));
            } catch (error) {
                console.error("Gagal menghapus kelas:", error);
            }
        }
    };

    const resetData = () => {
        if(window.confirm("Reset data ke default? Ini hanya mereset tampilan lokal, tidak menghapus data di database.")) {
            setCourses(initialData);
        }
    }

    return (
        <CourseContext.Provider value={{ courses, loading, addCourse, updateCourse, deleteCourse, resetData, refreshData: fetchCourses }}>
            {children}
        </CourseContext.Provider>
    );
};