import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

const UserActionModal = ({ show, handleClose, actionType, data, handleSubmit }) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{actionType === 'add' ? 'Add User' : 'User Details'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex align-items-center mb-3">
                    {data.onCloudinaryLink && (
                        <Image
                            src={data.onCloudinaryLink}
                            roundedCircle
                            style={{ width: '100px', height: '100px', marginRight: '20px' }}
                        />
                    )}
                    <div>
                        <h5>{data.fullName}</h5>
                        <p>Email: {data.email}</p>
                    </div>
                </div>
                <div>
                    <p><strong>Contact No:</strong> {data.contactNo}</p>
                    <p><strong>User Type:</strong> {data.userType}</p>
                    <p><strong>Active:</strong> {data.isActive ? 'Yes' : 'No'}</p>
                    <p><strong>Access:</strong> {data.isAccess ? 'Yes' : 'No'}</p>
                    <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(data.updatedAt).toLocaleString()}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {actionType !== 'view' && (
                    <Button variant="primary" onClick={() => handleSubmit(data)}>
                        {actionType === 'add' ? 'Add User' : 'Update User'}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default UserActionModal;
