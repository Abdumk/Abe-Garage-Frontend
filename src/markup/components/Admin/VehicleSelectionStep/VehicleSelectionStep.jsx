// import React, { useState, useEffect } from 'react';
// import { Table, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import vehicleService from '../../../../services/vehicle.service';
// import { useAuth } from '../../../../Contexts/AuthContext';

// const VehicleSelectionStep = ({ customer, onNext, onBack }) => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { employee } = useAuth();
//   const token = employee?.employee_token;

//   useEffect(() => {
//     if (customer?.customer_id) {
//       fetchVehicles();
//     }
//   }, [customer]);

//   const fetchVehicles = async () => {
//     setLoading(true);
//     try {
//       // You'll need to implement getVehiclesByCustomer in your vehicle service
//       const res = await vehicleService.getVehiclesByCustomer(customer.customer_id, token);
//       const data = await res.json();
//       setVehicles(data);
//     } catch (error) {
//       console.error('Error fetching vehicles:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="mb-4">
//         <h4>{customer.customer_first_name} {customer.customer_last_name}</h4>
//         <p>Email: {customer.customer_email}</p>
//         <p>Phone: {customer.customer_phone_number}</p>
//       </div>

//       <h5>Choose a vehicle</h5>
      
//       {loading ? (
//         <p>Loading vehicles...</p>
//       ) : vehicles.length > 0 ? (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Year</th>
//               <th>Make</th>
//               <th>Model</th>
//               <th>Color</th>
//               <th>License Plate</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {vehicles.map(vehicle => (
//               <tr key={vehicle.vehicle_id}>
//                 <td>{vehicle.vehicle_year}</td>
//                 <td>{vehicle.vehicle_make}</td>
//                 <td>{vehicle.vehicle_model}</td>
//                 <td>{vehicle.vehicle_color}</td>
//                 <td>{vehicle.vehicle_tag}</td>
//                 <td>
//                   <Button 
//                     variant="primary" 
//                     size="sm"
//                     onClick={() => onNext(vehicle)}
//                   >
//                     Select
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p>No vehicles found for this customer</p>
//       )}

//       <div className="mt-3">
//         <Link 
//           to={`/admin/add-vehicle/${customer.customer_id}`}
//           className="btn btn-success"
//         >
//           Add New Vehicle
//         </Link>
//       </div>

//       <div className="mt-3">
//         <Button variant="secondary" onClick={onBack}>
//           Back
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default VehicleSelectionStep;

import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup, Badge } from 'react-bootstrap';
import vehicleService from '../../../../services/vehicle.service';
import { useAuth } from '../../../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const VehicleSelectionStep = ({ customer, onNext, onBack }) => {
 // Inside your component:
const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const { employee } = useAuth();
  const token = employee?.employee_token;

  useEffect(() => {
    if (customer?.customer_id) {
      fetchVehicles();
    }
  }, [customer]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await vehicleService.getVehiclesByCustomer(customer.customer_id, token);
      const data = await res.json();
      setVehicles(data.data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="vehicle-selection-step">
      {/* Customer Info Section */}
      <Card className="mb-4 customer-info-card">
        <Card.Body>
          <Card.Title>Customer Information</Card.Title>
          <div className="customer-details">
            <div>
              <strong>Name:</strong> {customer.customer_first_name} {customer.customer_last_name}
            </div>
            <div>
              <strong>Email:</strong> {customer.customer_email}
            </div>
            <div>
              <strong>Phone:</strong> {customer.customer_phone_number}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Vehicle Selection Section */}
      <Card>
        <Card.Body>
          <Card.Title>Select Vehicle</Card.Title>
          
          {loading ? (
            <div className="text-center my-4">Loading vehicles...</div>
          ) : vehicles.length > 0 ? (
            <div className="vehicle-list">
              {vehicles.map(vehicle => (
                <Card 
                  key={vehicle.vehicle_id} 
                  className={`mb-3 vehicle-card ${selectedVehicle?.vehicle_id === vehicle.vehicle_id ? 'selected' : ''}`}
                  onClick={() => handleSelectVehicle(vehicle)}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5>{vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model}</h5>
                        <div className="vehicle-details">
                          <span><strong>Color:</strong> {vehicle.vehicle_color}</span>
                          <span><strong>Plate:</strong> {vehicle.vehicle_tag}</span>
                          <span><strong>VIN:</strong> {vehicle.vehicle_serial}</span>
                        </div>
                      </div>
                      <Badge bg="light" text="dark">
                        {vehicle.vehicle_type}
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center my-4">
              <p>No vehicles found for this customer</p>
              <Button
  variant="success"
  onClick={() => navigate(`/admin/add-vehicle/${customer.customer_id}`)}
>
  Add New Vehicle
</Button>
            </div>
          )}

          {/* Selected Vehicle Details */}
          {selectedVehicle && (
            <div className="selected-vehicle-details mt-4 p-3 bg-light rounded">
              <h5>Selected Vehicle Details</h5>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Make:</strong> {selectedVehicle.vehicle_make}</p>
                  <p><strong>Model:</strong> {selectedVehicle.vehicle_model}</p>
                  <p><strong>Year:</strong> {selectedVehicle.vehicle_year}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Color:</strong> {selectedVehicle.vehicle_color}</p>
                  <p><strong>License Plate:</strong> {selectedVehicle.vehicle_tag}</p>
                  <p><strong>Mileage:</strong> {selectedVehicle.vehicle_mileage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={onBack}>
              Back to Customer Search
            </Button>
            <Button 
              variant="primary" 
              onClick={() => onNext(selectedVehicle)}
              disabled={!selectedVehicle}
            >
              Continue to Services
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default VehicleSelectionStep;