import React, { useState, useEffect } from 'react';
import { Modal, Button, Image, Form, Row, Col } from 'react-bootstrap';

const UserActionModal = ({ show, handleClose, actionType, data, handleSubmit }) => {
    const [formData, setFormData] = useState({});
    const [photoProof, setPhotoProof] = useState(null);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setPhotoProof(files[0]);
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };

    const onSubmit = () => {
        const formDataWithPhoto = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataWithPhoto.append(key, formData[key]);
        });
        if (photoProof) {
            formDataWithPhoto.append('photoProof', photoProof);
        }
        handleSubmit(formDataWithPhoto);
    };

    const renderModalBody = () => {
        if (actionType === 'view' || actionType === 'delete') {
            return (
                <>
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
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formFullName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter full name"
                                    name="fullName"
                                    value={formData.fullName || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formEmail" className="mt-2 mt-md-0">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formContactNo" className="mt-2">
                                <Form.Label>Contact No</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter contact number"
                                    name="contactNo"
                                    value={formData.contactNo || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formUserType" className="mt-2 mt-md-0">
                                <Form.Label>User Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="userType"
                                    value={formData.userType || 'User'}
                                    onChange={handleChange}
                                >
                                    <option>User</option>
                                    <option>Admin</option>
                                    <option>Tenant</option>
                                    <option>Owner</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formIsActive" className="mt-2">
                                <Form.Label>Active</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    label="Active"
                                    name="isActive"
                                    checked={formData.isActive || false}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formIsAccess" className="mt-2 mt-md-0">
                                <Form.Label>Access</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    label="Access"
                                    name="isAccess"
                                    checked={formData.isAccess || false}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formPhotoProof" className="mt-2">
                        <Form.Label>Photo Proof</Form.Label>
                        <Form.Control
                            type="file"
                            name="photoProof"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </>
            );
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{actionType === 'add' ? 'Add User' : actionType === 'update' ? 'Update User' : actionType === 'view' ? 'User Details' : 'Delete User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {renderModalBody()}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {actionType === 'view' ? 'Close' : 'Cancel'}
                </Button>
                {actionType !== 'view' && (
                    <Button variant={actionType === 'delete' ? 'danger' : 'primary'} onClick={onSubmit}>
                        {actionType === 'delete' ? 'Delete' : 'Save'}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default UserActionModal;







// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Image, Form } from 'react-bootstrap';

// const UserActionModal = ({ show, handleClose, actionType, data, handleSubmit }) => {
//     const [formData, setFormData] = useState({});
//     const [photoProof, setPhotoProof] = useState(null);

//     useEffect(() => {
//         setFormData(data);
//     }, [data]);

//     const handleChange = (e) => {
//         const { name, value, type, checked, files } = e.target;
//         if (type === 'file') {
//             setPhotoProof(files[0]);
//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: type === 'checkbox' ? checked : value,
//             });
//         }
//     };

//     const onSubmit = () => {
//         const formDataWithPhoto = new FormData();
//         Object.keys(formData).forEach((key) => {
//             formDataWithPhoto.append(key, formData[key]);
//         });
//         if (photoProof) {
//             formDataWithPhoto.append('photoProof', photoProof);
//         }
//         handleSubmit(formDataWithPhoto);
//     };

//     const renderModalBody = () => {
//         if (actionType === 'view' || actionType === 'delete') {
//             return (
//                 <>
//                     <div className="d-flex align-items-center mb-3">
//                         {data.onCloudinaryLink && (
//                             <Image
//                                 src={data.onCloudinaryLink}
//                                 roundedCircle
//                                 style={{ width: '100px', height: '100px', marginRight: '20px' }}
//                             />
//                         )}
//                         <div>
//                             <h5>{data.fullName}</h5>
//                             <p>Email: {data.email}</p>
//                         </div>
//                     </div>
//                     <div>
//                         <p><strong>Contact No:</strong> {data.contactNo}</p>
//                         <p><strong>User Type:</strong> {data.userType}</p>
//                         <p><strong>Active:</strong> {data.isActive ? 'Yes' : 'No'}</p>
//                         <p><strong>Access:</strong> {data.isAccess ? 'Yes' : 'No'}</p>
//                     </div>
//                 </>
//             );
//         } else {
//             return (
//                 <>
//                     <Form.Group controlId="formFullName">
//                         <Form.Label>Full Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter full name"
//                             name="fullName"
//                             value={formData.fullName || ''}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formEmail" className="mt-2">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Enter email"
//                             name="email"
//                             value={formData.email || ''}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formContactNo" className="mt-2">
//                         <Form.Label>Contact No</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter contact number"
//                             name="contactNo"
//                             value={formData.contactNo || ''}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formUserType" className="mt-2">
//                         <Form.Label>User Type</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter user type"
//                             name="userType"
//                             value={formData.userType || ''}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formIsActive" className="mt-2">
//                         <Form.Label>Active</Form.Label>
//                         <Form.Check
//                             type="checkbox"
//                             label="Active"
//                             name="isActive"
//                             checked={formData.isActive || false}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formIsAccess" className="mt-2">
//                         <Form.Label>Access</Form.Label>
//                         <Form.Check
//                             type="checkbox"
//                             label="Access"
//                             name="isAccess"
//                             checked={formData.isAccess || false}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formPhotoProof" className="mt-2">
//                         <Form.Label>Photo Proof</Form.Label>
//                         <Form.Control
//                             type="file"
//                             name="photoProof"
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </>
//             );
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
//             <Modal.Header closeButton>
//                 <Modal.Title>{actionType === 'add' ? 'Add User' : actionType === 'update' ? 'Update User' : actionType === 'view' ? 'User Details' : 'Delete User'}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     {renderModalBody()}
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                     {actionType === 'view' ? 'Close' : 'Cancel'}
//                 </Button>
//                 {actionType !== 'view' && (
//                     <Button variant={actionType === 'delete' ? 'danger' : 'primary'} onClick={onSubmit}>
//                         {actionType === 'delete' ? 'Delete' : 'Save'}
//                     </Button>
//                 )}
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default UserActionModal;
