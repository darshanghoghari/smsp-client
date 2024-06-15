import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:3000/';
const initialState = {
    loading: false,
    error: null,
    bookings: null,
};

const getToken = () => {
    return Cookies.get('Authorization');
};

export const addClubBooking = createAsyncThunk('clubBooking/add', async (formData) => {
    try {
        const token = getToken();
        const response = await axios.post(`${baseURL}clubBooking/add`, formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const fetchClubBooking = createAsyncThunk('clubBooking/getDetail', async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${baseURL}clubBooking/getDetail`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const updateClubBooking = createAsyncThunk('clubBooking/update', async ({ bookingId, formData }) => {
    try {
        const token = getToken();
        const response = await axios.put(`${baseURL}clubBooking/update/${bookingId}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const deleteClubBooking = createAsyncThunk('clubBooking/delete', async (bookingId) => {
    try {
        const token = getToken();
        const response = await axios.delete(`${baseURL}clubBooking/delete/${bookingId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const clubBookingSlice = createSlice({
    name: 'clubBooking',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addClubBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addClubBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Assuming action.payload is a single booking object
                state.bookings = action.payload;
            })
            .addCase(addClubBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchClubBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClubBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.bookings = action.payload; // Assuming action.payload is an array of bookings
            })
            .addCase(fetchClubBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.bookings = null;
            })
            .addCase(updateClubBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateClubBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Assuming action.payload is a single updated booking object
                state.bookings = action.payload;
            })
            .addCase(updateClubBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteClubBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteClubBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Assuming action.payload is a message or identifier after deletion
                state.bookings = null; // Reset bookings after deletion
            })
            .addCase(deleteClubBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default clubBookingSlice.reducer;
