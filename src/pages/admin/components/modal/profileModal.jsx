import React, { useEffect, useState } from 'react';

const ProfileModal = ({ userData, isOpen, onClose, updateUserData }) => {
    const [updatedData, setUpdatedData] = useState(userData);
    const [imageFile, setImageFile] = useState(null);

    // Update local state when userData prop changes
    useEffect(() => {
        setUpdatedData(userData);
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullName', updatedData.fullName);
        formData.append('email', updatedData.email);
        formData.append('contactNo', updatedData.contactNo);
        formData.append('userType', updatedData.userType);
        if (imageFile) {
            formData.append('profileImage', imageFile);
        }

        updateUserData(formData);
        onClose(); // Close modal after updating
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <label className="modal-labels">
                        Full Name:
                        <input className="modal-input" type="text" name="fullName" value={updatedData.fullName} onChange={handleChange} />
                    </label>
                    <label className="modal-labels">
                        Email:
                        <input className="modal-input" type="email" name="email" value={updatedData.email} onChange={handleChange} />
                    </label>
                    <label className="modal-labels">
                        Contact No:
                        <input className="modal-input" type="text" name="contactNo" value={updatedData.contactNo} onChange={handleChange} />
                    </label>
                    <label className="modal-labels">
                        User Type:
                        <input className="modal-input" type="text" name="userType" value={updatedData.userType} onChange={handleChange} />
                    </label>
                    <label className="modal-labels">
                        Upload Profile Image:
                        <input className="modal-input" type="file" name="profileImage" onChange={handleFileChange} />
                    </label>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;





// import React, { useState } from 'react';

// const ProfileModal = ({ userData, isOpen, onClose, updateUserData }) => {
//     const [updatedData, setUpdatedData] = useState(userData);
//     const [imageFile, setImageFile] = useState(null);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUpdatedData({ ...updatedData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setImageFile(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('fullName', updatedData.fullName);
//         formData.append('email', updatedData.email);
//         formData.append('contactNo', updatedData.contactNo);
//         formData.append('userType', updatedData.userType);
//         if (imageFile) {
//             formData.append('profileImage', imageFile);
//         }

//         updateUserData(formData);
//         onClose();
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <button className="close-modal" onClick={onClose}>X</button>
//                 <form onSubmit={handleSubmit}>
//                     <label className="modal-labels">
//                         Full Name:
//                         <input className="modal-input" type="text" name="fullName" value={updatedData.fullName} onChange={handleChange} />
//                     </label>
//                     <label className="modal-labels">
//                         Email:
//                         <input className="modal-input" type="email" name="email" value={updatedData.email} onChange={handleChange} />
//                     </label>
//                     <label className="modal-labels">
//                         Contact No:
//                         <input className="modal-input" type="text" name="contactNo" value={updatedData.contactNo} onChange={handleChange} />
//                     </label>
//                     <label className="modal-labels">
//                         User Type:
//                         <input className="modal-input" type="text" name="userType" value={updatedData.userType} onChange={handleChange} />
//                     </label>
//                     <label className="modal-labels">
//                         Profile Image URL:
//                         <input className="modal-input" type="text" name="onCloudinaryLink" value={updatedData.onCloudinaryLink} onChange={handleChange} />
//                     </label>
//                     <label className="modal-labels">
//                         Upload Profile Image:
//                         <input className="modal-input" type="file" name="profileImage" onChange={handleFileChange} />
//                     </label>
//                     <button type="submit">Save Changes</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ProfileModal;
