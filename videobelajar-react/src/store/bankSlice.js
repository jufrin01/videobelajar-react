import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// READ: Ambil Semua Bank ---
export const fetchBanks = createAsyncThunk('banks/fetchBanks', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/banks');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || error.message);
    }
});

//  CREATE: Tambah Bank Baru ---
export const addBank = createAsyncThunk('banks/addBank', async (newBank, { rejectWithValue }) => {
    try {
        const response = await api.post('/banks', newBank);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || error.message);
    }
});

// UPDATE: Edit Bank ---
export const updateBank = createAsyncThunk('banks/updateBank', async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/banks/${id}`, updatedData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || error.message);
    }
});

//DELETE: Hapus Bank ---
export const deleteBank = createAsyncThunk('banks/deleteBank', async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/banks/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || error.message);
    }
});

const bankSlice = createSlice({
    name: 'banks',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanks.pending, (state) => { state.isLoading = true; })
            .addCase(fetchBanks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchBanks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addBank.fulfilled, (state, action) => { state.data.push(action.payload); })
            .addCase(updateBank.fulfilled, (state, action) => {
                const index = state.data.findIndex(b => b.id === action.payload.id);
                if (index !== -1) state.data[index] = action.payload;
            })
            .addCase(deleteBank.fulfilled, (state, action) => {
                state.data = state.data.filter(b => b.id !== action.payload);
            });
    }
});

export default bankSlice.reducer;