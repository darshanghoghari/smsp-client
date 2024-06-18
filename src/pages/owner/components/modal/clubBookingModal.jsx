import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';

const ClubBookingModal = ({ isOpen, onClose, onSave, bookingData }) => {
    const [formData, setFormData] = useState({
        clubBookingDate: bookingData?.clubBookingDate || '',
        clubBookingTitle: bookingData?.clubBookingTitle || '',
        clubBookingDescription: bookingData?.clubBookingDescription || '',
        clubBookingRequestRent: bookingData?.clubBookingRequestRent || 0,
        clubBookingNoteByAdmin: bookingData?.clubBookingNoteByAdmin || '',
        isBooked: bookingData?.isBooked || false,
        alternativeDate: bookingData?.alternativeDate || null,
    });

    // Update form data if bookingData changes (e.g., when editing)
    useEffect(() => {
        setFormData({
            clubBookingDate: bookingData?.clubBookingDate || '',
            clubBookingTitle: bookingData?.clubBookingTitle || '',
            clubBookingDescription: bookingData?.clubBookingDescription || '',
            clubBookingRequestRent: bookingData?.clubBookingRequestRent || 0,
            clubBookingNoteByAdmin: bookingData?.clubBookingNoteByAdmin || '',
            isBooked: bookingData?.isBooked || false,
            alternativeDate: bookingData?.alternativeDate || null,
        });
    }, [bookingData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Club Booking {bookingData ? 'Update' : 'Add'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="clubBookingDate">
                        <Form.Label>Club Booking Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="clubBookingDate"
                            value={formData.clubBookingDate}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="clubBookingTitle">
                        <Form.Label>Club Booking Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="clubBookingTitle"
                            value={formData.clubBookingTitle}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="clubBookingDescription">
                        <Form.Label>Club Booking Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="clubBookingDescription"
                            value={formData.clubBookingDescription}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="clubBookingRequestRent">
                        <Form.Label>Requested Rent</Form.Label>
                        <Form.Control
                            type="number"
                            name="clubBookingRequestRent"
                            value={formData.clubBookingRequestRent}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="clubBookingNoteByAdmin">
                        <Form.Label>Note by Admin</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="clubBookingNoteByAdmin"
                            value={formData.clubBookingNoteByAdmin}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="isBooked">
                        <Form.Check
                            type="checkbox"
                            label="Is Booked"
                            name="isBooked"
                            checked={formData.isBooked}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="alternativeDate">
                        <Form.Label>Alternative Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="alternativeDate"
                            value={formData.alternativeDate}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <SubmitButton type="submit">Save Booking</SubmitButton>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

const SubmitButton = styled(Button)`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export default ClubBookingModal;
