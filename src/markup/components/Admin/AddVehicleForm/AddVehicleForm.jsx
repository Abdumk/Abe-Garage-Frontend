import React, { useState } from 'react';

dasheboard,addcustomer,AddVehicle
function AddVehicleForm({ customerId, onClose }) {
  const [formData, setFormData] = useState({
    vehicle_year: '',
    vehicle_make: '',
    vehicle_model: '',
    vehicle_type: '',
    vehicle_mileage: '',
    vehicle_tag: '',
    vehicle_serial: '',
    vehicle_color: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        customer_id: customerId,
        ...formData
      };

      const response = await axios.post('http://localhost:3000/api/vehicle', payload);
      if (response.data.success === 'true') {
        alert('Vehicle added successfully');
        setFormData({
          vehicle_year: '',
          vehicle_make: '',
          vehicle_model: '',
          vehicle_type: '',
          vehicle_mileage: '',
          vehicle_tag: '',
          vehicle_serial: '',
          vehicle_color: '',
        });
        onClose?.(); // if modal/section needs to be closed
      }
    } catch (err) {
      console.error('Error adding vehicle:', err);
      alert('Failed to add vehicle');
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-primary">Add a new vehicle</h5>
        <button onClick={onClose} className="btn btn-sm btn-danger">✖</button>
      </div>
      <form onSubmit={handleSubmit}>
        {[
          { name: 'vehicle_year', placeholder: 'Vehicle year' },
          { name: 'vehicle_make', placeholder: 'Vehicle make' },
          { name: 'vehicle_model', placeholder: 'Vehicle model' },
          { name: 'vehicle_type', placeholder: 'Vehicle type' },
          { name: 'vehicle_mileage', placeholder: 'Vehicle mileage' },
          { name: 'vehicle_tag', placeholder: 'Vehicle tag' },
          { name: 'vehicle_serial', placeholder: 'Vehicle serial' },
          { name: 'vehicle_color', placeholder: 'Vehicle color' }
        ].map((field) => (
          <input
            key={field.name}
            type="text"
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />
        ))}
        <button type="submit" className="btn btn-danger">Add Vehicle</button>
      </form>
    </div>
  );
}

export default AddVehicleForm;
