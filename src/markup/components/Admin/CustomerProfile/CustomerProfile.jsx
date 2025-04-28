import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from "../../../../Contexts/AuthContext";
import vehicleService from "../../../../services/vehicle.service";
import customerService from "../../../../services/customer.service";
import AdminMenu from "../AdminMenu/AdminMenu";
import { Table, Button, Form, Card, Alert } from "react-bootstrap";
import Addservicess from "../CustomerProfile/Addservices";

const CustomerProfile = () => {
  const { customerId } = useParams();
  const { employee } = useAuth();
  const token = employee?.employee_token;
  
  // State management
  const [customer, setCustomer] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState({
    customer: true,
    vehicles: true,
    submitting: false
  });
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    vehicle_year: '',
    vehicle_make: '',
    vehicle_model: '',
    vehicle_type: '',
    vehicle_mileage: '',
    vehicle_tag: '',
    vehicle_serial: '',
    vehicle_color: ''
  });

  // Fetch customer and vehicles data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        
        // Fetch customer data
        const customerRes = await customerService.getCustomerById(customerId, token);
        const customerData = await customerRes.json();
        
        if (!customerRes.ok) {
          throw new Error(customerData.message || "Failed to fetch customer");
        }
        
        setCustomer(customerData.data[0]);
        setLoading(prev => ({ ...prev, customer: false }));

        // Fetch vehicles data
        const vehiclesRes = await vehicleService.getVehiclesByCustomer(customerId, token);
        const vehiclesData = await vehiclesRes.json();
        setVehicles(vehiclesData);
        setFilteredVehicles(vehiclesData);
        setLoading(prev => ({ ...prev, vehicles: false }));

      } catch (err) {
        setError(err.message);
        setLoading({ customer: false, vehicles: false, submitting: false });
      }
    };

    fetchData();
  }, [customerId, token]);

  // Filter vehicles based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = vehicles.filter(vehicle =>
        `${vehicle.vehicle_make} ${vehicle.vehicle_model} ${vehicle.vehicle_type} ${vehicle.vehicle_tag}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredVehicles(filtered);
    } else {
      setFilteredVehicles(vehicles);
    }
  }, [searchTerm, vehicles]);

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, submitting: true }));
    
    try {
      const response = await vehicleService.addVehicle(
        { ...formData, customer_id: customerId },
        token
      );
      
      if (!response.ok) {
        throw new Error('Failed to add vehicle');
      }
      
      // Refresh vehicles list
      const vehiclesRes = await vehicleService.getVehiclesByCustomer(customerId, token);
      const vehiclesData = await vehiclesRes.json();
      setVehicles(vehiclesData);
      
      // Reset form
      setFormData({
        vehicle_year: '',
        vehicle_make: '',
        vehicle_model: '',
        vehicle_type: '',
        vehicle_mileage: '',
        vehicle_tag: '',
        vehicle_serial: '',
        vehicle_color: ''
      });
      setShowAddForm(false);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(prev => ({ ...prev, submitting: false }));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading.customer) return <div className="text-center my-5">Loading customer data...</div>;
  if (error) return <Alert variant="danger" className="m-3">Error: {error}</Alert>;
  if (!customer) return <div>Customer not found</div>;

  return (
    <>
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          {/* Customer Information */}
          <div className="mb-4">
            <h2><strong>Customer: {customer.customer_first_name} {customer.customer_last_name}</strong></h2>
            <p><strong>Email:</strong> {customer.customer_email}</p>
            <p><strong>Phone:</strong> {customer.customer_phone_number}</p>
            <p><strong>Status:</strong> {customer.active_customer_status ? "Active" : "Inactive"}</p>
          </div>

          {/* Vehicles Section */}
          <div className="mb-4">
            <h3><strong>Vehicles of {customer.customer_first_name}</strong></h3>
            
            {/* Search Box */}
            <div className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search vehicles by make, model, type or license plate"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Add Vehicle Form - Single Row */}
            {showAddForm && (
                <div className="all page-wrapper">
  <section className="services-section py-5">
    <div className="container">
      <div className="page-wrapper d-flex justify-content-center align-items-center py-5">
        <div 
          className="service-card p-4 shadow bg-white rounded" 
          style={{ 
            maxWidth: "600px", 
            width: "100%",
            margin: "0 auto" 
          }}
        >
          <div className="sec-title style-two text-center mb-4">
            <h2>Add a New Vehicle</h2>
          </div>
          
          <Form onSubmit={handleAddVehicle}>
            <div className="d-flex flex-column gap-3">
              {/* Vehicle Year */}
              <input
                type="number"
                className="form-control custom-input"
                placeholder="Vehicle year"
                name="vehicle_year"
                value={formData.vehicle_year}
                onChange={handleChange}
                required
                min="1900"
                max={new Date().getFullYear() + 1}
              />
              
              {/* Vehicle Make */}
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Vehicle make"
                name="vehicle_make"
                value={formData.vehicle_make}
                onChange={handleChange}
                required
              />
              
              {/* Vehicle Model */}
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Vehicle model"
                name="vehicle_model"
                value={formData.vehicle_model}
                onChange={handleChange}
                required
              />
              
              {/* Vehicle Type */}
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Vehicle type (optional)"
                name="vehicle_type"
                value={formData.vehicle_type}
                onChange={handleChange}
              />
              
              {/* Vehicle Mileage */}
              <input
                type="number"
                className="form-control custom-input"
                placeholder="Vehicle mileage (optional)"
                name="vehicle_mileage"
                value={formData.vehicle_mileage}
                onChange={handleChange}
                min="0"
              />
              
              {/* Vehicle Tag */}
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Vehicle tag"
                name="vehicle_tag"
                value={formData.vehicle_tag}
                onChange={handleChange}
                required
              />
              
              {/* Vehicle Serial */}
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Vehicle serial (optional)"
                name="vehicle_serial"
                value={formData.vehicle_serial}
                onChange={handleChange}
              />
              
              {/* Vehicle Color */}
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Vehicle color (optional)"
                name="vehicle_color"
                value={formData.vehicle_color}
                onChange={handleChange}
              />
              
              {/* Action Buttons */}
              <div className="d-flex gap-2 mt-4 justify-content-center">
                <button
                  type="submit"
                  className="btn btn-danger px-4 py-2 text-uppercase fw-bold"
                  disabled={loading.submitting}
                >
                  ADD VEHICLE
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4 py-2"
                  onClick={() => setShowAddForm(false)}
                  disabled={loading.submitting}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </section>
</div>
)}

            {/* Vehicles List or Add Button */}
            {loading.vehicles ? (
              <div className="text-center my-3">Loading vehicles...</div>
            ) : filteredVehicles.length === 0 ? (
              <div className="text-center my-3 p-3 bg-light rounded">
                {searchTerm ? (
                  <>
                    <p>No vehicles match your search</p>
                    <Button 
                      onClick={() => setSearchTerm('')}
                      variant="link"
                    >
                      Clear search
                    </Button>
                  </>
                ) : (
                  <>
                    <p>No vehicles found for this customer</p>
                    <Button 
                      onClick={() => setShowAddForm(true)}
                      variant="success"
                    >
                      Add New Vehicle
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <>
                <Table striped bordered hover responsive className="mb-3">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Make</th>
                      <th>Model</th>
                      <th>License</th>
                      <th>Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVehicles.map(vehicle => (
                      <tr key={vehicle.vehicle_id}>
                        <td>{vehicle.vehicle_year}</td>
                        <td>{vehicle.vehicle_make}</td>
                        <td>{vehicle.vehicle_model}</td>
                        <td>{vehicle.vehicle_tag}</td>
                        <td>{vehicle.vehicle_color}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {!showAddForm && (
                  <Button 
                    onClick={() => setShowAddForm(true)}
                    variant="success"
                    className="mb-3"
                  >
                    Add New Vehicle
                  </Button>
                )}
              </>
            )}
          </div>

          <Addservicess />
    
        </div>
      </div>
    </div>

    </>
  );
};

export default CustomerProfile;

// THIS componet mix at CustomersProfile that make mix CustomerProfile and AdminManu so in below code there is no AdminMenu component it have in page mix
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useAuth } from "../../../../Contexts/AuthContext";
// import vehicleService from "../../../../services/vehicle.service";
// import customerService from "../../../../services/customer.service";
// import { Table, Button, Form, Alert } from "react-bootstrap";

// const CustomerProfile = () => {
//   const { customerId } = useParams();
//   const { employee } = useAuth();
//   const token = employee?.employee_token;

//   const [customer, setCustomer] = useState(null);
//   const [vehicles, setVehicles] = useState([]);
//   const [filteredVehicles, setFilteredVehicles] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [loading, setLoading] = useState({
//     customer: true,
//     vehicles: true,
//     submitting: false
//   });
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     vehicle_year: '',
//     vehicle_make: '',
//     vehicle_model: '',
//     vehicle_type: '',
//     vehicle_mileage: '',
//     vehicle_tag: '',
//     vehicle_serial: '',
//     vehicle_color: ''
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setError(null);
//         const customerRes = await customerService.getCustomerById(customerId, token);
//         const customerData = await customerRes.json();

//         if (!customerRes.ok) throw new Error(customerData.message || "Failed to fetch customer");
//         setCustomer(customerData.data[0]);
//         setLoading(prev => ({ ...prev, customer: false }));

//         const vehiclesRes = await vehicleService.getVehiclesByCustomer(customerId, token);
//         const vehiclesData = await vehiclesRes.json();
//         setVehicles(vehiclesData);
//         setFilteredVehicles(vehiclesData);
//         setLoading(prev => ({ ...prev, vehicles: false }));
//       } catch (err) {
//         setError(err.message);
//         setLoading({ customer: false, vehicles: false, submitting: false });
//       }
//     };

//     fetchData();
//   }, [customerId, token]);

//   useEffect(() => {
//     const filtered = searchTerm
//       ? vehicles.filter(vehicle =>
//           `${vehicle.vehicle_make} ${vehicle.vehicle_model} ${vehicle.vehicle_type} ${vehicle.vehicle_tag}`
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase()))
//       : vehicles;
//     setFilteredVehicles(filtered);
//   }, [searchTerm, vehicles]);

//   const handleAddVehicle = async (e) => {
//     e.preventDefault();
//     setLoading(prev => ({ ...prev, submitting: true }));

//     try {
//       const response = await vehicleService.addVehicle({ ...formData, customer_id: customerId }, token);
//       if (!response.ok) throw new Error('Failed to add vehicle');

//       const vehiclesRes = await vehicleService.getVehiclesByCustomer(customerId, token);
//       const vehiclesData = await vehiclesRes.json();
//       setVehicles(vehiclesData);
//       setFormData({
//         vehicle_year: '', vehicle_make: '', vehicle_model: '', vehicle_type: '',
//         vehicle_mileage: '', vehicle_tag: '', vehicle_serial: '', vehicle_color: ''
//       });
//       setShowAddForm(false);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(prev => ({ ...prev, submitting: false }));
//     }
//   };

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   if (loading.customer) return <div className="text-center my-5">Loading customer data...</div>;
//   if (error) return <Alert variant="danger" className="m-3">Error: {error}</Alert>;
//   if (!customer) return <div>Customer not found</div>;

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <h2><strong>Customer: {customer.customer_first_name} {customer.customer_last_name}</strong></h2>
//         <p><strong>Email:</strong> {customer.customer_email}</p>
//         <p><strong>Phone:</strong> {customer.customer_phone_number}</p>
//         <p><strong>Status:</strong> {customer.active_customer_status ? "Active" : "Inactive"}</p>
//       </div>

//       <div className="mb-4">
//         <h3><strong>Vehicles of {customer.customer_first_name}</strong></h3>

//         <Form.Control
//           type="text"
//           placeholder="Search vehicles by make, model, type or license plate"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="mb-3"
//         />

//         {showAddForm && (
//           <Form onSubmit={handleAddVehicle} className="mb-4">
//             <div className="row g-3">
//               <div className="col-md-4">
//                 <Form.Control type="number" placeholder="Year" name="vehicle_year" value={formData.vehicle_year} onChange={handleChange} required />
//               </div>
//               <div className="col-md-4">
//                 <Form.Control type="text" placeholder="Make" name="vehicle_make" value={formData.vehicle_make} onChange={handleChange} required />
//               </div>
//               <div className="col-md-4">
//                 <Form.Control type="text" placeholder="Model" name="vehicle_model" value={formData.vehicle_model} onChange={handleChange} required />
//               </div>
//               <div className="col-md-4">
//                 <Form.Control type="text" placeholder="Type (optional)" name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} />
//               </div>
//               <div className="col-md-4">
//                 <Form.Control type="number" placeholder="Mileage" name="vehicle_mileage" value={formData.vehicle_mileage} onChange={handleChange} />
//               </div>
//               <div className="col-md-4">
//                 <Form.Control type="text" placeholder="License Tag" name="vehicle_tag" value={formData.vehicle_tag} onChange={handleChange} required />
//               </div>
//               <div className="col-md-6">
//                 <Form.Control type="text" placeholder="Serial Number" name="vehicle_serial" value={formData.vehicle_serial} onChange={handleChange} />
//               </div>
//               <div className="col-md-6">
//                 <Form.Control type="text" placeholder="Color" name="vehicle_color" value={formData.vehicle_color} onChange={handleChange} />
//               </div>
//               <div className="d-flex justify-content-center gap-3 mt-3">
//                 <Button type="submit" variant="primary" disabled={loading.submitting}>Add Vehicle</Button>
//                 <Button type="button" variant="secondary" onClick={() => setShowAddForm(false)} disabled={loading.submitting}>Cancel</Button>
//               </div>
//             </div>
//           </Form>
//         )}

//         {loading.vehicles ? (
//           <div className="text-center my-3">Loading vehicles...</div>
//         ) : filteredVehicles.length === 0 ? (
//           <div className="text-center p-3 bg-light rounded">
//             {searchTerm ? (
//               <>
//                 <p>No vehicles match your search</p>
//                 <Button variant="link" onClick={() => setSearchTerm('')}>Clear search</Button>
//               </>
//             ) : (
//               <>
//                 <p>No vehicles found for this customer</p>
//                 <Button variant="success" onClick={() => setShowAddForm(true)}>Add New Vehicle</Button>
//               </>
//             )}
//           </div>
//         ) : (
//           <>
//             <Table striped bordered hover responsive className="mb-3">
//               <thead>
//                 <tr>
//                   <th>Year</th>
//                   <th>Make</th>
//                   <th>Model</th>
//                   <th>License</th>
//                   <th>Color</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredVehicles.map(vehicle => (
//                   <tr key={vehicle.vehicle_id}>
//                     <td>{vehicle.vehicle_year}</td>
//                     <td>{vehicle.vehicle_make}</td>
//                     <td>{vehicle.vehicle_model}</td>
//                     <td>{vehicle.vehicle_tag}</td>
//                     <td>{vehicle.vehicle_color}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//             {!showAddForm && (
//               <Button variant="success" onClick={() => setShowAddForm(true)}>Add New Vehicle</Button>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerProfile;
