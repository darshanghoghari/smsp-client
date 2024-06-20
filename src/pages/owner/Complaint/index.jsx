import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Table, Image } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { addComplaint, deleteComplaint, fetchComplaintsData, updateComplaint } from '../../../features/complaint/complaintSlice';
import ComplaintModal from '../components/modal/complaintModal';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const OwnerComplaintActionPage = () => {
    const dispatch = useDispatch();
    const { complaints, loading, error } = useSelector((state) => state.complaints);
    const [modalShow, setModalShow] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [modalData, setModalData] = useState({});

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        dispatch(fetchComplaintsData());
    }, [dispatch]);

    const handleModalShow = (actionType, data = {}) => {
        setModalAction(actionType);
        setModalData(data);
        setModalShow(true);
    };

    const handleModalClose = () => setModalShow(false);

    const handleModalSubmit = async (formData) => {
        try {
            if (modalAction === 'add') {
                await dispatch(addComplaint(formData)).unwrap();
                toast.success('Complaint added successfully.');
            } else if (modalAction === 'update') {
                const id = formData.get('_id');
                formData.delete('_id');
                await dispatch(updateComplaint({ complaintId: id, formData })).unwrap();
                toast.success('Complaint updated successfully.');
            } else if (modalAction === 'delete') {
                await dispatch(deleteComplaint(modalData._id)).unwrap();
                toast.success('Complaint deleted successfully.');
            }

            await dispatch(fetchComplaintsData());
            setModalShow(false);
        } catch (error) {
            toast.error('Failed to perform action.');
        }
    };

    return (
        <Container fluid className="p-3">
            <ToastContainer />

            <Row className="align-items-center mb-3">
                <Col className="text-start">
                    <h4 className="m-0">Complaints</h4>
                </Col>
                <Col className="text-end">
                    <Button variant="btn btn-outline-dark" onClick={() => handleModalShow('add')}>
                        <AddSharpIcon /> Add Complaint
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <Table bordered hover responsive>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>No</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Title</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Description</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Resolved</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Proof Attachment</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(complaints && complaints.length > 0) ? complaints.map((complaint, index) => (
                                    <tr key={complaint._id}>
                                        <td>{index + 1}</td>
                                        <td>{complaint.complainTitle}</td>
                                        <td>{complaint.complainDescription}</td>
                                        <td>{complaint.isResolved ? 'Yes' : 'No'}</td>
                                        <td>
                                            {complaint.onCloudinaryLink ? (
                                                <Image src={complaint.onCloudinaryLink} thumbnail style={{ width: '100px', height: '100px' }} />
                                            ) : (
                                                'No Attachment'
                                            )}
                                        </td>
                                        <td>
                                            <Button
                                                variant="btn btn-outline-success" size="sm" className="me-2"
                                                onClick={() => handleModalShow('view', complaint)}
                                            >
                                                View
                                            </Button>
                                            {
                                                userData._id == complaint.complainedBy &&
                                                <>
                                                    <Button
                                                        variant="btn btn-outline-dark" size="sm" className="me-2"
                                                        onClick={() => handleModalShow('update', complaint)}
                                                    >
                                                        Update
                                                    </Button>
                                                    <Button
                                                        variant="btn btn-outline-danger" size="sm"
                                                        onClick={() => handleModalShow('delete', complaint)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </>
                                            }

                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No complaints found</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>

            <ComplaintModal
                show={modalShow}
                action={modalAction}
                data={modalData}
                handleClose={handleModalClose}
                handleSubmit={handleModalSubmit}
            />
        </Container>
    );
};

export default OwnerComplaintActionPage;




// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Container, Row, Col, Button, Table, Image } from 'react-bootstrap';
// import CircularProgress from '@mui/material/CircularProgress';
// import { ToastContainer, toast } from 'react-toastify';
// import { addComplaint, deleteComplaint, fetchComplaintsData, updateComplaint } from '../../../features/complaint/complaintSlice';
// import ComplaintModal from '../components/modal/complaintModal';
// import AddSharpIcon from '@mui/icons-material/AddSharp';

// const OwnerComplaintActionPage = () => {
//     const dispatch = useDispatch();
//     const { complaints, loading, error } = useSelector((state) => state.complaints);
//     const [modalShow, setModalShow] = useState(false);
//     const [modalAction, setModalAction] = useState('');
//     const [modalData, setModalData] = useState({});
//     const [user, setUser] = useState(null);
//     useEffect(() => {
//         dispatch(fetchComplaintsData());
//         const userData = localStorage.getItem('userData');
//         setUser(userData);
//     }, [dispatch]);
//     const handleModalShow = (actionType, data = {}) => {
//         setModalAction(actionType);
//         setModalData(data);
//         setModalShow(true);
//     };

//     const handleModalClose = () => setModalShow(false);

//     const handleModalSubmit = async (formData) => {
//         try {
//             if (modalAction === 'add') {
//                 await dispatch(addComplaint(formData)).unwrap();
//                 toast.success('Complaint added successfully.');
//             } else if (modalAction === 'update') {
//                 const id = formData.get('_id');
//                 formData.delete('_id');
//                 await dispatch(updateComplaint({ complaintId: id, formData })).unwrap();
//                 toast.success('Complaint updated successfully.');
//             } else if (modalAction === 'delete') {
//                 await dispatch(deleteComplaint(modalData._id)).unwrap();
//                 toast.success('Complaint deleted successfully.');
//             }

//             await dispatch(fetchComplaintsData());
//             setModalShow(false);
//         } catch (error) {
//             toast.error('Failed to perform action.');
//         }
//     };

//     return (
//         <Container fluid className="p-3">
//             <ToastContainer />

//             <Row className="align-items-center mb-3">
//                 <Col className="text-start">
//                     <h4 className="m-0">Complaints</h4>
//                 </Col>
//                 <Col className="text-end">
//                     <Button variant="btn btn-outline-dark" onClick={() => handleModalShow('add')}>
//                         <AddSharpIcon /> Add Complaint
//                     </Button>
//                 </Col>
//             </Row>

//             <Row>
//                 <Col>
//                     {loading ? (
//                         <CircularProgress />
//                     ) : error ? (
//                         <div>Error: {error}</div>
//                     ) : (
//                         <Table bordered hover responsive>
//                             <thead>
//                                 <tr>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>No</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Title</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Description</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Resolved</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Proof Attachment</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {(complaints && complaints.length > 0) ? complaints.map((complaint, index) => (
//                                     <tr key={complaint._id}>
//                                         <td>{index + 1}</td>
//                                         <td>{complaint.complainTitle}</td>
//                                         <td>{complaint.complainDescription}</td>
//                                         <td>{complaint.isResolved ? 'Yes' : 'No'}</td>
//                                         <td>
//                                             {complaint.onCloudinaryLink ? (
//                                                 <Image src={complaint.onCloudinaryLink} thumbnail style={{ width: '100px', height: '100px' }} />
//                                             ) : (
//                                                 'No Attachment'
//                                             )}
//                                         </td>
//                                         <td>
//                                             <Button
//                                                 variant="btn btn-outline-success" size="sm" className="me-2"
//                                                 onClick={() => handleModalShow('view', complaint)}
//                                             >
//                                                 View
//                                             </Button>
//                                             {
//                                                 user && user._id == complaint.complainedBy
//                                                     ? <>
//                                                         <Button
//                                                             variant="btn btn-outline-dark" size="sm" className="me-2"
//                                                             onClick={() => handleModalShow('update', complaint)}
//                                                         >
//                                                             Update
//                                                         </Button>
//                                                         <Button
//                                                             variant="btn btn-outline-danger" size="sm"
//                                                             onClick={() => handleModalShow('delete', complaint)}
//                                                         >
//                                                             Delete
//                                                         </Button>
//                                                     </>
//                                                     : ''
//                                             }

//                                         </td>
//                                     </tr>
//                                 )) : (
//                                     <tr>
//                                         <td colSpan="6" className="text-center">No complaints found</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </Table>
//                     )}
//                 </Col>
//             </Row>

//             <ComplaintModal
//                 show={modalShow}
//                 action={modalAction}
//                 data={modalData}
//                 handleClose={handleModalClose}
//                 handleSubmit={handleModalSubmit}
//             />
//         </Container>
//     );
// };

// export default OwnerComplaintActionPage;
