import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define the initial state
const initialState = {
    loading: false,
    error: null,
    circularNotices: null,
};

// Define the base URL for the backend API
const baseURL = 'http://localhost:3000/';

// Function to get the token from cookies
const getToken = () => {
    return Cookies.get('Authorization');
};

// Define Thunk for get API request
export const fetchCircularNotices = createAsyncThunk('circularNotice/getDetail', async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${baseURL}circularNotice/getDetail`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const addCircularNotice = createAsyncThunk('circularNotice/addDetail', async (data) => {
    try {
        const token = getToken();
        const response = await axios.post(`${baseURL}circularNotice/add`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const updateCircularNotice = createAsyncThunk('circularNotice/updateDetail', async ({ id, circularData }) => {
    try {
        const token = getToken();
        console.log(id, "<------------------------------data log-------------------------->", circularData);
        const response = await axios.put(`${baseURL}circularNotice/update/${id}`, circularData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.data;  // Ensure this matches the structure returned by your backend
    } catch (error) {
        throw error.response.data;
    }
});

export const deleteCircularNotice = createAsyncThunk('circularNotice/deleteDetail', async (id) => {
    try {
        const token = getToken();
        const response = await axios.delete(`${baseURL}circularNotice/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return { _id: id };  // Return the id of the deleted item
    } catch (error) {
        throw error.response.data;
    }
});

const circularNoticeSlice = createSlice({
    name: 'circularNotice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCircularNotices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCircularNotices.fulfilled, (state, action) => {
                state.loading = false;
                state.circularNotices = action.payload;
                state.error = null;
            })
            .addCase(fetchCircularNotices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.circularNotices = [];
            })
            .addCase(addCircularNotice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCircularNotice.fulfilled, (state, action) => {
                state.loading = false;
                state.circularNotices.push(action.payload);
                state.error = null;
            })
            .addCase(addCircularNotice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateCircularNotice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCircularNotice.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.circularNotices.findIndex(notice => notice._id === action.payload._id);
                if (index !== -1) {
                    state.circularNotices[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateCircularNotice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCircularNotice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCircularNotice.fulfilled, (state, action) => {
                state.loading = false;
                state.circularNotices = state.circularNotices.filter(notice => notice._id !== action.payload._id);
                state.error = null;
            })
            .addCase(deleteCircularNotice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

// Export the reducer
export default circularNoticeSlice.reducer;