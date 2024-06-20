import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import ClubBookingModal from '../components/modal/clubBookingModal';
import { addClubBooking, deleteClubBooking, fetchClubBooking, updateClubBooking } from '../../../features/clubBooking/clubBooking';

const OwnerClubBookingActionPage = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [modalData, setModalData] = useState(null);
    const { loading, error, bookings } = useSelector((state) => state.clubBooking);
    const [filteredBookings, setFilteredBookings] = useState([]);

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        dispatch(fetchClubBooking());
    }, [dispatch]);

    useEffect(() => {
        if (bookings && Array.isArray(bookings) && userData) {
            const filterData = bookings.filter(booking => booking.userId === userData._id);
            setFilteredBookings(filterData);
        }
    }, [bookings, userData]);

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
                dispatch(fetchClubBooking());
                handleCloseModal();
            });
        } else if (modalMode === 'edit' && modalData) {
            dispatch(updateClubBooking({ bookingId: modalData._id, formData })).then(() => {
                dispatch(fetchClubBooking());
                handleCloseModal();
            });
        }
    };

    const handleDeleteBooking = (bookingId) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            dispatch(deleteClubBooking(bookingId)).then(() => {
                dispatch(fetchClubBooking());
            });
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
                                {filteredBookings && filteredBookings.map((booking, index) => (
                                    <tr key={booking._id}>
                                        <td>{index + 1}</td>
                                        <td>{new Date(booking.clubBookingDate).toLocaleDateString()}</td>
                                        <td>{booking.clubBookingTitle}</td>
                                        <td>{booking.clubBookingDescription}</td>
                                        <td>{booking.clubBookingRequestRent}</td>
                                        <td>
                                            <Button variant="outline-primary" size="sm" onClick={() => handleOpenModal('view', booking)}>
                                                <FaEye /> View
                                            </Button>
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
                mode={modalMode}  // Pass the mode to the modal
            />
        </Container>
    );
};

export default OwnerClubBookingActionPage;
