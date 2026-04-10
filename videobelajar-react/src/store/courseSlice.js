import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// --- 1. THUNK: Mengambil data dari Firebase (READ) ---
export const fetchCourses = createAsyncThunk(
    'courses/fetchCourses',
    async (_, { rejectWithValue }) => {
        try {
            const coursesCol = collection(db, "courses");
            const snapshot = await getDocs(coursesCol);
            const courseList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return courseList;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// --- 2. THUNK: Tambah Kelas ke Firebase (CREATE) ---
export const addCourse = createAsyncThunk(
    'courses/addCourse',
    async (newCourse, { rejectWithValue }) => {
        try {
            const docRef = await addDoc(collection(db, "courses"), newCourse);
            return { id: docRef.id, ...newCourse };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// --- 3. THUNK: Update Kelas di Firebase (UPDATE) ---
export const updateCourse = createAsyncThunk(
    'courses/updateCourse',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const courseDoc = doc(db, "courses", id);
            await updateDoc(courseDoc, updatedData);
            return { id, updatedData };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// --- 4. THUNK: Hapus Kelas dari Firebase (DELETE) ---
export const deleteCourse = createAsyncThunk(
    'courses/deleteCourse',
    async (id, { rejectWithValue }) => {
        try {
            const courseDoc = doc(db, "courses", id);
            await deleteDoc(courseDoc);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// --- SLICE REDUX UTAMA ---
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
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Handle Add (Tambah Data)
            .addCase(addCourse.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })

            // Handle Update (Edit Data)
            .addCase(updateCourse.fulfilled, (state, action) => {
                const index = state.data.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = { ...state.data[index], ...action.payload.updatedData };
                }
            })

            // Handle Delete (Hapus Data)
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.data = state.data.filter(c => c.id !== action.payload);
            });
    }
});

export default courseSlice.reducer;