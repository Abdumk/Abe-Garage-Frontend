// import React, { useState, useEffect } from 'react';
// import { Form, Button, ListGroup, Card } from 'react-bootstrap';
// import serviceService from '../../../../services/service.service';
// import { useAuth } from '../../../../Contexts/AuthContext';

// const ServiceSelectionStep = ({ customer, vehicle, onBack, onSubmit, onServicesSelect }) => {
//   const [services, setServices] = useState([]);
//   const [selectedServices, setSelectedServices] = useState([]);
//   const [notes, setNotes] = useState('');
//   const [estimatedCompletion, setEstimatedCompletion] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { employee } = useAuth();
//   const token = employee?.employee_token;

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     setLoading(true);
//     try {
//       const res = await serviceService.getAllServices(token);
//       const data = await res.json();
//       setServices(data);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleService = (service) => {
//     setSelectedServices(prev => 
//       prev.some(s => s.service_id === service.service_id)
//         ? prev.filter(s => s.service_id !== service.service_id)
//         : [...prev, service]
//     );
//   };

//   const handleSubmit = () => {
//     onServicesSelect(selectedServices);
//     onSubmit({
//       customerId: customer.customer_id,
//       vehicleId: vehicle.vehicle_id,
//       services: selectedServices.map(s => s.service_id),
//       notes,
//       estimatedCompletion
//     });
//   };

//   return (
//     <div>
//       <Card className="mb-4">
//         <Card.Body>
//           <h5>{customer.customer_first_name} {customer.customer_last_name}</h5>
//           <p>Email: {customer.customer_email}</p>
//           <p>Phone: {customer.customer_phone_number}</p>
//         </Card.Body>
//       </Card>

//       <Card className="mb-4">
//         <Card.Body>
//           <h5>{vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model}</h5>
//           <p>Color: {vehicle.vehicle_color}</p>
//           <p>License Plate: {vehicle.vehicle_tag}</p>
//           <p>VIN: {vehicle.vehicle_serial}</p>
//         </Card.Body>
//       </Card>

//       <h5>Choose services</h5>
      
//       {loading ? (
//         <p>Loading services...</p>
//       ) : (
//         <ListGroup>
//           {services.map(service => (
//             <ListGroup.Item key={service.service_id}>
//               <Form.Check
//                 type="checkbox"
//                 label={`${service.service_name} - ${service.service_description}`}
//                 checked={selectedServices.some(s => s.service_id === service.service_id)}
//                 onChange={() => toggleService(service)}
//               />
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//       )}

//       <Form.Group className="mb-3 mt-3">
//         <Form.Label>Additional Notes</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={3}
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Estimated Completion Date</Form.Label>
//         <Form.Control
//           type="datetime-local"
//           value={estimatedCompletion}
//           onChange={(e) => setEstimatedCompletion(e.target.value)}
//         />
//       </Form.Group>

//       <div className="d-flex justify-content-between mt-4">
//         <Button variant="secondary" onClick={onBack}>
//           Back
//         </Button>
//         <Button 
//           variant="primary" 
//           onClick={handleSubmit}
//           disabled={selectedServices.length === 0}
//         >
//           Submit Order
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ServiceSelectionStep;

import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Card, Modal, Row, Col, Alert } from 'react-bootstrap';
import serviceService from '../../../../services/service.service';
import { useAuth } from '../../../../Contexts/AuthContext';

const ServiceSelectionStep = ({ customer, vehicle, onBack, onSubmit, onServicesSelect }) => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [notes, setNotes] = useState('');
  const [estimatedCompletion, setEstimatedCompletion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: ''
  });
  const { employee } = useAuth();
  const token = employee?.employee_token;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await serviceService.getAllCommonService(token);
      if (!res.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await res.json();
      setServices(data.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to load services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleService = (service) => {
    setSelectedServices(prev => 
      prev.some(s => s.service_id === service.service_id)
        ? prev.filter(s => s.service_id !== service.service_id)
        : [...prev, service]
    );
  };

  const handleAddNewService = async () => {
    if (!newService.name.trim() || !newService.description.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await serviceService.createCommonService({
        service_name: newService.name,
        service_description: newService.description
      }, token);

      if (!res.ok) {
        throw new Error('Failed to add service');
      }

      // Refresh services list
      await fetchServices();
      setShowAddServiceModal(false);
      setNewService({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding service:', error);
      setError('Failed to add service. Please try again.');
    }
  };

  const handleSubmit = () => {
    if (selectedServices.length === 0) {
      setError('Please select at least one service');
      return;
    }

    onServicesSelect(selectedServices);
    onSubmit({
      customerId: customer.customer_id,
      vehicleId: vehicle.vehicle_id,
      services: selectedServices.map(s => s.service_id),
      notes,
      estimatedCompletion
    });
  };

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <h5>{customer.customer_first_name} {customer.customer_last_name}</h5>
          <p>Email: {customer.customer_email}</p>
          <p>Phone: {customer.customer_phone_number}</p>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h5>{vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model}</h5>
          <p>Color: {vehicle.vehicle_color}</p>
          <p>License Plate: {vehicle.vehicle_tag}</p>
          <p>VIN: {vehicle.vehicle_serial}</p>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Select Services</h5>
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => setShowAddServiceModal(true)}
            >
              + Add New Service
            </Button>
          </div>

          {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

          {loading ? (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : services.length === 0 ? (
            <p>No services available</p>
          ) : (
            <ListGroup>
              {services.map(service => (
                <ListGroup.Item key={service.service_id} className="py-3">
                  <Form.Check
                    type="checkbox"
                    id={`service-${service.service_id}`}
                    label={
                      <>
                        <strong>{service.service_name}</strong>
                        <div className="text-muted small mt-1">{service.service_description}</div>
                      </>
                    }
                    checked={selectedServices.some(s => s.service_id === service.service_id)}
                    onChange={() => toggleService(service)}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Additional Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions or details about the service..."
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Estimated Completion Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={estimatedCompletion}
              onChange={(e) => setEstimatedCompletion(e.target.value)}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={selectedServices.length === 0}
        >
          Submit Order
        </Button>
      </div>

      {/* Add New Service Modal */}
      <Modal show={showAddServiceModal} onHide={() => setShowAddServiceModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                value={newService.name}
                onChange={(e) => setNewService({...newService, name: e.target.value})}
                placeholder="Enter service name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newService.description}
                onChange={(e) => setNewService({...newService, description: e.target.value})}
                placeholder="Enter service description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddServiceModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddNewService}>
            Add Service
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiceSelectionStep;