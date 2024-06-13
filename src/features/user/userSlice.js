import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define the initial state
const initialState = {
    loading: false,
    error: null,
    user: null,
};

// Define the base URL for the backend API
const baseURL = 'http://localhost:3000/';

// Function to get the token from cookies
const getToken = () => {
    return Cookies.get('Authorization');
};
/*
router.get('/get/:userId', authMiddleware, profileController.getProfileById);
router.get('/getDetails', authMiddleware, profileController.getAllProfile);
router.put('/update/:userId', upload.single('photoProof'), authMiddleware, profileController.editProfile);
router.delete('/delete/:userId', authMiddleware, profileController.deleteProfile);
*/
// Define Thunk for get API request
export const fetchUserData = createAsyncThunk('user/getDetail', async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${baseURL}profile/getDetails`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(response.data.data, '<----------------------user Data ----------------------->');
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const updateUserData = createAsyncThunk('user/updateDetail', async (data) => {
    try {
        const token = getToken();
        const userId = data._id;
        delete data._id; // Remove _id from the payload as we use it in the URL
        const response = await axios.put(`${baseURL}profile/update/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

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




// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import Cookies from "js-cookie";

// // Define the initial state
// const initialState = {
//     loading: false,
//     error: null,
//     user: null,
// };

// // Define the base URL for the backend API
// const baseURL = 'http://localhost:3000/';

// // Function to get the token from cookies
// const getToken = () => {
//     return Cookies.get('Authorization');
// };

// // Define Thunk for get API request
// export const fetchUserData = createAsyncThunk('user/getDetail', async () => {
//     try {
//         const token = getToken();
//         const response = await axios.get(`${baseURL}profile/getDetails`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         console.log(response.data.data, "<----------------------user Data ----------------------->")
//         return response.data.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// });

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUserData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchUserData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//                 state.error = null;
//                 console.log(action.payload, "<----------------------user Data action----------------------->")
//             })
//             .addCase(fetchUserData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//                 state.user = null;
//             });
//     }
// });

// // Export the reducer
// export default userSlice.reducer;
