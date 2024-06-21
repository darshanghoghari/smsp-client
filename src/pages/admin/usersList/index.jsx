import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Table, Image } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { deleteUserData, fetchUserData, updateUserData } from '../../../features/user/userSlice';
import UserActionModal from '../components/modal/userModal';
import { FaEdit, FaRegEye, FaTrash } from 'react-icons/fa';

const UserDetailsList = () => {
    const dispatch = useDispatch();
    const { user, loading: userLoading, error: userError } = useSelector((state) => state.user);
    const [modalShow, setModalShow] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [modalData, setModalData] = useState({});
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    useEffect(() => {
        setUserData(user);
    }, [user]);

    const handleModalShow = (actionType, data = {}) => {
        setModalAction(actionType);
        setModalData(data);
        setModalShow(true);
    };

    const handleModalClose = () => setModalShow(false);

    const handleModalSubmit = async (formData) => {
        try {
            if (modalAction === 'update') {
                await dispatch(updateUserData({ id: modalData._id, formData }));
                toast.success('User updated successfully.');
            } else if (modalAction === 'delete') {
                await dispatch(deleteUserData(modalData._id));
                toast.success('User deleted successfully.');
            }

            await dispatch(fetchUserData());
            setModalShow(false);
        } catch (error) {
            toast.error('Failed to perform action.');
        }
    };

    return (
        <Container fluid className="p-3">
            <ToastContainer />

            {/* First Row */}
            <Row className="align-items-center mb-3">
                <Col className="text-start">
                    <h1 className="m-0">User Details</h1>
                </Col>
            </Row>

            {/* Second Row - User Details */}
            <Row>
                <Col>
                    {userLoading ? (
                        <CircularProgress />
                    ) : userError ? (
                        <div>Error: {userError}</div>
                    ) : (
                        <Table bordered responsive>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>No</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>UserId</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Full Name</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Email</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Contact No</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>User Type</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Active</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Profile Pic</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData && userData.length > 0 ? userData.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td style={{ fontSize: '10px' }}>{user._id}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.contactNo}</td>
                                        <td>{user.userType}</td>
                                        <td>{user.isActive ? 'Yes' : 'No'}</td>
                                        <td>
                                            {user.onCloudinaryLink && (
                                                <Image src={user.onCloudinaryLink} roundedCircle style={{ width: '50px', height: '50px' }} />
                                            )}
                                        </td>
                                        <td className='d-flex justify-content-around'>
                                            <Button variant="btn btn-outline-success" size="sm" className="me-2" onClick={() => handleModalShow('view', user)}><FaRegEye /> View</Button>
                                            <Button variant="btn btn-outline-dark" size="sm" className="me-2" onClick={() => handleModalShow('update', user)}><FaEdit /> Edit</Button>
                                            <Button variant="btn btn-outline-danger" size="sm" onClick={() => handleModalShow('delete', user)}><FaTrash /> Delete</Button>
                                        </td>
                                    </tr>
                                )) : "Loading ...."}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>

            {/* Action Modal */}
            <UserActionModal
                show={modalShow}
                handleClose={handleModalClose}
                actionType={modalAction}
                data={modalData}
                handleSubmit={handleModalSubmit}
            />
        </Container>
    );
};

export default UserDetailsList;






// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Container, Row, Col, Button, Table, Image } from 'react-bootstrap';
// import CircularProgress from '@mui/material/CircularProgress';
// import { ToastContainer, toast } from 'react-toastify';
// import { fetchUserData, updateUserData, deleteUserData } from '../../../features/user/userSlice';
// import UserActionModal from '../components/modal/userModal';

// const UserDetailsList = () => {
//     const dispatch = useDispatch();
//     const { user, loading: userLoading, error: userError } = useSelector((state) => state.user); // Fetch user state
//     const [modalShow, setModalShow] = useState(false);
//     const [modalAction, setModalAction] = useState('');
//     const [modalData, setModalData] = useState({});
//     const [userData, setUserData] = useState([]);

//     useEffect(() => {
//         dispatch(fetchUserData()); // Fetch user data when the component mounts
//     }, [dispatch]);

//     useEffect(() => {
//         setUserData(user);
//     }, [user]);

//     const handleModalShow = (actionType, data = {}) => {
//         setModalAction(actionType);
//         setModalData(data);
//         setModalShow(true);
//     };

//     const handleModalClose = () => setModalShow(false);

//     const handleModalSubmit = async (data) => {
//         try {
//             if (modalAction === 'update') {
//                 await dispatch(updateUserData(data));
//                 toast.success('User updated successfully.');
//             } else if (modalAction === 'delete') {
//                 await dispatch(deleteUserData(data._id));
//                 toast.success('User deleted successfully.');
//             }

//             // Fetch the updated data after the action is performed
//             await dispatch(fetchUserData());

//             setModalShow(false);
//         } catch (error) {
//             toast.error('Failed to perform action.');
//         }
//     };

//     return (
//         <Container fluid className="p-3">
//             <ToastContainer />

//             {/* First Row */}
//             <Row className="align-items-center mb-3">
//                 <Col className="text-start">
//                     <h1 className="m-0">User Details</h1>
//                 </Col>
//             </Row>

//             {/* Second Row - User Details */}
//             <Row>
//                 <Col>
//                     {userLoading ? (
//                         <CircularProgress />
//                     ) : userError ? (
//                         <div>Error: {userError}</div>
//                     ) : (
//                         <Table striped bordered hover responsive>
//                             <thead>
//                                 <tr>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>No</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Full Name</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Email</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Contact No</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>User Type</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Active</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Access</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Profile Pic</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {(userData && userData.length > 0) ? userData.map((user, index) => (
//                                     <tr key={user._id}>
//                                         <td>{index + 1}</td>
//                                         <td>{user.fullName}</td>
//                                         <td>{user.email}</td>
//                                         <td>{user.contactNo}</td>
//                                         <td>{user.userType}</td>
//                                         <td>{user.isActive ? 'Yes' : 'No'}</td>
//                                         <td>{user.isAccess ? 'Yes' : 'No'}</td>
//                                         <td>
//                                             {user.onCloudinaryLink && (
//                                                 <Image src={user.onCloudinaryLink} roundedCircle style={{ width: '50px', height: '50px' }} />
//                                             )}
//                                         </td>
//                                         <td>
//                                             <Button variant="btn btn-outline-success" size="sm" className="me-2" onClick={() => handleModalShow('view', user)}>View</Button>
//                                             <Button variant="btn btn-outline-dark" size="sm" className="me-2" onClick={() => handleModalShow('update', user)}>Update</Button>
//                                             <Button variant="btn btn-outline-danger" size="sm" onClick={() => handleModalShow('delete', user)}>Delete</Button>
//                                         </td>
//                                     </tr>
//                                 )) : "Loading ...."}
//                             </tbody>
//                         </Table>
//                     )}
//                 </Col>
//             </Row>

//             {/* Action Modal */}
//             <UserActionModal
//                 show={modalShow}
//                 handleClose={handleModalClose}
//                 actionType={modalAction}
//                 data={modalData}
//                 handleSubmit={handleModalSubmit}
//             />
//         </Container>
//     );
// };

// export default UserDetailsList;