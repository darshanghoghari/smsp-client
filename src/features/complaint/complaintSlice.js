import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
    loading: false,
    error: null,
    complaints: null,
    complaint: null,
};

const baseURL = 'http://localhost:3000/';

const getToken = () => {
    return Cookies.get('Authorization');
};

export const fetchComplaintsData = createAsyncThunk('complaints/fetchComplaints', async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${baseURL}complain/getDetail`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const fetchSingleComplaint = createAsyncThunk('complaints/fetchSingleComplaint', async (complaintId) => {
    try {
        const token = getToken();
        const response = await axios.get(`${baseURL}complain/get/${complaintId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const addComplaint = createAsyncThunk('complaints/addComplaint', async (formData) => {
    try {
        const token = getToken();
        const response = await axios.post(`${baseURL}complain/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const updateComplaint = createAsyncThunk('complaints/updateComplaint', async ({ complaintId, formData }) => {
    try {
        const token = getToken();
        const response = await axios.put(`${baseURL}complain/update/${complaintId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const deleteComplaint = createAsyncThunk('complaints/deleteComplaint', async (complaintId) => {
    try {
        const token = getToken();
        const response = await axios.delete(`${baseURL}complain/delete/${complaintId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
});

const complaintSlice = createSlice({
    name: 'complaints',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComplaintsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComplaintsData.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints = action.payload;
                state.error = null;
            })
            .addCase(fetchComplaintsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSingleComplaint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleComplaint.fulfilled, (state, action) => {
                state.loading = false;
                state.complaint = action.payload;
                state.error = null;
            })
            .addCase(fetchSingleComplaint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addComplaint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addComplaint.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints.push(action.payload);
                state.error = null;
            })
            .addCase(addComplaint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateComplaint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateComplaint.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints = state.complaints.map(complaint =>
                    complaint._id === action.payload._id ? action.payload : complaint
                );
                state.error = null;
            })
            .addCase(updateComplaint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteComplaint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComplaint.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints = state.complaints.filter(
                    complaint => complaint._id !== action.payload._id
                );
                state.error = null;
            })
            .addCase(deleteComplaint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default complaintSlice.reducer;




// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// // Define the initial state
// const initialState = {
//     loading: false,
//     error: null,
//     complaints: null,
//     complaint: null,
// };

// // Define the base URL for the backend API
// const baseURL = 'http://localhost:3000/';

// // Function to get the token from cookies
// const getToken = () => {
//     return Cookies.get('Authorization');
// };

// // Fetch complaints data
// export const fetchComplaintsData = createAsyncThunk('complaints/fetchComplaints', async () => {
//     try {
//         const token = getToken();
//         const response = await axios.get(`${baseURL}complain/getDetail`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         return response.data.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// });

// // Fetch single complaint data
// export const fetchSingleComplaint = createAsyncThunk('complaints/fetchSingleComplaint', async (complaintId) => {
//     try {
//         const token = getToken();
//         const response = await axios.get(`${baseURL}complain/get/${complaintId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         return response.data.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// });

// // Add new complaint
// export const addComplaint = createAsyncThunk('complaints/addComplaint', async (formData) => {
//     try {
//         const token = getToken();
//         const response = await axios.post(`${baseURL}complain/add`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         return response.data.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// });

// // Update complaint data
// export const updateComplaint = createAsyncThunk('complaints/updateComplaint', async ({ complaintId, formData }) => {
//     try {
//         const token = getToken();
//         const response = await axios.put(`${baseURL}complain/update/${complaintId}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         return response.data.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// });

// // Delete complaint data
// export const deleteComplaint = createAsyncThunk('complaints/deleteComplaint', async (complaintId) => {
//     try {
//         const token = getToken();
//         const response = await axios.delete(`${baseURL}complain/delete/${complaintId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         return response.data.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// });

// const complaintSlice = createSlice({
//     name: 'complaints',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchComplaintsData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchComplaintsData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.complaints = action.payload.data;
//                 state.error = null;
//             })
//             .addCase(addComplaint.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(addComplaint.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.complaints(action.payload.data);
//                 state.error = null;
//             })
//             .addCase(addComplaint.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     },
// });

// // Export the reducer
// export default complaintSlice.reducer;
