import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaRegUser, FaPhoneAlt } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import './ProfilePage.css';
import { updateUserData, fetchSingleProfile } from '../../../features/user/userSlice';
import ProfileModal from '../components/modal/profileModal';

const ProfileDashboard = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.user.profile); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
       
        const userData = JSON.parse(localStorage.getItem('userData')); 
        if (userData && userData._id) {
            const profileId = userData._id; 
            dispatch(fetchSingleProfile(profileId));
        }
    }, [dispatch]);

    const handleUpdateUserData = (formData) => {
        dispatch(updateUserData({ id: profile._id, formData }))
            .then(async (action) => {
                if (action.type.endsWith('fulfilled')) {
                    await localStorage.setItem('userData', JSON.stringify(action.payload.data));
                    setIsModalOpen(false); 
                    const userData = JSON.parse(localStorage.getItem('userData'));
                    if (userData && userData._id) {
                        const profileId = userData._id;
                        dispatch(fetchSingleProfile(profileId));
                    }
                } else {
                    console.error('Error updating profile:', action.error);
                }
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
                // Handle error state if needed
            });
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <img src="https://blog.prepscholar.com/hs-fs/hubfs/aroma-aromatic-art-434213.jpg?width=539&name=aroma-aromatic-art-434213.jpg" alt="Cover" className="cover-photo" />
                <div className="profile-info">
                    <img src={profile?.onCloudinaryLink || "https://via.placeholder.com/150"} alt="Profile" className="profile-photo" />
                    <div className="profile-details">
                        <h1>{profile?.fullName || 'N/A'}</h1>
                    </div>
                </div>
            </header>
            <main className="profile-main">
                <div className="profile-actions">
                    <button className="edit-profile" onClick={() => setIsModalOpen(true)}><FaEdit /> Edit Profile</button>
                </div>
                <div className="profile-details-full">
                    <div className="details">
                        <MdAlternateEmail /> {profile?.email || 'N/A'}
                    </div>
                    <div className="details">
                        <FaPhoneAlt /> {profile?.contactNo || 'N/A'}
                    </div>
                    <div className="details">
                        <FaRegUser /> {profile?.userType || 'N/A'}
                    </div>
                </div>
            </main>
            <ProfileModal
                userData={profile}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                updateUserData={handleUpdateUserData} // Pass handler function to modal
            />
        </div>
    );
};

export default ProfileDashboard;





// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaEdit, FaRegUser, FaPhoneAlt } from 'react-icons/fa';
// import { MdAlternateEmail } from 'react-icons/md';
// import './ProfilePage.css';
// import { updateUserData, fetchSingleProfile } from '../../../features/user/userSlice';
// import ProfileModal from '../components/modal/profileModal';

// const ProfileDashboard = () => {
//     const dispatch = useDispatch();
//     const profile = useSelector((state) => state.user.profile); // Access profile from state
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//         // Fetch the single profile data when the component mounts
//         const userData = JSON.parse(localStorage.getItem('userData')); // Parse userData from localStorage
//         if (userData && userData._id) {
//             const profileId = userData._id; // Get profileId from userData
//             dispatch(fetchSingleProfile(profileId));
//         }
//     }, [dispatch]);

//     const handleUpdateUserData = (formData) => {
//         // Dispatch action to update user data
//         dispatch(updateUserData({ id: profile._id, formData }))
//             .then(async (action) => {
//                 if (action.type.endsWith('fulfilled')) {
//                     // Update local storage with updated data
//                     await localStorage.setItem('userData', JSON.stringify(action.payload.data));
//                     setIsModalOpen(false); // Close modal after successful update
//                 } else {
//                     console.error('Error updating profile:', action.error);
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error updating profile:', error);
//                 // Handle error state if needed
//             });
//     };

//     return (
//         <div className="profile-container">
//             <header className="profile-header">
//                 <img src="https://blog.prepscholar.com/hs-fs/hubfs/aroma-aromatic-art-434213.jpg?width=539&name=aroma-aromatic-art-434213.jpg" alt="Cover" className="cover-photo" />
//                 <div className="profile-info">
//                     <img src={profile?.onCloudinaryLink || "https://via.placeholder.com/150"} alt="Profile" className="profile-photo" />
//                     <div className="profile-details">
//                         <h1>{profile?.fullName || 'N/A'}</h1>
//                     </div>
//                 </div>
//             </header>
//             <main className="profile-main">
//                 <div className="profile-actions">
//                     <button className="edit-profile" onClick={() => setIsModalOpen(true)}><FaEdit /> Edit Profile</button>
//                 </div>
//                 <div className="profile-details-full">
//                     <div className="details">
//                         <MdAlternateEmail /> {profile?.email || 'N/A'}
//                     </div>
//                     <div className="details">
//                         <FaPhoneAlt /> {profile?.contactNo || 'N/A'}
//                     </div>
//                     <div className="details">
//                         <FaRegUser /> {profile?.userType || 'N/A'}
//                     </div>
//                 </div>
//             </main>
//             <ProfileModal
//                 userData={profile}
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 updateUserData={handleUpdateUserData} // Pass handler function to modal
//             />
//         </div>
//     );
// };

// export default ProfileDashboard;
