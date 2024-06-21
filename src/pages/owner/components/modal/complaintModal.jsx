import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';

const ComplaintModal = ({ show, handleClose, action, data, handleSubmit }) => {
    const [formData, setFormData] = useState({});
    const [proofFile, setProofFile] = useState(null);

    useEffect(() => {
        setFormData({
            ...data,
            isResolved: data.isResolved || false, // Ensure isResolved is set to a boolean
        });
    }, [data]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        setProofFile(e.target.files[0]);
    };

    const onSubmit = () => {
        const submitData = new FormData();
        if (action === 'update') {
            submitData.append('_id', formData._id);
        }
        submitData.append('complainTitle', formData.complainTitle);
        submitData.append('complainDescription', formData.complainDescription);

        if (proofFile) {
            submitData.append('proofAttachment', proofFile);
        }

        handleSubmit(submitData);
    };

    const renderModalBody = () => {
        switch (action) {
            case 'add':
            case 'update':
                return (
                    <>
                        <Form.Group controlId="formComplainTitle">
                            <Form.Label>Complain Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                name="complainTitle"
                                value={formData.complainTitle || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formComplainDescription" className="mt-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter description"
                                name="complainDescription"
                                value={formData.complainDescription || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formProofAttachment" className="mt-2">
                            <Form.Label>Proof Attachment</Form.Label>
                            <Form.Control
                                type="file"
                                name="proofAttachment"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                    </>
                );
            case 'view':
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
                                <h5>Title:-{data.complainTitle}</h5>
                                <p><strong>Description:</strong> {data.complainDescription}</p>
                                <p><strong>Resolved:</strong> {data.isResolved ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </>
                );
            case 'delete':
                return (
                    <p>Are you sure you want to delete the complaint titled: {data.complainTitle}?</p>
                );
            default:
                return null;
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {action === 'add' ? 'Add Complaint' :
                        action === 'update' ? 'Update Complaint' :
                            action === 'view' ? 'View Complaint' : 'Delete Complaint'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {renderModalBody()}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {action === 'view' ? 'Close' : 'Cancel'}
                </Button>
                {action !== 'view' && (
                    <Button variant={action === 'delete' ? 'danger' : 'primary'} onClick={onSubmit}>
                        {action === 'delete' ? 'Delete' : 'Save'}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ComplaintModal;




// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form, Image } from 'react-bootstrap';

// const ComplaintModal = ({ show, handleClose, action, data, handleSubmit }) => {
//     const [formData, setFormData] = useState({});
//     const [proofFile, setProofFile] = useState(null);

//     useEffect(() => {
//         setFormData(data);
//     }, [data]);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value,
//         });
//     };

//     const handleFileChange = (e) => {
//         setProofFile(e.target.files[0]);
//     };

//     const onSubmit = () => {
//         const submitData = new FormData();
//         if (action === 'update') {
//             submitData.append('_id', formData._id);
//         }
//         submitData.append('complainTitle', formData.complainTitle);
//         submitData.append('complainDescription', formData.complainDescription);
//         submitData.append('isResolved', formData.isResolved);

//         if (proofFile) {
//             submitData.append('proofAttachment', proofFile);
//         }

//         handleSubmit(submitData);
//     };

//     const renderModalBody = () => {
//         switch (action) {
//             case 'add':
//             case 'update':
//                 return (
//                     <>
//                         <Form.Group controlId="formComplainTitle">
//                             <Form.Label>Complain Title</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter title"
//                                 name="complainTitle"
//                                 value={formData.complainTitle || ''}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formComplainDescription" className="mt-2">
//                             <Form.Label>Description</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 placeholder="Enter description"
//                                 name="complainDescription"
//                                 value={formData.complainDescription || ''}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formIsResolved" className="mt-2">
//                             <Form.Check
//                                 type="checkbox"
//                                 label="Resolved"
//                                 name="isResolved"
//                                 checked={formData.isResolved || false}
//                                 onChange={(e) => setFormData({ ...formData, isResolved: e.target.checked })}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formProofAttachment" className="mt-2">
//                             <Form.Label>Proof Attachment</Form.Label>
//                             <Form.Control
//                                 type="file"
//                                 name="proofAttachment"
//                                 onChange={handleFileChange}
//                             />
//                         </Form.Group>
//                     </>
//                 );
//             case 'view':
//                 return (
//                     <>
//                         <div className="d-flex align-items-center mb-3">
//                             {data.proofAttachment && (
//                                 <Image
//                                     src={data.proofAttachment}
//                                     rounded
//                                     style={{ width: '100px', height: '100px', marginRight: '20px' }}
//                                 />
//                             )}
//                             <div>
//                                 <h5>{data.complainTitle}</h5>
//                                 <p><strong>Description:</strong> {data.complainDescription}</p>
//                                 <p><strong>Resolved:</strong> {data.isResolved ? 'Yes' : 'No'}</p>
//                             </div>
//                         </div>
//                     </>
//                 );
//             case 'delete':
//                 return (
//                     <p>Are you sure you want to delete the complaint titled: {data.complainTitle}?</p>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>
//                     {action === 'add' ? 'Add Complaint' :
//                         action === 'update' ? 'Update Complaint' :
//                             action === 'view' ? 'View Complaint' : 'Delete Complaint'}
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     {renderModalBody()}
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                     {action === 'view' ? 'Close' : 'Cancel'}
//                 </Button>
//                 {action !== 'view' && (
//                     <Button variant={action === 'delete' ? 'danger' : 'primary'} onClick={onSubmit}>
//                         {action === 'delete' ? 'Delete' : 'Save'}
//                     </Button>
//                 )}
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default ComplaintModal;
