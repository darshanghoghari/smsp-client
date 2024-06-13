// ProtectedRoute.js

import React from 'react';
import Cookies from 'universal-cookie';
import LoginPage from '../pages/auth/signin/Index';
import AdminMain from '../pages/admin/admin-main';

const cookies = new Cookies();

const ProtectedRoute = ({ userType, element }) => {
    const token = cookies.get('token');
    
    if (token && userType === 'Admin') {
        return <AdminMain />;
    } else {
        return <LoginPage />;
    }
};

export default ProtectedRoute;
