import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './courseSlice';

export const store = configureStore({
    reducer: {
        courses: courseReducer,
        // Nanti kita bisa tambah authReducer di sini untuk handle user login
    },
});