import AdminDashboard from '../pages/admin/Dashboard/Index';
import AdminMain from '../pages/admin/admin-main';
import HouseAction from '../pages/admin/house/HouseAction';
import UserDetailsList from '../pages/admin/usersList';
import LoginPage from '../pages/auth/signin/Index';
import RegistrationPage from '../pages/auth/signup/Index';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
      element: <AdminMain />,
      children: [
        {
          path: 'home',
          element: <AdminDashboard />,
        },
        {
          path: 'house',
          element: <HouseAction />
        },
        {
          path: 'users',
          element: <UserDetailsList />
        },
        {
          path: '*',
          element: <AdminDashboard />,
        },
      ],
    }
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
