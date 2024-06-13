import React from 'react';
import { FaTh, FaBars, FaRegChartBar, FaCommentAlt, FaShoppingBag, FaThList } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
const Sidebar = ({ isOpen, toggleSidebar }) => {
    const menuItem = [
        { path: "home", name: "Home", icon: <FaTh /> },
        { path: "house", name: "House", icon: <FaHouseChimney /> },
        { path: "users", name: "User-Details", icon: <PeopleAltOutlinedIcon /> },
        { path: "comment", name: "Comment", icon: <FaCommentAlt /> },
        { path: "product", name: "Product", icon: <FaShoppingBag /> },
        { path: "productList", name: "Product List", icon: <FaThList /> }
    ];

    return (
        <div className="sidebar" style={{ width: isOpen ? "200px" : "50px" }}>
            <div className="top_section">
                <h1 className="logo" style={{ display: isOpen ? "block" : "none" }}>SMSP</h1>
                <div className="bars" style={{ marginLeft: isOpen ? "50px" : "0px" }}>
                    {/* <FaBars onClick={toggleSidebar} /> */}
                    {isOpen ? <ArrowBackIosSharpIcon onClick={toggleSidebar} sx={{ fontSize: '30px' }} /> : <ArrowForwardIosSharpIcon onClick={toggleSidebar} sx={{ fontSize: '30px' }} />}
                </div>
            </div>
            {menuItem.map((item, index) => (
                <NavLink to={item.path} key={index} className="link align-items-baseline " activeClassName="active">
                    <div className="icon">{item.icon}</div>
                    <div className="link_text" style={{ display: isOpen ? "block" : "none" }}>{item.name}</div>
                </NavLink>
            ))}
        </div>
    );
};

export default Sidebar;




// import React, { useState } from 'react';
// import {
//     FaTh,
//     FaBars,
//     FaUserAlt,
//     FaRegChartBar,
//     FaCommentAlt,
//     FaShoppingBag,
//     FaThList
// } from "react-icons/fa";
// import { NavLink } from 'react-router-dom';
// import './Sidebar.css';

// const Sidebar = ({ children }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggle = () => setIsOpen(!isOpen);
//     const menuItem = [
//         {
//             path: "/",
//             name: "Dashboard",
//             icon: <FaTh />
//         },
//         {
//             path: "/about",
//             name: "About",
//             icon: <FaUserAlt />
//         },
//         {
//             path: "/analytics",
//             name: "Analytics",
//             icon: <FaRegChartBar />
//         },
//         {
//             path: "/comment",
//             name: "Comment",
//             icon: <FaCommentAlt />
//         },
//         {
//             path: "/product",
//             name: "Product",
//             icon: <FaShoppingBag />
//         },
//         {
//             path: "/productList",
//             name: "Product List",
//             icon: <FaThList />
//         }
//     ]
//     return (
//         <div className="container">
//             <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
//                 <div className="top_section">
//                     <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">SMSP</h1>
//                     <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
//                         <FaBars onClick={toggle} />
//                     </div>
//                 </div>
//                 {
//                     menuItem.map((item, index) => (
//                         <NavLink to={item.path} key={index} className="link" activeclassName="active">
//                             <div className="icon">{item.icon}</div>
//                             <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
//                         </NavLink>
//                     ))
//                 }
//             </div>
//             <main>{children}</main>
//         </div>
//     );
// };

// export default Sidebar;