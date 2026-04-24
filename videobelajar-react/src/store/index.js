import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './courseSlice';
import bankReducer from './bankSlice';

export const store = configureStore({
    reducer: {
        courses: courseReducer,
        banks: bankReducer,
    },
});