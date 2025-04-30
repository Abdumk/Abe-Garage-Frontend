import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup, Badge, Alert, Spinner } from 'react-bootstrap';
import vehicleService from '../../../../services/vehicle.service';
import { useAuth } from '../../../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const VehicleSelectionStep = ({ customer, onNext, onBack }) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { employee } = useAuth();
  const token = employee?.employee_token;
  const navigate = useNavigate();

  useEffect(() => {
    if (customer?.customer_id) {
      fetchVehicles();
    }
  }, [customer]);

  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await vehicleService.getVehiclesByCustomer(customer.customer_id, token);
      if (!res.ok) {
        throw new Error('Failed to fetch vehicles');
      }
      const data = await res.json();
      setVehicles(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleAddNewVehicle = () => {
    navigate(`/admin/customer/${customer.customer_id}`, { 
      state: { fromOrder: true, returnTo: `/admin/orders/new?customerId=${customer.customer_id}` }
    });
  };

  const handleContinue = () => {
    if (!selectedVehicle) {
      setError('Please select a vehicle');
      return;
    }
    onNext(selectedVehicle);
  };

  return (
    <div className="vehicle-selection-step">
      {/* Customer Info Section */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Customer Information</Card.Title>
          <div className="customer-details">
            <p><strong>Name:</strong> {customer.customer_first_name} {customer.customer_last_name}</p>
            <p><strong>Email:</strong> {customer.customer_email}</p>
            <p><strong>Phone:</strong> {customer.customer_phone_number}</p>
          </div>
        </Card.Body>
      </Card>

      {/* Vehicle Selection Section */}
      <Card>
        <Card.Body>
          <Card.Title>Select Vehicle</Card.Title>
          
          {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : vehicles.length > 0 ? (
            <ListGroup className="mb-3">
              {vehicles.map(vehicle => (
                <ListGroup.Item 
                  key={vehicle.vehicle_id}
                  action
                  active={selectedVehicle?.vehicle_id === vehicle.vehicle_id}
                  onClick={() => handleSelectVehicle(vehicle)}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5>{vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model}</h5>
                    <div className="text-muted small">
                      <span>Color: {vehicle.vehicle_color}</span> | 
                      <span> Plate: {vehicle.vehicle_tag}</span> | 
                      <span> VIN: {vehicle.vehicle_serial}</span>
                    </div>
                  </div>
                  <Badge bg="light" text="dark">
                    {vehicle.vehicle_type}
                  </Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div className="text-center my-4">
              <p>No vehicles found for this customer</p>
              <Button
                variant="primary"
                onClick={handleAddNewVehicle}
              >
                Add New Vehicle
              </Button>
            </div>
          )}

          {/* Selected Vehicle Details */}
          {selectedVehicle && (
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>Selected Vehicle</Card.Title>
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
              </Card.Body>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={onBack}>
              Back to Customer Search
            </Button>
            <Button 
              variant="primary" 
              onClick={handleContinue}
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