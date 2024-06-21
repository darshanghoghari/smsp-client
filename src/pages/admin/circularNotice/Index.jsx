import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Table, Image } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import CircularNoticeModal from '../components/modal/circularModal';
import { fetchCircularNotices, updateCircularNotice, deleteCircularNotice, addCircularNotice } from '../../../features/circularNotice/circularSlice';
import { FaEdit, FaRegEye, FaTrash } from 'react-icons/fa';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const CircularNotice = () => {
    const dispatch = useDispatch();
    const { circularNotices, loading, error } = useSelector((state) => state.circularNotice);
    const [modalShow, setModalShow] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        dispatch(fetchCircularNotices());
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
                await dispatch(addCircularNotice(formData));
                toast.success('Circular Notice added successfully.');
            } else if (modalAction === 'update') {

                const id = formData.get('_id');
                formData.delete('_id');
                await dispatch(updateCircularNotice({ id, circularData: formData }));
                toast.success('Circular Notice updated successfully.');
            } else if (modalAction === 'delete') {
                await dispatch(deleteCircularNotice(modalData._id));
                toast.success('Circular Notice deleted successfully.');
            }

            await dispatch(fetchCircularNotices());
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
                    <h1 className="m-0">Circular Notices</h1>
                </Col>
                <Col className="text-end">
                    <Button variant="btn btn-outline-dark" onClick={() => handleModalShow('add')}><AddSharpIcon /> Add Circular Notice</Button>
                </Col>
            </Row>

            {/* Second Row - Circular Notices */}
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
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Release Date</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Image</th>
                                    <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(circularNotices && circularNotices.length > 0) ? circularNotices.map((notice, index) => (
                                    <tr key={notice._id}>
                                        <td>{index + 1}</td>
                                        <td>{notice.circularNoticeTitle}</td>
                                        <td>{notice.circularNoticeDescription}</td>
                                        <td>{notice.circularNoticeReleaseDate}</td>
                                        <td>
                                            {notice.onCloudinaryLink && (
                                                <Image src={notice.onCloudinaryLink} rounded style={{ width: '50px', height: '50px' }} />
                                            )}
                                        </td>
                                        <td className='d-flex justify-content-around'>
                                            <Button variant="btn btn-outline-success" size="sm" onClick={() => handleModalShow('view', notice)}><FaRegEye /> View</Button>
                                            <Button variant="btn btn-outline-dark" size="sm" onClick={() => handleModalShow('update', notice)}><FaEdit /> Edit</Button>
                                            <Button variant="btn btn-outline-danger" size="sm" onClick={() => handleModalShow('delete', notice)}><FaTrash /> Delete</Button>
                                        </td>
                                    </tr>
                                )) : "No Circular Notices Found"}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>

            {/* Action Modal */}
            <CircularNoticeModal
                show={modalShow}
                handleClose={handleModalClose}
                actionType={modalAction}
                data={modalData}
                handleSubmit={handleModalSubmit}
            />
        </Container>
    );
};

export default CircularNotice;

