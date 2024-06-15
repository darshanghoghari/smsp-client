// meetingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define the initial state
const initialState = {
    loading: false,
    error: null,
    meetings: null,
};

// Define the base URL for the backend API
const baseURL = 'http://localhost:3000/';

// Function to get the token from cookies
const getToken = () => {
    return Cookies.get('Authorization');
};

// Define Thunks for CRUD operations
export const fetchMeetings = createAsyncThunk('meeting/getDetail', async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${baseURL}meeting/getDetail`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const addMeeting = createAsyncThunk('meeting/addDetail', async (data) => {
    try {
        const token = getToken();
        const response = await axios.post(`${baseURL}meeting/add`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const updateMeeting = createAsyncThunk('meeting/updateDetail', async (data) => {
    try {
        const token = getToken();
        const meetingId = data._id;
        delete data._id; // Remove _id from the request body
        console.log(data, "<------------------>");
        delete data.userId;
        delete data.createdAt;
        delete data.updatedAt;
        const response = await axios.put(`${baseURL}meeting/update/${meetingId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const deleteMeeting = createAsyncThunk('meeting/deleteDetail', async (meetingId) => {
    try {
        const token = getToken();
        const response = await axios.delete(`${baseURL}meeting/delete/${meetingId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Create meetingSlice
const meetingSlice = createSlice({
    name: 'meeting',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeetings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMeetings.fulfilled, (state, action) => {
                state.loading = false;
                state.meetings = action.payload.data;
                state.error = null;
            })
            .addCase(fetchMeetings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.meetings = null;
            })
            .addCase(addMeeting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMeeting.fulfilled, (state, action) => {
                state.loading = false;
                state.meetings = action.payload.data.data;
                state.error = null;
            })
            .addCase(addMeeting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.meetings = null;
            });
    },
});

// Export the reducer
export default meetingSlice.reducer;
