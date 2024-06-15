import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import houseReducer from './home/homeSlice';
import userReducer from './user/userSlice';
import circularNoticeReducer from './circularNotice/circularSlice';
import clubBookingReducer from './clubBooking/clubBooking';
import meetingReducer from './meeting/meeting';
import complaintReducer from './complaint/complaintSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        house: houseReducer,
        user: userReducer,
        circularNotice: circularNoticeReducer,
        clubBooking: clubBookingReducer,
        meeting: meetingReducer,
        complaints: complaintReducer
    },
});

export default store;
