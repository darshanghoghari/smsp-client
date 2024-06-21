import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define the initial state
const initialState = {
    loading: false,
    error: null,
    user: null,
    profile: null, // Add profile to the state
};

// Define the base URL for the backend API
const baseURL = 'http://localhost:3000/';

// Function to get the token from cookies
const getToken = () => {
    return Cookies.get('Authorization');
};

// Fetch user data
export const fetchUserData = createAsyncThunk('user/getDetail', async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${baseURL}profile/getDetails`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Fetch single profile data
export const fetchSingleProfile = createAsyncThunk('user/getSingleProfile', async (id) => {
    try {
        const token = getToken();
        const response = await axios.get(`${baseURL}profile/get/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Update user data
export const updateUserData = createAsyncThunk('user/updateDetail', async ({ id, formData }) => {
    try {
        const token = getToken();

        const response = await axios.put(`${baseURL}profile/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Delete user data
export const deleteUserData = createAsyncThunk('user/deleteDetail', async (userId) => {
    try {
        const token = getToken();
        const response = await axios.delete(`${baseURL}profile/delete/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.user = null;
            })
            .addCase(fetchSingleProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload; // Set profile data
                state.error = null;
            })
            .addCase(fetchSingleProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.profile = null;
            })
            .addCase(updateUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.user = null;
            })
            .addCase(deleteUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUserData.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(deleteUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export the reducer
export default userSlice.reducer;