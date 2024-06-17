// src/AdminMain.js
import React, { useState } from 'react';
import './OwnerMain.css';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Drawer/OwnerSidebar';
import OwnerHeader from './components/Header/OwnerHeader';

const OwnerMain = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="owner-main">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="main-content" style={{ marginLeft: isSidebarOpen ? '200px' : '50px' }}>
                <OwnerHeader isSidebarOpen={isSidebarOpen} />
                <div className="page-content">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default OwnerMain;



