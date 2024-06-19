import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ClubBookingModal from '../components/modal/clubBookingModal';
import { addClubBooking, deleteClubBooking, fetchClubBooking, updateClubBooking } from '../../../features/clubBooking/clubBooking';

const OwnerClubBookingActionPage = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [modalData, setModalData] = useState(null);
    const { loading, error, bookings } = useSelector((state) => state.clubBooking);

    useEffect(() => {
        dispatch(fetchClubBooking());
    }, [dispatch]);

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    const handleOpenModal = (mode, data = null) => {
        setIsModalOpen(true);
        setModalMode(mode);
        setModalData(data);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalMode('add');
        setModalData(null);
    };

    const handleSaveBooking = (formData) => {
        if (modalMode === 'add') {
            dispatch(addClubBooking(formData)).then(() => {
                handleCloseModal();
            });
        } else if (modalMode === 'edit' && modalData) {
            dispatch(updateClubBooking({ bookingId: modalData._id, formData })).then(() => {
                handleCloseModal();
            });
        }
    };

    const handleDeleteBooking = (bookingId) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            dispatch(deleteClubBooking(bookingId));
        }
    };

    // Filter bookings based on userId
    const filteredBookings = bookings.filter(booking => booking.userId === userData._id);

    return (
        <Container fluid className="p-3">
            {/* First Row */}
            <Row className="align-items-center mb-3">
                <Col>
                    <h1 className="m-0">Club Bookings</h1>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={() => handleOpenModal('add')}>Add Booking</Button>
                </Col>
            </Row>

            {/* Second Row - Club Bookings */}
            <Row>
                <Col>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Date</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Rent</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking, index) => (
                                    <tr key={booking._id}>
                                        <td>{index + 1}</td>
                                        <td>{new Date(booking.clubBookingDate).toLocaleDateString()}</td>
                                        <td>{booking.clubBookingTitle}</td>
                                        <td>{booking.clubBookingDescription}</td>
                                        <td>{booking.clubBookingRequestRent}</td>
                                        <td>
                                            <Button variant="outline-primary" size="sm" onClick={() => handleOpenModal('edit', booking)}>
                                                <FaEdit /> Edit
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteBooking(booking._id)}>
                                                <FaTrash /> Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>

            {/* Club Booking Modal */}
            <ClubBookingModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveBooking}
                bookingData={modalData}
            />
        </Container>
    );
};

export default OwnerClubBookingActionPage;





// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Container, Row, Col, Button, Table, Image } from 'react-bootstrap';
// import CircularProgress from '@mui/material/CircularProgress';
// import { ToastContainer, toast } from 'react-toastify';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import styled from 'styled-components';
// import ClubBookingModal from '../components/modal/clubBookingModal';
// import { addClubBooking, deleteClubBooking, fetchClubBooking, updateClubBooking } from '../../../features/clubBooking/clubBooking';

// const OwnerClubBookingActionPage = () => {
//     const dispatch = useDispatch();
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalMode, setModalMode] = useState('add');
//     const [modalData, setModalData] = useState(null);
//     const { loading, error, bookings } = useSelector((state) => state.clubBooking);
//     const [clubBooking, setClubBooking] = useState(null);
//     useEffect(() => {
//         dispatch(fetchClubBooking());

//         setClubBooking(bookings);
//     }, [dispatch]);

//     const handleOpenModal = (mode, data = null) => {
//         setIsModalOpen(true);
//         setModalMode(mode);
//         setModalData(data);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setModalMode('add');
//         setModalData(null);
//     };

//     const handleSaveBooking = (formData) => {
//         if (modalMode === 'add') {
//             dispatch(addClubBooking(formData)).then(() => {
//                 handleCloseModal();
//             });
//         } else if (modalMode === 'edit' && modalData) {
//             dispatch(updateClubBooking({ bookingId: modalData._id, formData })).then(() => {
//                 handleCloseModal();
//             });
//         }
//     };

//     const handleDeleteBooking = (bookingId) => {
//         if (window.confirm('Are you sure you want to delete this booking?')) {
//             dispatch(deleteClubBooking(bookingId));
//         }
//     };

//     return (
//         <Container fluid className="p-3">
//             {/* First Row */}
//             <Row className="align-items-center mb-3">
//                 <Col>
//                     <h1 className="m-0">Club Bookings</h1>
//                 </Col>
//                 <Col className="text-end">
//                     <Button variant="primary" onClick={() => handleOpenModal('add')}>Add Booking</Button>
//                 </Col>
//             </Row>

//             {/* Second Row - Club Bookings */}
//             <Row>
//                 <Col>
//                     {loading ? (
//                         <p>Loading...</p>
//                     ) : error ? (
//                         <p>Error: {error}</p>
//                     ) : (
//                         <Table striped bordered hover responsive>
//                             <thead>
//                                 <tr>
//                                     <th>No</th>
//                                     <th>Date</th>
//                                     <th>Title</th>
//                                     <th>Description</th>
//                                     <th>Rent</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {(bookings && bookings.length > 0 && bookings !== null && bookings !== undefined) && bookings?.map((booking, index) => (
//                                     <tr key={booking._id}>
//                                         <td>{index + 1}</td>
//                                         <td>{new Date(booking.clubBookingDate).toLocaleDateString()}</td>
//                                         <td>{booking.clubBookingTitle}</td>
//                                         <td>{booking.clubBookingDescription}</td>
//                                         <td>{booking.clubBookingRequestRent}</td>
//                                         <td>
//                                             <Button variant="outline-primary" size="sm" onClick={() => handleOpenModal('edit', booking)}>
//                                                 <FaEdit /> Edit
//                                             </Button>
//                                             <Button variant="outline-danger" size="sm" onClick={() => handleDeleteBooking(booking._id)}>
//                                                 <FaTrash /> Delete
//                                             </Button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     )}
//                 </Col>
//             </Row>

//             {/* Club Booking Modal */}
//             <ClubBookingModal
//                 isOpen={isModalOpen}
//                 onClose={handleCloseModal}
//                 onSave={handleSaveBooking}
//                 bookingData={modalData}
//             />
//         </Container>
//     );
// };

// export default OwnerClubBookingActionPage;
