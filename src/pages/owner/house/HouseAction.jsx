import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchSingleHomeData, addHomeData, updateHomeData, deleteHomeData } from '../../../features/home/homeSlice';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ActionModal from '../components/modal/Index';
// import ActionModal from '../components/modal/Index';
// import HouseDetailsModal from '../components/HouseDetailsModal';

const OwnerHouseAction = () => {
  const dispatch = useDispatch();
  const { singleHome, loading, error } = useSelector((state) => state.house);
  const [modalShow, setModalShow] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [modalData, setModalData] = useState({});
  const [viewHouse, setViewHouse] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleHomeData());
  }, [dispatch]);

  const handleModalShow = (actionType, data = {}) => {
    setModalAction(actionType);
    setModalData(data);
    if (actionType === 'view') {
      setViewHouse(data);
    } else {
      setModalShow(true);
    }
  };

  const handleModalClose = () => {
    setModalShow(false);
    setViewHouse(null);
  };

  const handleModalSubmit = async (data) => {
    try {
      if (modalAction === 'add') {
        await dispatch(addHomeData(data)).unwrap();
        toast.success('House added successfully.');
      } else if (modalAction === 'update') {
        await dispatch(updateHomeData(data)).unwrap();
        toast.success('House updated successfully.');
      } else if (modalAction === 'delete') {
        await dispatch(deleteHomeData(data._id)).unwrap();
        toast.success('House deleted successfully.');
      }

      // After successful add, update, or delete, fetch the updated data
      dispatch(fetchSingleHomeData());
      setModalShow(false);
    } catch (error) {
      toast.error('Failed to perform action.');
    }
  };

  return (
    <Container fluid className="p-3">
      <ToastContainer />

      {/* House Details */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        singleHome && (
          <Card className="mb-3">
            <Card.Header as="h5" className="text-center w-100">House Details</Card.Header>
            <Card.Body>
              <Row className="mb-2">
                <Col xs={4}><strong>House No:</strong></Col>
                <Col xs={8}>{singleHome.houseNo}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}><strong>Type:</strong></Col>
                <Col xs={8}>{singleHome.houseType}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}><strong>Sell Price:</strong></Col>
                <Col xs={8}>{singleHome.houseSellPrice ? singleHome.houseSellPrice : 0}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}><strong>Floor Count:</strong></Col>
                <Col xs={8}>{singleHome.houseFloorCount ? singleHome.houseFloorCount : 0}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}><strong>Rate Money:</strong></Col>
                <Col xs={8}>{singleHome.houseOnRantMoney ? singleHome.houseOnRantMoney : 0}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}><strong>On Sale:</strong></Col>
                <Col xs={8}>{singleHome.houseOnSale ? 'Yes' : 'No'}</Col>
              </Row>
              <Row className="mt-3">
                <Col className='text-end'>
                  <Button variant="btn btn-outline-primary" className="me-2" onClick={() => handleModalShow('update', singleHome)}>Update</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )
      )}

      {/* Action Modal */}
      {/* Uncomment and use this when you have ActionModal component */}
      <ActionModal
        show={modalShow}
        handleClose={handleModalClose}
        actionType={modalAction}
        data={modalData}
        handleSubmit={handleModalSubmit}
      />

      {/* House Details Modal */}
      {/* Uncomment and use this when you have HouseDetailsModal component */}
      {/* <HouseDetailsModal
        show={!!viewHouse}
        handleClose={handleModalClose}
        house={viewHouse}
      /> */}
    </Container>
  );
};

export default OwnerHouseAction;
