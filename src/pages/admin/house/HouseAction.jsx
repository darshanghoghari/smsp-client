
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchHomeData, addHomeData, updateHomeData, deleteHomeData } from '../../../features/home/homeSlice';
import ActionModal from '../components/modal/Index';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const HouseAction = () => {
  const dispatch = useDispatch();
  const { home, loading, error } = useSelector((state) => state.house);
  const [modalShow, setModalShow] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [modalData, setModalData] = useState({});
  const [houseData, setHouseData] = useState(null);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  useEffect(() => {
    setHouseData(home?.data);
  }, [home]);

  const handleModalShow = (actionType, data = {}) => {
    setModalAction(actionType);
    setModalData(data);
    setModalShow(true);
  };

  const handleModalClose = () => setModalShow(false);

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
      dispatch(fetchHomeData());

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
          <h4 className="m-0 ">House Details</h4>
        </Col>
        <Col className="text-end">
          <Button variant="btn btn-outline-dark" onClick={() => handleModalShow('add')}><AddSharpIcon /> Add House Detail</Button>
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
            <Table bordered hover responsive >
              <thead >
                <tr >
                  <th style={{ backgroundColor: '#8c7569', color: 'white' }}>No</th>
                  <th style={{ backgroundColor: '#8c7569', color: 'white' }}>House No</th>
                  <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Type</th>
                  <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Sell Price</th>
                  <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Rate Money</th>
                  <th style={{ backgroundColor: '#8c7569', color: 'white' }}>On Sale</th>
                  <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Actions</th>
                </tr>
              </thead>
              <tbody >
                {houseData && houseData.map((house, index) => (
                  <tr key={house._id}>
                    <td>{index + 1}</td>
                    <td>{house.houseNo}</td>
                    <td>{house.houseType}</td>
                    <td>{house.houseSellPrice ? house.houseSellPrice : 0}</td>
                    <td>{house.houseOnRantMoney ? house.houseOnRantMoney : 0}</td>
                    <td>{house.houseOnSale ? 'Yes' : 'No'}</td>
                    <td>
                      <Button variant="btn btn-outline-success" size="sm" className="me-2" onClick={() => handleModalShow('view', house)}>View</Button>
                      <Button variant="btn btn-outline-dark" size="sm" className="me-2" onClick={() => handleModalShow('update', house)}>Update</Button>
                      <Button variant="btn btn-outline-danger" size="sm" onClick={() => handleModalShow('delete', house)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      {/* Action Modal */}
      <ActionModal
        show={modalShow}
        handleClose={handleModalClose}
        actionType={modalAction}
        data={modalData}
        handleSubmit={handleModalSubmit}
      />
    </Container>
  );
};

export default HouseAction;





// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Container, Row, Col, Button, Table } from 'react-bootstrap';
// import CircularProgress from '@mui/material/CircularProgress';
// import { ToastContainer, toast } from 'react-toastify';
// import { fetchHomeData, addHomeData, updateHomeData, deleteHomeData } from '../../../features/home/homeSlice';
// import ActionModal from '../components/modal/Index';
// import AddSharpIcon from '@mui/icons-material/AddSharp';

// const HouseAction = () => {
//   const dispatch = useDispatch();
//   const { home, loading, error } = useSelector((state) => state.house);
//   const [modalShow, setModalShow] = useState(false);
//   const [modalAction, setModalAction] = useState('');
//   const [modalData, setModalData] = useState({});
//   const [houseData, setHouseData] = useState(null);

//   useEffect(() => {
//     dispatch(fetchHomeData());
//   }, [dispatch]);

//   useEffect(() => {
//     setHouseData(home?.data);
//   }, [home]);

//   const handleModalShow = (actionType, data = {}) => {
//     setModalAction(actionType);
//     setModalData(data);
//     setModalShow(true);
//   };

//   const handleModalClose = () => setModalShow(false);

//   const handleModalSubmit = async (data) => {
//     try {
//       if (modalAction === 'add') {
//         await dispatch(addHomeData(data));
//         toast.success('House added successfully.');
//       } else if (modalAction === 'update') {
//         await dispatch(updateHomeData(data));
//         toast.success('House updated successfully.');
//       } else if (modalAction === 'delete') {
//         await dispatch(deleteHomeData(data._id));
//         toast.success('House deleted successfully.');
//       }

//       // After successful add, update, or delete, fetch the updated data
//       dispatch(fetchHomeData());

//       setModalShow(false);
//     } catch (error) {
//       toast.error('Failed to perform action.');
//     }
//   };

//   return (
//     <Container fluid className="p-3">
//       <ToastContainer />

//       {/* First Row */}
//       <Row className="align-items-center mb-3">
//         <Col className="text-start">
//           <h4 className="m-0 ">House Details</h4>
//         </Col>
//         <Col className="text-end">
//           <Button variant="btn btn-outline-dark" onClick={() => handleModalShow('add')}><AddSharpIcon /> Add House Detail</Button>
//         </Col>
//       </Row>

//       {/* Second Row */}
//       <Row>
//         <Col>
//           {loading ? (
//             <CircularProgress />
//           ) : error ? (
//             <div>Error: {error.message}</div>
//           ) : (
//             <Table bordered hover responsive >
//               <thead >
//                 <tr >
//                   <th style={{ backgroundColor: '#8c7569', color: 'white' }}>No</th>
//                   <th style={{ backgroundColor: '#8c7569', color: 'white' }}>House No</th>
//                   <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Type</th>
//                   <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Sell Price</th>
//                   <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Rate Money</th>
//                   <th style={{ backgroundColor: '#8c7569', color: 'white' }}>On Sale</th>
//                   <th style={{ backgroundColor: '#8c7569', color: 'white' }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody >
//                 {houseData && houseData.map((house, index) => (
//                   <tr key={house._id}>
//                     <td>{index + 1}</td>
//                     <td>{house.houseNo}</td>
//                     <td>{house.houseType}</td>
//                     <td>{house.houseSellPrice ? house.houseSellPrice : 0}</td>
//                     <td>{house.houseOnRateMoney ? house.houseOnRateMoney : 0}</td>
//                     <td>{house.houseOnSale ? 'Yes' : 'No'}</td>
//                     <td>
//                       <Button variant="btn btn-outline-success" size="sm" className="me-2" onClick={() => handleModalShow('view', house)}>View</Button>
//                       <Button variant="btn btn-outline-dark" size="sm" className="me-2" onClick={() => handleModalShow('update', house)}>Update</Button>
//                       <Button variant="btn btn-outline-danger" size="sm" onClick={() => handleModalShow('delete', house)}>Delete</Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </Col>
//       </Row>

//       {/* Action Modal */}
//       <ActionModal
//         show={modalShow}
//         handleClose={handleModalClose}
//         actionType={modalAction}
//         data={modalData}
//         handleSubmit={handleModalSubmit}
//       />
//       <ToastContainer />
//     </Container>
//   );
// };

// export default HouseAction;