import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ProfileModal = ({ userData, isOpen, onClose, updateUserData }) => {
    const [updatedData, setUpdatedData] = useState(userData);
    const [photoProofFile, setPhotoProofFile] = useState(null);

    useEffect(() => {
        setUpdatedData(userData);
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'photoProof') {
            setPhotoProofFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullName', updatedData.fullName);
        formData.append('email', updatedData.email);
        formData.append('contactNo', updatedData.contactNo);
        if (photoProofFile) {
            formData.append('photoProof', photoProofFile);
        }

        updateUserData(formData);
        onClose(); // Close modal after updating
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={onClose}>X</CloseButton>
                <form onSubmit={handleSubmit}>
                    
                    <ModalLabel>
                        Role : {updatedData.userType || ''}
                    </ModalLabel>
                    
                    <ModalLabel>
                        Full Name:
                        <ModalInput type="text" name="fullName" value={updatedData.fullName || ''} onChange={handleChange} />
                    </ModalLabel>
                    <ModalLabel>
                        Email:
                        <ModalInput type="email" name="email" value={updatedData.email || ''} onChange={handleChange} />
                    </ModalLabel>
                    <ModalLabel>
                        Contact No:
                        <ModalInput type="text" name="contactNo" value={updatedData.contactNo || ''} onChange={handleChange} />
                    </ModalLabel>
                    <ModalLabel>
                        Upload Profile Image:
                        <ModalInput type="file" name="photoProof" onChange={handleFileChange} />
                    </ModalLabel>
                    <SubmitButton type="submit">Save Changes</SubmitButton>
                </form>
            </ModalContent>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
`;

const ModalLabel = styled.label`
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    color: #333;
`;

const ModalInput = styled.input`
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export default ProfileModal;



// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';

// const ProfileModal = ({ userData, isOpen, onClose, updateUserData }) => {
//     const [updatedData, setUpdatedData] = useState(userData);
//     const [imageFile, setImageFile] = useState(null);

//     // Update local state when userData prop changes
//     useEffect(() => {
//         setUpdatedData(userData);
//     }, [userData]);

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
//         onClose(); // Close modal after updating
//     };

//     if (!isOpen) return null;

//     return (
//         <ModalOverlay>
//             <ModalContent>
//                 <CloseButton onClick={onClose}>X</CloseButton>
//                 <form onSubmit={handleSubmit}>
//                     <ModalLabel>
//                         Full Name:
//                         <ModalInput type="text" name="fullName" value={updatedData.fullName} onChange={handleChange} />
//                     </ModalLabel>
//                     <ModalLabel>
//                         Email:
//                         <ModalInput type="email" name="email" value={updatedData.email} onChange={handleChange} />
//                     </ModalLabel>
//                     <ModalLabel>
//                         Contact No:
//                         <ModalInput type="text" name="contactNo" value={updatedData.contactNo} onChange={handleChange} />
//                     </ModalLabel>
//                     <ModalLabel>
//                         User Type:
//                         <ModalInput type="text" name="userType" value={updatedData.userType} onChange={handleChange} />
//                     </ModalLabel>
//                     <ModalLabel>
//                         Upload Profile Image:
//                         <ModalInput type="file" name="profileImage" onChange={handleFileChange} />
//                     </ModalLabel>
//                     <SubmitButton type="submit">Save Changes</SubmitButton>
//                 </form>
//             </ModalContent>
//         </ModalOverlay>
//     );
// };

// const ModalOverlay = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: rgba(0, 0, 0, 0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
// `;

// const ModalContent = styled.div`
//     background: white;
//     padding: 20px;
//     border-radius: 8px;
//     width: 400px;
//     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//     position: relative;
// `;

// const CloseButton = styled.button`
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     background: none;
//     border: none;
//     font-size: 18px;
//     cursor: pointer;
// `;

// const ModalLabel = styled.label`
//     display: block;
//     margin-bottom: 10px;
//     font-size: 14px;
//     color: #333;
// `;

// const ModalInput = styled.input`
//     width: 100%;
//     padding: 8px;
//     margin-top: 4px;
//     margin-bottom: 10px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
// `;

// const SubmitButton = styled.button`
//     width: 100%;
//     padding: 10px;
//     background-color: #007bff;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     font-size: 16px;
//     transition: background-color 0.3s;

//     &:hover {
//         background-color: #0056b3;
//     }
// `;

// export default ProfileModal;
