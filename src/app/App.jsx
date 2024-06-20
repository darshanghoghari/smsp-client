import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '../pages/auth/signin/Index';
import RegistrationPage from '../pages/auth/signup/Index';
import AdminMain from '../pages/admin/admin-main';
import AdminDashboard from '../pages/admin/Dashboard/Index';
import HouseAction from '../pages/admin/house/HouseAction';
import UserDetailsList from '../pages/admin/usersList';
import CircularNotice from '../pages/admin/circularNotice/Index';
import ProtectedRoute from '../utils/ProtectedRoutes';
import ProfileDashboard from '../pages/admin/profile/Index';
import ClubBookingActionPage from '../pages/admin/clubBooking/Index';
import MeetingAction from '../pages/admin/Meeting/Index';
import ComplaintActionPage from '../pages/admin/Complaint';
import OwnerMain from '../pages/owner/OwnerMain';
import OwnerDashboard from '../pages/owner/Dashboard/Index';
import OwnerProfileDashboard from '../pages/owner/profile/Index';
import OwnerHouseAction from '../pages/owner/house/HouseAction';
import OwnerCircularNotice from '../pages/owner/circularNotice/Index';
import OwnerMeetingAction from '../pages/owner/Meeting/Index';
import OwnerClubBookingActionPage from '../pages/owner/clubBooking/Index';
import OwnerComplaintActionPage from '../pages/owner/Complaint';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegistrationPage />,
    },
    {
      path: '/admin',
      element: <ProtectedRoute userType="Admin" element={<AdminMain />} />,
      children: [
        {
          path: 'home',
          element: <ProtectedRoute userType="Admin" element={<AdminDashboard />} />,
        },
        {
          path: 'house',
          element: <ProtectedRoute userType="Admin" element={<HouseAction />} />,
        },
        {
          path: 'users',
          element: <ProtectedRoute userType="Admin" element={<UserDetailsList />} />,
        },
        {
          path: 'circulars',
          element: <ProtectedRoute userType="Admin" element={<CircularNotice />} />,
        },
        {
          path: 'profile',
          element: <ProtectedRoute userType="Admin" element={<ProfileDashboard />} />,
        },
        {
          path: 'club-booking',
          element: <ProtectedRoute userType="Admin" element={<ClubBookingActionPage />} />,
        },
        {
          path: 'meeting',
          element: <ProtectedRoute userType="Admin" element={<MeetingAction />} />,
        },
        {
          path: 'complaints',
          element: <ProtectedRoute userType="Admin" element={<ComplaintActionPage />} />,
        },
        {
          path: '*',
          element: <ProtectedRoute userType="Admin" element={<AdminDashboard />} />,
        },
      ],
    },
    {
      path: '/owner',
      element: <ProtectedRoute userType="Owner" element={<OwnerMain />} />,
      children: [
        {
          path: 'home',
          element: <ProtectedRoute userType="Owner" element={<OwnerDashboard />} />,
        },
        {
          path: 'house',
          element: <ProtectedRoute userType="Owner" element={<OwnerHouseAction />} />,
        },
        {
          path: 'circulars',
          element: <ProtectedRoute userType="Owner" element={<OwnerCircularNotice />} />,
        },
        {
          path: 'club-booking',
          element: <ProtectedRoute userType="Owner" element={<OwnerClubBookingActionPage />} />,
        },
        {
          path: 'meeting',
          element: <ProtectedRoute userType="Owner" element={<OwnerMeetingAction />} />,
        },
        {
          path: 'profile',
          element: <ProtectedRoute userType="Owner" element={<OwnerProfileDashboard />} />,
        },
        {
          path: 'complaints',
          element: <ProtectedRoute userType="Owner" element={<OwnerComplaintActionPage />} />,
        },
        {
          path: '*',
          element: <ProtectedRoute userType="Owner" element={<OwnerDashboard />} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;