// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';


// Create the Redux store
const store = configureStore({
    reducer: {
        auth: authReducer
    },
});

export default store;
