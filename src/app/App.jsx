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
          path: '*',
          element: <ProtectedRoute userType="Admin" element={<AdminDashboard />} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;