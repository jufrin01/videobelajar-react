import React, { createContext, useState, useEffect } from 'react';
import { coursesData as initialData } from '../data/coursesData.js';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {

    const [courses, setCourses] = useState(() => {
        const savedCourses = localStorage.getItem("courses_db");
        return savedCourses ? JSON.parse(savedCourses) : initialData;
    });

    useEffect(() => {
        localStorage.setItem("courses_db", JSON.stringify(courses));
    }, [courses]);


    const addCourse = (newCourseData) => {

        const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
        const newCourse = {
            ...newCourseData,
            id: newId,
            progress: 0,
            totalModules: 0,
            completedModules: 0,
            rating: 0,
            reviews: 0,
            userReviews: [],
            modules: []
        };

        setCourses([...courses, newCourse]);
    };


    const updateCourse = (id, updatedData) => {
        setCourses(courses.map(course =>
            course.id === id ? { ...course, ...updatedData } : course
        ));
    };


    const deleteCourse = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus kelas ini?")) {
            setCourses(courses.filter(course => course.id !== id));
        }
    };

    const resetData = () => {
        if(window.confirm("Reset data ke default? Semua perubahan akan hilang.")) {
            setCourses(initialData);
        }
    }

    return (
        <CourseContext.Provider value={{ courses, addCourse, updateCourse, deleteCourse, resetData }}>
            {children}
        </CourseContext.Provider>
    );
};