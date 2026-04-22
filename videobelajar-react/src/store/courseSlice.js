import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:5000/course';

export const fetchCourses = createAsyncThunk(
    'courses/fetchCourses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Gagal mengambil data dari server');

            const data = await response.json();

            const formattedData = data.map(course => ({
                id: course.id,
                title: course.title,
                category: course.category,
                description: course.description,
                price: course.price,
                image: course.image,
                instructor: {
                    name: course.instructor_name || "Admin",
                    role: course.instructor_role || "Tutor",
                    avatar: `https://ui-avatars.com/api/?name=${(course.instructor_name || 'A').replace(/\s+/g, '+')}`
                },
                // Fallback untuk modul & review (karena di Postgres belum kita buat tabelnya)
                modules: [],
                userReviews: [],
                rating: 0,
                reviews: 0
            }));

            return formattedData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addCourse = createAsyncThunk(
    'courses/addCourse',
    async (newCourse, { rejectWithValue }) => {
        try {

            const backendPayload = {
                title: newCourse.title,
                category: newCourse.category,
                description: newCourse.description,
                price: newCourse.price,
                image: newCourse.image,
                instructorName: newCourse.instructor?.name || "Admin",
                instructorRole: newCourse.instructor?.role || "Tutor"
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(backendPayload)
            });

            if (!response.ok) throw new Error('Gagal menambah kelas ke database');

            const savedData = await response.json();

            return {
                id: savedData.id,
                ...newCourse
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const updateCourse = createAsyncThunk(
    'courses/updateCourse',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const backendPayload = {
                title: updatedData.title,
                category: updatedData.category,
                description: updatedData.description,
                price: updatedData.price,
                image: updatedData.image,
                instructorName: updatedData.instructor?.name || "Admin",
                instructorRole: updatedData.instructor?.role || "Tutor"
            };

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(backendPayload)
            });

            if (!response.ok) throw new Error('Gagal mengupdate kelas');

            return { id, updatedData };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const deleteCourse = createAsyncThunk(
    'courses/deleteCourse',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Gagal menghapus kelas');
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// --- REDUX SLICE (Penyimpanan State Lokal) ---
const courseSlice = createSlice({
    name: 'courses',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle Fetch
            .addCase(fetchCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Handle Add
            .addCase(addCourse.fulfilled, (state, action) => {

                state.data.unshift(action.payload);
            })

            // Handle Update
            .addCase(updateCourse.fulfilled, (state, action) => {
                const index = state.data.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = { ...state.data[index], ...action.payload.updatedData };
                }
            })

            // Handle Delete
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.data = state.data.filter(c => c.id !== action.payload);
            });
    }
});

export default courseSlice.reducer;