// MeetingModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const MeetingModal = ({ show, handleClose, actionType, data, handleSubmit }) => {
    const [formData, setFormData] = useState({
        meetingDate: '',
        meetingTitle: '',
        meetingDescription: '',
        meetingTime: '',
    });

    // Update form data when data prop changes (for view and update)
    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    const renderModalBody = () => {
        switch (actionType) {
            case 'add':
            case 'update':
                return (
                    <>
                        <Form.Group controlId="formMeetingDate">
                            <Form.Label>Meeting Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="meetingDate"
                                value={formData.meetingDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formMeetingTime" className="mt-2">
                            <Form.Label>Meeting Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="meetingTime"
                                value={formData.meetingTime}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formMeetingTitle" className="mt-2">
                            <Form.Label>Meeting Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                name="meetingTitle"
                                value={formData.meetingTitle}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formMeetingDescription" className="mt-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter description"
                                name="meetingDescription"
                                value={formData.meetingDescription}
                                onChange={handleChange}
                                rows={4}
                                required
                            />
                        </Form.Group>
                        {actionType === 'update' && (
                            <Form.Group controlId="formMeetingId" className="mt-2">
                                <Form.Control type="hidden" name="_id" value={formData._id} />
                            </Form.Group>
                        )}
                    </>
                );
            case 'view':
                return (
                    <>
                        <p><strong>Meeting Date:</strong> {formData.meetingDate}</p>
                        <p><strong>Meeting Time:</strong> {formData.meetingTime}</p>
                        <p><strong>Title:</strong> {formData.meetingTitle}</p>
                        <p><strong>Description:</strong> {formData.meetingDescription}</p>
                    </>
                );
            case 'delete':
                return (
                    <p>Are you sure you want to delete the meeting with title: {data.meetingTitle}?</p>
                );
            default:
                return null;
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {actionType === 'add' ? 'Add Meeting' :
                        actionType === 'update' ? 'Update Meeting' :
                            actionType === 'view' ? 'View Meeting' : 'Delete Meeting'}
                </Modal.Title>
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

export default MeetingModal;




// // MeetingModal.js
// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// const MeetingModal = ({ show, handleClose, actionType, data, handleSubmit }) => {
//     const [formData, setFormData] = useState({
//         meetingDate: '',
//         meetingTitle: '',
//         meetingDescription: '',
//         meetingTime: '',
//     });

//     // Update form data when data prop changes (for view and update)
//     React.useEffect(() => {
//         setFormData(data);
//     }, [data]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const onSubmit = (e) => {
//         e.preventDefault();
//         handleSubmit(formData);
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>
//                     Meeting {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 {actionType !== 'delete' && (
//                     <Form onSubmit={onSubmit}>
//                         <Form.Group controlId="formMeetingDate">
//                             <Form.Label>Meeting Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 name="meetingDate"
//                                 value={formData.meetingDate}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formMeetingTitle">
//                             <Form.Label>Meeting Title</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter title"
//                                 name="meetingTitle"
//                                 value={formData.meetingTitle}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formMeetingDescription">
//                             <Form.Label>Description</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 placeholder="Enter description"
//                                 name="meetingDescription"
//                                 value={formData.meetingDescription}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formMeetingTime">
//                             <Form.Label>Meeting Time</Form.Label>
//                             <Form.Control
//                                 type="time"
//                                 name="meetingTime"
//                                 value={formData.meetingTime}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         {actionType === 'update' && (
//                             <Form.Group controlId="formMeetingId">
//                                 <Form.Control
//                                     type="hidden"
//                                     name="_id"
//                                     value={formData._id}
//                                 />
//                             </Form.Group>
//                         )}
//                         <Button variant="primary" type="submit">
//                             {actionType === 'delete' ? 'Delete' : 'Submit'}
//                         </Button>
//                     </Form>
//                 )}

//                 {actionType === 'view' && (
//                     <>
//                         <p><strong>Meeting Date:</strong> {formData.meetingDate}</p>
//                         <p><strong>Title:</strong> {formData.meetingTitle}</p>
//                         <p><strong>Description:</strong> {formData.meetingDescription}</p>
//                         <p><strong>Time:</strong> {formData.meetingTime}</p>
//                     </>
//                 )}
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                     Close
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default MeetingModal;