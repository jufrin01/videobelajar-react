import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// --- MENGIRIM QUERY PARAMS KE BACKEND ---
// Tambahkan parameter "params = {}" yang akan ditangkap oleh Axios
export const fetchCourses = createAsyncThunk(
    'courses/fetchCourses',
    async (params = {}, { rejectWithValue }) => {
        try {
            // Axios otomatis mengubah object params menjadi query URL (contoh: ?search=react&sort=low)
            const response = await api.get('/course', { params });

            return response.data.map(course => ({
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
                modules: [],
                userReviews: [],
                rating: 0,
                reviews: 0
            }));
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

// --- CREATE: Tambah Kelas Baru ---
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

            const response = await api.post('/course', backendPayload);
            const savedData = response.data;

            return {
                id: savedData.id,
                ...newCourse
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

// ---  UPDATE: Edit Kelas ---
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

            await api.put(`/course/${id}`, backendPayload);
            return { id, updatedData };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

// --- DELETE: Hapus Kelas ---
export const deleteCourse = createAsyncThunk(
    'courses/deleteCourse',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/course/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

// --- REDUX SLICE ---
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
            .addCase(addCourse.fulfilled, (state, action) => {
                state.data.unshift(action.payload);
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                const index = state.data.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = { ...state.data[index], ...action.payload.updatedData };
                }
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.data = state.data.filter(c => c.id !== action.payload);
            });
    }
});

export default courseSlice.reducer;