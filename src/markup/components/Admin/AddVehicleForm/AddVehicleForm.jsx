// import React, { useState } from 'react';

// function AddVehicleForm({ customerId, onClose }) {
//   const [formData, setFormData] = useState({
//     vehicle_year: '',
//     vehicle_make: '',
//     vehicle_model: '',
//     vehicle_type: '',
//     vehicle_mileage: '',
//     vehicle_tag: '',
//     vehicle_serial: '',
//     vehicle_color: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         customer_id: customerId,
//         ...formData
//       };

//       const response = await axios.post('http://localhost:3000/api/vehicle', payload);
//       if (response.data.success === 'true') {
//         alert('Vehicle added successfully');
//         setFormData({
//           vehicle_year: '',
//           vehicle_make: '',
//           vehicle_model: '',
//           vehicle_type: '',
//           vehicle_mileage: '',
//           vehicle_tag: '',
//           vehicle_serial: '',
//           vehicle_color: '',
//         });
//         onClose?.(); // if modal/section needs to be closed
//       }
//     } catch (err) {
//       console.error('Error adding vehicle:', err);
//       alert('Failed to add vehicle');
//     }
//   };

//   return (
//     <div className="card p-4 shadow-sm">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="text-primary">Add a new vehicle</h5>
//         <button onClick={onClose} className="btn btn-sm btn-danger">✖</button>
//       </div>
//       <form onSubmit={handleSubmit}>
//         {[
//           { name: 'vehicle_year', placeholder: 'Vehicle year' },
//           { name: 'vehicle_make', placeholder: 'Vehicle make' },
//           { name: 'vehicle_model', placeholder: 'Vehicle model' },
//           { name: 'vehicle_type', placeholder: 'Vehicle type' },
//           { name: 'vehicle_mileage', placeholder: 'Vehicle mileage' },
//           { name: 'vehicle_tag', placeholder: 'Vehicle tag' },
//           { name: 'vehicle_serial', placeholder: 'Vehicle serial' },
//           { name: 'vehicle_color', placeholder: 'Vehicle color' }
//         ].map((field) => (
//           <input
//             key={field.name}
//             type="text"
//             name={field.name}
//             placeholder={field.placeholder}
//             value={formData[field.name]}
//             onChange={handleChange}
//             className="form-control mb-3"
//             required
//           />
//         ))}
//         <button type="submit" className="btn btn-danger">Add Vehicle</button>
//       </form>
//     </div>
//   );
// }

// export default AddVehicleForm;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import vehicleService from '../../../../services/vehicle.service';
import { useAuth } from '../../../../Contexts/AuthContext';
import AdminMenu from '../../Admin/AdminMenu/AdminMenu';

const AddVehicleForm = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();
  const token = employee?.employee_token;
  
  const [formData, setFormData] = useState({
    customer_id: customerId,
    vehicle_year: '',
    vehicle_make: '',
    vehicle_model: '',
    vehicle_type: '',
    vehicle_mileage: '',
    vehicle_tag: '',
    vehicle_serial: '',
    vehicle_color: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await vehicleService.addVehicle(formData, token);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add vehicle');
      }
      
      navigate(`/admin/customer-profile/${customerId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <div className="card mb-4">
            <div className="card-body">
              <h2>Add New Vehicle</h2>
              
              {error && <div className="alert alert-danger">{error}</div>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="number"
                    name="vehicle_year"
                    value={formData.vehicle_year}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Make</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicle_make"
                    value={formData.vehicle_make}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicle_model"
                    value={formData.vehicle_model}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicle_type"
                    value={formData.vehicle_type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Mileage</Form.Label>
                  <Form.Control
                    type="number"
                    name="vehicle_mileage"
                    value={formData.vehicle_mileage}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>License Plate</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicle_tag"
                    value={formData.vehicle_tag}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>VIN/Serial Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicle_serial"
                    value={formData.vehicle_serial}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicle_color"
                    value={formData.vehicle_color}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Vehicle'}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleForm;

// import React, { useState } from 'react';

// function AddVehicleForm({ customerId, onClose }) {
//   const [formData, setFormData] = useState({
//     vehicle_year: '',
//     vehicle_make: '',
//     vehicle_model: '',
//     vehicle_type: '',
//     vehicle_mileage: '',
//     vehicle_tag: '',
//     vehicle_serial: '',
//     vehicle_color: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         customer_id: customerId,
//         ...formData
//       };

//       const response = await axios.post('http://localhost:3000/api/vehicle', payload);
//       if (response.data.success === 'true') {
//         alert('Vehicle added successfully');
//         setFormData({
//           vehicle_year: '',
//           vehicle_make: '',
//           vehicle_model: '',
//           vehicle_type: '',
//           vehicle_mileage: '',
//           vehicle_tag: '',
//           vehicle_serial: '',
//           vehicle_color: '',
//         });
//         onClose?.(); // if modal/section needs to be closed
//       }
//     } catch (err) {
//       console.error('Error adding vehicle:', err);
//       alert('Failed to add vehicle');
//     }
//   };

//   return (
//     <div className="card p-4 shadow-sm">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="text-primary">Add a new vehicle</h5>
//         <button onClick={onClose} className="btn btn-sm btn-danger">✖</button>
//       </div>
//       <form onSubmit={handleSubmit}>
//         {[
//           { name: 'vehicle_year', placeholder: 'Vehicle year' },
//           { name: 'vehicle_make', placeholder: 'Vehicle make' },
//           { name: 'vehicle_model', placeholder: 'Vehicle model' },
//           { name: 'vehicle_type', placeholder: 'Vehicle type' },
//           { name: 'vehicle_mileage', placeholder: 'Vehicle mileage' },
//           { name: 'vehicle_tag', placeholder: 'Vehicle tag' },
//           { name: 'vehicle_serial', placeholder: 'Vehicle serial' },
//           { name: 'vehicle_color', placeholder: 'Vehicle color' }
//         ].map((field) => (
//           <input
//             key={field.name}
//             type="text"
//             name={field.name}
//             placeholder={field.placeholder}
//             value={formData[field.name]}
//             onChange={handleChange}
//             className="form-control mb-3"
//             required
//           />
//         ))}
//         <button type="submit" className="btn btn-danger">Add Vehicle</button>
//       </form>
//     </div>
//   );
// }

// export default AddVehicleForm;
