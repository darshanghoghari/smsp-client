import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

const ProtectedRoute = ({ userType, element }) => {
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        const token = cookies.get('Authorization');
        const userData = localStorage.getItem('userData');
        const savedUserType = userData ? JSON.parse(userData).userType : '';

        if (token && (savedUserType === userType || savedUserType === 'Admin')) {
            return;
        } else {
            cookies.remove('Authorization');
            localStorage.removeItem('userData');
            navigate('/');
        }
    };

    return element;
};

export default ProtectedRoute;