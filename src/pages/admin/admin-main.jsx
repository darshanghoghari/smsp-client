// src/AdminMain.js
import React, { useState } from 'react';
import Sidebar from './components/Drawer/AdminSidebar';
import AdminsHeader from './components/Header/AdminsHeader';
import './AdminMain.css';
import { Outlet } from 'react-router-dom';

const AdminMain = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="admin-main">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="main-content" style={{ marginLeft: isSidebarOpen ? '200px' : '50px' }}>
                <AdminsHeader isSidebarOpen={isSidebarOpen} />
                <div className="page-content">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminMain;



