import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Base URL dari Realtime Database kamu
    const BASE_URL = 'https://videobelajarweb-default-rtdb.asia-southeast1.firebasedatabase.app';
    const COURSES_URL = `${BASE_URL}/courses.json`;

    // ==========================================
    // 1. GET DATA DARI REALTIME DATABASE (AXIOS)
    // ==========================================
    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await axios.get(COURSES_URL);
            const dataDariFirebase = response.data;

            const formattedData = [];

            // Jika ada data di Firebase, ubah Object menjadi Array
            if (dataDariFirebase) {
                for (const key in dataDariFirebase) {
                    formattedData.push({
                        id: key,
                        ...dataDariFirebase[key]
                    });
                }
            }

            // Set langsung data dari Firebase (jika kosong, akan otomatis jadi array kosong [])
            setCourses(formattedData);
        } catch (error) {
            console.error("Gagal mengambil data dari Firebase:", error);
            setCourses([]); // Pastikan tetap jadi array kosong jika error
        } finally {
            setLoading(false);
        }
    };

    // Panggil fetch saat pertama kali aplikasi dimuat
    useEffect(() => {
        fetchCourses();
    }, []);

    // ==========================================
    // 2. ADD / CREATE (POST DATA KE DATABASE)
    // ==========================================
    const addCourse = async (newCourse) => {
        try {
            const { id, ...courseDataTanpaId } = newCourse;

            const response = await axios.post(COURSES_URL, courseDataTanpaId);
            const newId = response.data.name;

            const courseWithNewId = { ...courseDataTanpaId, id: newId };

            // Update tampilan layar (state lokal)
            setCourses((prev) => [...prev, courseWithNewId]);
            return newId;
        } catch (error) {
            console.error("Gagal menambah kelas:", error);
            throw error; // Lempar error agar bisa ditangkap oleh AdminDashboard
        }
    };

    // ==========================================
    // 3. UPDATE (PATCH DATA DI DATABASE)
    // ==========================================
    const updateCourse = async (id, updatedData) => {
        try {
            const itemUrl = `${BASE_URL}/courses/${id}.json`;
            await axios.patch(itemUrl, updatedData);

            // Update tampilan layar
            setCourses(courses.map(course =>
                course.id === id ? { ...course, ...updatedData } : course
            ));
        } catch (error) {
            console.error("Gagal mengupdate kelas:", error);
            throw error;
        }
    };

    // ==========================================
    // 4. DELETE (HAPUS DATA DARI DATABASE)
    // ==========================================
    const deleteCourse = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus kelas ini secara permanen dari server?")) {
            try {
                const itemUrl = `${BASE_URL}/courses/${id}.json`;
                await axios.delete(itemUrl); // Menghapus dari Firebase

                // Hapus dari tampilan layar
                setCourses(courses.filter(course => course.id !== id));
            } catch (error) {
                console.error("Gagal menghapus kelas:", error);
            }
        }
    };

    return (
        <CourseContext.Provider value={{
            courses,
            loading,
            addCourse,
            updateCourse,
            deleteCourse,
            refreshData: fetchCourses
        }}>
            {children}
        </CourseContext.Provider>
    );
};