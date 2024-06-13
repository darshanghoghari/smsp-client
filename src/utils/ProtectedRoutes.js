// ProtectedRoute.js

import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

const ProtectedRoute = ({ userType, element }) => {
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        const token = await cookies.get('Authorization');
        const userData = await localStorage.getItem('userData');
        const savedUserType = userData ? JSON.parse(userData).userType : '';

        if (token && savedUserType === 'Admin' && userType === 'Admin') {
            return; 
        } else {
            // Clear cookies and localStorage
            cookies.remove('Authorization');
            localStorage.removeItem('userData');
            // Redirect to login page
            navigate('/');
        }
    };

    return element;
};

export default ProtectedRoute;
