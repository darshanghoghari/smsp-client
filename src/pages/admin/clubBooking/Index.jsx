import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ClubBookingModal from '../components/modal/clubBookingModal';
import { addClubBooking, deleteClubBooking, fetchClubBooking, updateClubBooking } from '../../../features/clubBooking/clubBooking';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const ClubBookingActionPage = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [modalData, setModalData] = useState(null);
    const { loading, error, bookings } = useSelector((state) => state.clubBooking);

    useEffect(() => {
        dispatch(fetchClubBooking()); // Fetch all club bookings on component mount
    }, [dispatch]);

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
            dispatch(addClubBooking(formData)).then((newBooking) => {
                setModalData(newBooking); // Update modalData with newly added booking
                handleCloseModal();
            });
        } else if (modalMode === 'edit' && modalData) {
            dispatch(updateClubBooking({ bookingId: modalData._id, formData })).then(() => {
                setModalData(formData); // Update modalData with updated formData
                handleCloseModal();
                dispatch(fetchClubBooking());
            });
        }
    };

    const handleDeleteBooking = (bookingId) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            dispatch(deleteClubBooking(bookingId));
            dispatch(fetchClubBooking());
        }
    };

    return (
        <Container fluid className="p-3">
            {/* First Row */}
            <Row className="align-items-center mb-3">
                <Col>
                    <h1 className="m-0">Club Bookings</h1>
                </Col>
                <Col className="text-end">
                    <Button variant="btn btn-outline-dark" onClick={() => handleOpenModal('add')}><AddSharpIcon />Add Booking</Button>
                </Col>
            </Row>

            {/* Second Row - Club Bookings */}
            <Row>
                <Col>
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <Table bordered responsive>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>No</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }} >Date</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Title</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Description</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Rent</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(bookings && bookings.length > 0 && bookings !== null && bookings !== undefined) && bookings?.map((booking, index) => (
                                    <tr key={booking._id}>
                                        <td>{index + 1}</td>
                                        <td>{new Date(booking.clubBookingDate).toLocaleDateString()}</td>
                                        <td>{booking.clubBookingTitle}</td>
                                        <td>{booking.clubBookingDescription}</td>
                                        <td>{booking.clubBookingRequestRent}</td>
                                        <td className='d-flex justify-content-around'>
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
                bookingData={modalData} // Pass updated modalData to the modal
            />
        </Container>
    );
};

export default ClubBookingActionPage;






// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Container, Row, Col, Button, Table, Image } from 'react-bootstrap';
// import CircularProgress from '@mui/material/CircularProgress';
// import { ToastContainer, toast } from 'react-toastify';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import ClubBookingModal from '../components/modal/clubBookingModal';
// import { addClubBooking, deleteClubBooking, fetchClubBooking, updateClubBooking } from '../../../features/clubBooking/clubBooking';
// import AddSharpIcon from '@mui/icons-material/AddSharp';

// const ClubBookingActionPage = () => {
//     const dispatch = useDispatch();
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalMode, setModalMode] = useState('add');
//     const [modalData, setModalData] = useState(null);
//     const { loading, error, bookings } = useSelector((state) => state.clubBooking);

//     useEffect(() => {
//         dispatch(fetchClubBooking()); // Fetch all club bookings on component mount
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
//                     <Button variant="btn btn-outline-dark" onClick={() => handleOpenModal('add')}><AddSharpIcon />Add Booking</Button>
//                 </Col>
//             </Row>

//             {/* Second Row - Club Bookings */}
//             <Row>
//                 <Col>
//                     {loading ? (
//                         <CircularProgress />
//                     ) : error ? (
//                         <p>Error: {error}</p>
//                     ) : (
//                         <Table bordered responsive>
//                             <thead>
//                                 <tr>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>No</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }} >Date</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Title</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Description</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Rent</th>
//                                     <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Actions</th>
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
//                                         <td className='d-flex justify-content-around'>
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

// export default ClubBookingActionPage;
