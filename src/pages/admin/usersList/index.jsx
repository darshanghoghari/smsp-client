import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Table, Image } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { fetchUserData } from '../../../features/user/userSlice'; // Import the fetchUserData thunk
import AddSharpIcon from '@mui/icons-material/AddSharp';
import UserActionModal from '../components/modal/userModal';

const UserDetailsList = () => {
    const dispatch = useDispatch();
    const { user, loading: userLoading, error: userError } = useSelector((state) => state.user); // Fetch user state
    const [modalShow, setModalShow] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [modalData, setModalData] = useState({});
    const [userData, setUserData] = useState([]);

    console.log(userData, "<----------------------user Data lkdflkdlkflsdk----------------------->")
    useEffect(() => {
        dispatch(fetchUserData()); // Fetch user data when the component mounts
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

    const handleModalSubmit = async (data) => {
        try {
            // Handle add, update, delete actions based on modalAction
            // if (modalAction === 'add') {
            //     await dispatch(addUserData(data));
            //     toast.success('User added successfully.');
            // } else if (modalAction === 'update') {
            //     await dispatch(updateUserData(data));
            //     toast.success('User updated successfully.');
            // } else if (modalAction === 'delete') {
            //     await dispatch(deleteUserData(data._id));
            //     toast.success('User deleted successfully.');
            // }

            // After successful add, update, or delete, fetch the updated data
            dispatch(fetchUserData());

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
                <Col className="text-end">
                    <Button variant="primary" onClick={() => handleModalShow('add')}><AddSharpIcon /> Add User Detail</Button>
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
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Contact No</th>
                                    <th>User Type</th>
                                    <th>Active</th>
                                    <th>Access</th>
                                    <th>Profile Pic</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData && userData.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.contactNo}</td>
                                        <td>{user.userType}</td>
                                        <td>{user.isActive ? 'Yes' : 'No'}</td>
                                        <td>{user.isAccess ? 'Yes' : 'No'}</td>
                                        <td>
                                            {user.onCloudinaryLink && (
                                                <Image src={user.onCloudinaryLink} roundedCircle style={{ width: '50px', height: '50px' }} />
                                            )}
                                        </td>
                                        <td>
                                            <Button variant="primary" size="sm" className="me-2" onClick={() => handleModalShow('view', user)}>View</Button>
                                            <Button variant="warning" size="sm" className="me-2" onClick={() => handleModalShow('update', user)}>Update</Button>
                                            <Button variant="danger" size="sm" onClick={() => handleModalShow('delete', user)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
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
