import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ActionModal = ({ show, handleClose, actionType, data, handleSubmit }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const onSubmit = () => {
        handleSubmit(formData);
    };

    const renderModalBody = () => {
        switch (actionType) {
            case 'add':
            case 'update':
                return (
                    <>
                        <Form.Group controlId="formHouseNo">
                            <Form.Label>House No</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter house number"
                                name="houseNo"
                                value={formData.houseNo || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formHouseType" className="mt-2">
                            <Form.Label>House Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter house type"
                                name="houseType"
                                value={formData.houseType || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formHouseSellPrice" className="mt-2">
                            <Form.Label>House Sell Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter sell price"
                                name="houseSellPrice"
                                value={formData.houseSellPrice || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formHouseOnRateMoney" className="mt-2">
                            <Form.Label>House Rant Money</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter rent money"
                                name="houseOnRantMoney"
                                value={formData.houseOnRantMoney || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formHouseOnSale" className="mt-2">
                            <Form.Label>House On Sale</Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="On Sale"
                                name="houseOnSale"
                                checked={formData.houseOnSale || false}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formHouseFloorCount" className="mt-2">
                            <Form.Label>House Floor Count</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter floor count"
                                name="houseFloorCount"
                                value={formData.houseFloorCount || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formHouseOwnerUserId" className="mt-2">
                            <Form.Label>House Owner User ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter owner user ID"
                                name="houseOwnerUserId"
                                value={formData.houseOwnerUserId || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formHouseOnRentTenantId" className="mt-2">
                            <Form.Label>House On Rent Tenant ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter tenant ID"
                                name="houseOnRentTenantId"
                                value={formData.houseOnRentTenantId || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </>
                );
            case 'view':
                return (
                    <>
                        <p><strong>House No:</strong> {data.houseNo}</p>
                        <p><strong>House Type:</strong> {data.houseType}</p>
                        <p><strong>House Sell Price:</strong> {data.houseSellPrice}</p>
                        <p><strong>House Rant Money:</strong> {data.houseOnRantMoney}</p>
                        <p><strong>House On Sale:</strong> {data.houseOnSale ? 'Yes' : 'No'}</p>
                        <p><strong>House Floor Count:</strong> {data.houseFloorCount}</p>
                        <p><strong>House Owner User ID:</strong> {data.houseOwnerUserId}</p>
                        <p><strong>House On Rent Tenant ID:</strong> {data.houseOnRentTenantId}</p>
                    </>
                );
            case 'delete':
                return (
                    <p>Are you sure you want to delete the house with details: {data.houseNo}, {data.houseType}, {data.houseSellPrice}?</p>
                );
            default:
                return null;
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {actionType === 'add' ? 'Add House' :
                        actionType === 'update' ? 'Update House' :
                            actionType === 'view' ? 'View House' : 'Delete House'}
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

export default ActionModal;