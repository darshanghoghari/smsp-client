import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import houseReducer from './home/homeSlice';
import userReducer from './user/userSlice';
import circularNoticeReducer from './circularNotice/circularSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        house: houseReducer,
        user: userReducer,
        circularNotice: circularNoticeReducer
    },
});

export default store;
