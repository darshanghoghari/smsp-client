import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaRegUser, FaPhoneAlt } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import './ProfilePage.css';
import { updateUserData } from '../../../features/user/userSlice';
import ProfileModal from '../components/modal/profileModal';

const ProfileDashboard = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData); // Replace with your actual slice path
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [user, setUser] = useState({});

    useEffect(() => {
        // Load initial user data from local storage or initial fetch
        const profile = localStorage.getItem('userData');
        if (profile) {
            setUser(JSON.parse(profile));
        }
    }, []);

    const handleUpdateUserData = (formData) => {
        // Dispatch action to update user data
        dispatch(updateUserData(formData))
            .then((updatedData) => {
                // Update local state and local storage with updated data
                // setUser(updatedData);
                localStorage.setItem('userData', JSON.stringify(updatedData));
                setIsModalOpen(false); // Close modal after successful update
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                // Handle error state if needed
            });
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <img src="https://blog.prepscholar.com/hs-fs/hubfs/aroma-aromatic-art-434213.jpg?width=539&name=aroma-aromatic-art-434213.jpg" alt="Cover" className="cover-photo" />
                <div className="profile-info">
                    <img src={user?.onCloudinaryLink || "https://via.placeholder.com/150"} alt="Profile" className="profile-photo" />
                    <div className="profile-details">
                        <h1>{user?.fullName || 'N/A'}</h1>
                    </div>
                </div>
            </header>
            <main className="profile-main">
                <div className="profile-actions">
                    <button className="edit-profile" onClick={() => setIsModalOpen(true)}><FaEdit /> Edit Profile</button>
                </div>
                <div className="profile-details-full">
                    <div className="details">
                        <MdAlternateEmail /> {user?.email || 'N/A'}
                    </div>
                    <div className="details">
                        <FaPhoneAlt /> {user?.contactNo || 'N/A'}
                    </div>
                    <div className="details">
                        <FaRegUser /> {user?.userType || 'N/A'}
                    </div>
                </div>
            </main>
            <ProfileModal
                userData={user}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                updateUserData={handleUpdateUserData} // Pass handler function to modal
            />
        </div>
    );
};

export default ProfileDashboard;





// import React, { useEffect, useState } from 'react';
// import { FaEdit, FaRegUser, FaPhoneAlt } from 'react-icons/fa';
// import { MdAlternateEmail } from 'react-icons/md';
// import './ProfilePage.css';
// import ProfileModal from '../components/modal/profileModal';

// const ProfileDashboard = () => {
//     const [userData, setUserData] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//         const profile = localStorage.getItem('userData');
//         if (profile) {
//             setUserData(JSON.parse(profile));
//         }
//     }, []);

//     const updateUserData = (updatedData) => {
//         fetch('https://api.example.com/update-profile', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedData),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 setUserData(data);
//                 localStorage.setItem('userData', JSON.stringify(data));
//             })
//             .catch(error => {
//                 console.error('Error updating profile:', error);
//             });
//     };

//     return (
//         <div className="profile-container">
//             <header className="profile-header">
//                 <img src="https://blog.prepscholar.com/hs-fs/hubfs/aroma-aromatic-art-434213.jpg?width=539&name=aroma-aromatic-art-434213.jpg" alt="Cover" className="cover-photo" />
//                 <div className="profile-info">
//                     <img src={userData?.onCloudinaryLink || "https://via.placeholder.com/150"} alt="Profile" className="profile-photo" />
//                     <div className="profile-details">
//                         <h1>{userData?.fullName || 'N/A'}</h1>
//                     </div>
//                 </div>
//             </header>
//             <main className="profile-main">
//                 <div className="profile-actions">
//                     <button className="edit-profile" onClick={() => setIsModalOpen(true)}><FaEdit /> Edit Profile</button>
//                 </div>
//                 <div className="profile-details-full">
//                     <div className="details">
//                         <MdAlternateEmail /> {userData?.email || 'N/A'}
//                     </div>
//                     <div className="details">
//                         <FaPhoneAlt /> {userData?.contactNo || 'N/A'}
//                     </div>
//                     <div className="details">
//                         <FaRegUser /> {userData?.userType || 'N/A'}
//                     </div>
//                 </div>
//             </main>
//             <ProfileModal
//                 userData={userData}
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 updateUserData={updateUserData}
//             />
//         </div>
//     );
// };

// export default ProfileDashboard;
