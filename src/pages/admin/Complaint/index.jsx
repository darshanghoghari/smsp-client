import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Table, Image } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { addComplaint, deleteComplaint, fetchComplaintsData, updateComplaint } from '../../../features/complaint/complaintSlice';
import ComplaintModal from '../components/modal/complaintModal';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { FaEdit, FaRegEye, FaTrash } from 'react-icons/fa';

const ComplaintActionPage = () => {
    const dispatch = useDispatch();
    const { complaints, loading, error } = useSelector((state) => state.complaints);
    const [modalShow, setModalShow] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [modalData, setModalData] = useState({});

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
                        <Table bordered responsive>
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
                                        <td className='d-flex justify-content-around'>
                                            <Button
                                                variant="btn btn-outline-success" size="sm" className="me-2"
                                                onClick={() => handleModalShow('view', complaint)}
                                            >
                                                <FaRegEye /> View
                                            </Button>
                                            <Button
                                                variant="btn btn-outline-dark" size="sm" className="me-2"
                                                onClick={() => handleModalShow('update', complaint)}
                                            >
                                                <FaEdit /> Edit
                                            </Button>
                                            <Button
                                                variant="btn btn-outline-danger" size="sm"
                                                onClick={() => handleModalShow('delete', complaint)}
                                            >
                                                <FaTrash /> Delete
                                            </Button>
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

export default ComplaintActionPage;




// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Container, Row, Col, Button, Table, Image } from 'react-bootstrap';
// import CircularProgress from '@mui/material/CircularProgress';
// import { ToastContainer, toast } from 'react-toastify';
// import { addComplaint, deleteComplaint, fetchComplaintsData, updateComplaint } from '../../../features/complaint/complaintSlice';
// import ComplaintModal from '../components/modal/complaintModal';

// const ComplaintActionPage = () => {
//     const dispatch = useDispatch();
//     const { complaints, loading, error } = useSelector((state) => state.complaints);
//     const [modalShow, setModalShow] = useState(false);
//     const [modalAction, setModalAction] = useState('');
//     const [modalData, setModalData] = useState({});

//     useEffect(() => {
//         dispatch(fetchComplaintsData());
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
//                     <h1 className="m-0">Complaints</h1>
//                 </Col>
//                 <Col className="text-end">
//                     <Button variant="primary" onClick={() => handleModalShow('add')}>Add Complaint</Button>
//                 </Col>
//             </Row>

//             <Row>
//                 <Col>
//                     {loading ? (
//                         <CircularProgress />
//                     ) : error ? (
//                         <div>Error: {error}</div>
//                     ) : (
//                         <Table striped bordered hover responsive>
//                             <thead>
//                                 <tr>
//                                     <th>No</th>
//                                     <th>Title</th>
//                                     <th>Description</th>
//                                     <th>Resolved</th>
//                                     <th>Proof Attachment</th>
//                                     <th>Actions</th>
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
//                                             {complaint.proofAttachment ? (
//                                                 <Image src={complaint.proofAttachment} thumbnail />
//                                             ) : (
//                                                 'No Attachment'
//                                             )}
//                                         </td>
//                                         <td>
//                                             <Button
//                                                 variant="warning"
//                                                 className="me-2"
//                                                 onClick={() => handleModalShow('update', complaint)}
//                                             >
//                                                 Edit
//                                             </Button>
//                                             <Button
//                                                 variant="danger"
//                                                 onClick={() => handleModalShow('delete', complaint)}
//                                             >
//                                                 Delete
//                                             </Button>
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

// export default ComplaintActionPage;