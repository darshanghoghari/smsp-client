import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define the initial state
const initialState = {
    loading: false,
    error: null,
    home: null,
};

// Define the base URL for the backend API
const baseURL = 'http://localhost:3000/';

// Function to get the token from cookies
const getToken = () => {
    return Cookies.get('Authorization');
};

// Define Thunk for get API request
export const fetchHomeData = createAsyncThunk('house/getDetail', async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${baseURL}house/getDetail`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const addHomeData = createAsyncThunk('house/addDetail', async (data) => {
    try {
        const token = getToken();
        const response = await axios.post(`${baseURL}house/add`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const updateHomeData = createAsyncThunk('house/updateDetail', async (data) => {
    console.log(data, ' <----------------------Update Data----------------------->');
    try {
        /**
         createdAt
: 
"2024-04-03T16:48:50.481Z"
houseFloorCount
: 
1
houseOnRantMoney
: 
0
houseOnRentTenantId
: 
null
houseOnSale
: 
true
houseOwnerUserId
: 
null
houseSellPrice
: 
0
houseType
: 
"2BHK"
updatedAt
: 
"2024-04-03T16:48 
         */
        const token = getToken();
        const dataId = data._id;
        delete data._id;
        delete data.houseNo;
        delete data.houseOnRateMoney;
        delete data.adminUserId;
        delete data.createdAt;
        delete data.updatedAt;
        const response = await axios.put(`${baseURL}house/update/${dataId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const deleteHomeData = createAsyncThunk('house/deleteDetail', async (dataId) => {
    try {
        const token = getToken();
        const response = await axios.delete(`${baseURL}house/delete/${dataId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const houseSlice = createSlice({
    name: 'house',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeData.fulfilled, (state, action) => {
                state.loading = false;
                state.home = action.payload;
                state.error = null;
            })
            .addCase(fetchHomeData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.home = null;
            })
            .addCase(addHomeData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addHomeData.fulfilled, (state, action) => {
                state.loading = false;
                state.home = action.payload;
                state.error = null;
            })
            .addCase(addHomeData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.home = null;
            })
            .addCase(updateHomeData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateHomeData.fulfilled, (state, action) => {
                state.loading = false;
                state.home = action.payload;
                state.error = null;
            })
            .addCase(updateHomeData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.home = null;
            })
            .addCase(deleteHomeData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteHomeData.fulfilled, (state, action) => {
                state.loading = false;
                state.home = action.payload;
                state.error = null;
            })
            .addCase(deleteHomeData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.home = null;
            });
    }
});

// Export the reducer
export default houseSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import Cookies from "js-cookie";

// // Define the initial state
// const initialState = {
//     loading: false,
//     error: null,
//     home: null,
// };

// // Define the base URL for the backend API
// const baseURL = 'http://localhost:3000/';

// // Function to get the token from cookies
// const getToken = () => {
//     return Cookies.get('Authorization');
// };

// // Define Thunk for get API request
// export const fetchHomeData = createAsyncThunk('house/getDetail', async () => {
//     try {
//         const token = getToken();
//         const response = await axios.get(`${baseURL}house/getDetail`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// });

// export const addHomeData = createAsyncThunk('house/addDetail', async (data) => {
//     try {
//         const token = getToken();
//         const response = await axios.post(`${baseURL}house/add`, data, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// });

// export const updateHomeData = createAsyncThunk('house/updateDetail', async (data) => {
//     try {
//         const token = getToken();
//         console.log(data, " <----------------------Update Data----------------------->");
//         const dataId = data._id;
//         delete data._id;
//         delete data.houseNo;
//         const response = await axios.put(`${baseURL}house/update/${dataId}`, data);

//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// });

// export const deleteHomeData = createAsyncThunk('house/deleteDetail', async (dataId) => {
//     const token = getToken();
//     const response = await axios.delete(`${baseURL}house/delete/${dataId}`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
//     return response.data;
// })

// const houseSlice = createSlice({
//     name: 'house',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchHomeData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchHomeData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.home = action.payload;
//                 state.error = null;
//             })
//             .addCase(fetchHomeData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//                 state.home = null;
//             })
//             .addCase(addHomeData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(addHomeData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.home = action.payload;
//                 state.error = null;
//             })
//             .addCase(addHomeData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//                 state.home = null;
//             })
//             .addCase(updateHomeData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(updateHomeData.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.home = action.payload;
//                 state.error = null;
//             })
//             .addCase(updateHomeData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//                 state.home = null;
//             });
//     }
// });

// // Export the reducer
// export default houseSlice.reducer;
