// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';

// Define the initial state
const initialState = {
    loading: false,
    error: null,
    user: null,
};

// Define the base URL for the backend API
const baseURL = 'http://localhost:3000/';

// Define Thunk for signup API request
export const signup = createAsyncThunk('auth/signup', async (userData) => {
    delete userData.confirmPassword
    try {
        const response = await axios.post(`${baseURL}auth/signup`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Define Thunk for login API request
export const login = createAsyncThunk('auth/login', async (userData) => {
    try {
        const cookies = new Cookies();

        const response = await axios.post(`${baseURL}auth/login`, userData)
            .then((res) => {
                const token = res?.data?.data?.token?.token;
                const timeout = res?.data?.data?.token?.expiresIn;
                const user = res?.data?.data?.user;

                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now

                cookies.set('Authorization', token, { expires: expirationDate });
                localStorage.setItem('userData', JSON.stringify(user));

                return res;
            })
            .catch((err) => {
                return err;
            })
        return response;
    } catch (error) {
        throw error.response.data;
    }
});

// Create a slice for authentication
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export the reducer
export default authSlice.reducer;
