import React, { useState, useEffect } from 'react';
import { Modal, Button, Image, Form } from 'react-bootstrap';

const CircularNoticeModal = ({ show, handleClose, actionType, data, handleSubmit }) => {
    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const onSubmit = () => {
        const submitData = new FormData();
        if (actionType === 'update') {
            submitData.append('_id', formData._id);
        }
        submitData.append('circularNoticeTitle', formData.circularNoticeTitle);
        submitData.append('circularNoticeDescription', formData.circularNoticeDescription);
        submitData.append('circularNoticeReleaseDate', formData.circularNoticeReleaseDate);
        if (imageFile) {
            submitData.append('circularNoticeImage', imageFile);
        }

        handleSubmit(submitData);
    };

    const renderModalBody = () => {
        if (actionType === 'view' || actionType === 'delete') {
            return (
                <>
                    <div className="d-flex align-items-center mb-3">
                        {data.onCloudinaryLink && (
                            <Image
                                src={data.onCloudinaryLink}
                                rounded
                                style={{ width: '100px', height: '100px', marginRight: '20px' }}
                            />
                        )}
                        <div>
                            <h5>{data.circularNoticeTitle}</h5>
                            <p><strong>Description:</strong> {data.circularNoticeDescription}</p>
                            <p><strong>Release Date:</strong> {data.circularNoticeReleaseDate}</p>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <Form.Group controlId="formCircularNoticeTitle">
                        <Form.Label>Circular Notice Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            name="circularNoticeTitle"
                            value={formData.circularNoticeTitle || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCircularNoticeDescription" className="mt-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter description"
                            name="circularNoticeDescription"
                            value={formData.circularNoticeDescription || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCircularNoticeReleaseDate" className="mt-2">
                        <Form.Label>Release Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="circularNoticeReleaseDate"
                            value={formData.circularNoticeReleaseDate || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCircularNoticeImage" className="mt-2">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="circularNoticeImage"
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                </>
            );
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Circular Notice {actionType.charAt(0).toUpperCase() + actionType.slice(1)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {renderModalBody()}
            </Modal.Body>
            <Modal.Footer>
                {actionType === 'view' ? (
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                ) : (
                    <Button variant="primary" onClick={onSubmit}>
                        {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default CircularNoticeModal;