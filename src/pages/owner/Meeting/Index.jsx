// MeetingAction.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { AddSharp as AddSharpIcon } from '@mui/icons-material';
import { addMeeting, deleteMeeting, fetchMeetings, updateMeeting } from '../../../features/meeting/meeting';
import MeetingModal from '../components/modal/meetingModal';

const OwnerMeetingAction = () => {
    const dispatch = useDispatch();
    const { meetings, loading, error } = useSelector((state) => state.meeting);
    const [modalShow, setModalShow] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [modalData, setModalData] = useState({});
    const [meetingData, setMeetingData] = useState(null);

    useEffect(() => {
        dispatch(fetchMeetings());
    }, [dispatch]);

    useEffect(() => {
        setMeetingData(meetings);
    }, [meetings]);

    const handleModalShow = (actionType, data = {}) => {
        setModalAction(actionType);
        setModalData(data);
        setModalShow(true);
    };

    const handleModalClose = () => setModalShow(false);

    const handleModalSubmit = async (formData) => {
        try {
            if (modalAction === 'add') {
                await dispatch(addMeeting(formData)).unwrap();
                toast.success('Meeting added successfully.');
            } else if (modalAction === 'update') {
                await dispatch(updateMeeting(formData)).unwrap();
                toast.success('Meeting updated successfully.');
            } else if (modalAction === 'delete') {
                await dispatch(deleteMeeting(formData._id)).unwrap();
                toast.success('Meeting deleted successfully.');
            }

            // After successful add, update, or delete, fetch the updated data
            dispatch(fetchMeetings());
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
                    <h4 className="m-0">Meeting Details</h4>
                </Col>
            </Row>

            {/* Second Row */}
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
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Meeting Date</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Title</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Description</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Time</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {meetingData && meetingData?.map((meeting, index) => (
                                    <tr key={meeting._id}>
                                        <td>{index + 1}</td>
                                        <td>{meeting.meetingDate}</td>
                                        <td>{meeting.meetingTitle}</td>
                                        <td>{meeting.meetingDescription}</td>
                                        <td>{meeting.meetingTime}</td>
                                        <td>
                                            <Button
                                                variant="outline-success"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleModalShow('view', meeting)}
                                            >
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>

            {/* Action Modal */}
            <MeetingModal
                show={modalShow}
                handleClose={handleModalClose}
                actionType={modalAction}
                data={modalData}
                handleSubmit={handleModalSubmit}
            />
        </Container>
    );
};

export default OwnerMeetingAction;
