import React from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaHouseChimney, FaRegNoteSticky } from "react-icons/fa6";
import { FaRegHandshake } from "react-icons/fa";

import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
const Sidebar = ({ isOpen, toggleSidebar }) => {
    const menuItem = [
        { path: "home", name: "Home", icon: <LuLayoutDashboard /> },
        { path: "house", name: "House", icon: <FaHouseChimney /> },
        // { path: "users", name: "User-Details", icon: <PeopleAltOutlinedIcon /> },
        { path: "circulars", name: "Circulars", icon: <FaRegNoteSticky /> },
        { path: "club-booking", name: "Club-Booking", icon: <LocalBarIcon /> },
        { path: "meeting", name: "Meetings", icon: <FaRegHandshake /> },
        { path: "complaints", name: "Complaints", icon: <NewReleasesIcon /> }
    ];

    return (
        <div className="sidebar" style={{ width: isOpen ? "200px" : "50px" }}>
            <div className="top_section">
                <h1 className="logo" style={{ display: isOpen ? "block" : "none" }}>SMSP</h1>
                <div className="bars align-items-baseline " style={{ marginLeft: isOpen ? "50px" : "0px" }}>
                    {isOpen ? <ArrowBackIosSharpIcon onClick={toggleSidebar} sx={{ fontSize: '30px' }} /> : <ArrowForwardIosSharpIcon onClick={toggleSidebar} sx={{ fontSize: '30px' }} />}
                </div>
            </div>
            {menuItem.map((item, index) => (
                <NavLink to={item.path} key={index} className="link " activeClassName="active">
                    <div className="icon" style={{ fontSize: "20px" }}>{item.icon}</div>
                    <div className="link_text" style={{ display: isOpen ? "block" : "none" }}>{item.name}</div>
                </NavLink>
            ))}
        </div>
    );
};

export default Sidebar;
