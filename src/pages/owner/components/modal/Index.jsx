import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BsChevronDown } from 'react-icons/bs';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
    position: relative;
    width: 100%;
    border: 0.5px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    padding: 0.5rem;
`;

const Select = styled(Form.Control)`
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    padding-right: 2rem; /* Adjust as needed */
`;

const DropdownIcon = styled(BsChevronDown)`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
`;

const ActionModal = ({ show, handleClose, data, handleSubmit }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;
        if (name === 'houseFloorCount') {
            newValue = Math.max(1, Math.min(3, Number(value)));
        }
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : newValue,
        });
    };

    const onSubmit = () => {
        handleSubmit(formData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update House</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formHouseNo">
                        <Form.Label>House No</Form.Label><br />
                        <Form.Label className='border border-1 p-2 w-100'>{formData.houseNo}</Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formHouseType" className="mt-2">
                        <Form.Label>House Type</Form.Label>
                        <DropdownWrapper>
                            <Select
                                as="select"
                                name="houseType"
                                value={formData.houseType || ''}
                                onChange={handleChange}
                                style={{ border: 'none' }}
                            >
                                <option value="1BHK">1BHK</option>
                                <option value="2BHK">2BHK</option>
                                <option value="3BHK">3BHK</option>
                            </Select>
                            <DropdownIcon />
                        </DropdownWrapper>
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
                            type="number"
                            placeholder="Enter floor count"
                            name="houseFloorCount"
                            value={formData.houseFloorCount || ''}
                            onChange={handleChange}
                            min="1"
                            max="3"
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ActionModal;
