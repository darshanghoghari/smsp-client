import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import houseReducer from './home/homeSlice'
import userReducer from './user/userSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        house: houseReducer,
        user: userReducer
    },
});

export default store;
