import React, { useState } from 'react';
import customerService from '../../../../services/customer.service';
import { useAuth } from '../../../../Contexts/AuthContext';

function AddCustomerForm() {
 // const { user } = useAuth();



  const [formData, setFormData] = useState({
    customer_email: '',
    customer_first_name: '',
    customer_last_name: '',
    customer_phone_number: ''
  });

  // State variables for error handling and success messages
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');
   const { employee } = useAuth();
   let token = null;
  if (employee) {
    token = employee.employee_token;
  }
  // if (!user) {
  //   return <p>Loading...</p>; // Or redirect to login page
  // }
 
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle client-side validations
    let valid = true;

    // Validate customer first name
    if (!formData.customer_first_name) {
      setFirstNameError('First name is required');
      valid = false;
    } else {
      setFirstNameError('');
    }

    // Validate email format
    if (!formData.customer_email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!formData.customer_email.includes('@')) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validate phone number
    if (!formData.customer_phone_number) {
      setPhoneNumberError('Phone number is required');
      valid = false;
    } else {
      setPhoneNumberError('');
    }

    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }

    const payload = {
      ...formData,
      active_customer_status: 1
    };

    try {
      console.log('Submitting customer data:', payload);
      const response = await customerService.createCustomer(payload, token);
      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setSuccessMessage('Customer added successfully!');
        setServerError('');
        setFormData({
          customer_email: '',
          customer_first_name: '',
          customer_last_name: '',
          customer_phone_number: ''
        });
      } else {
        setServerError(data.error || 'Failed to add customer.');
      }
    } catch (error) {
      console.error('Error during customer submission:', error);
      setServerError('Something went wrong while submitting the form.');
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new customer</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        name="customer_email"
                        value={formData.customer_email}
                        onChange={handleChange}
                        placeholder="Customer email"
                        required
                      />
                      {emailError && <p className="error-text">{emailError}</p>}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        value={formData.customer_first_name}
                        onChange={handleChange}
                        placeholder="Customer first name"
                        required
                      />
                      {firstNameError && <p className="error-text">{firstNameError}</p>}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        value={formData.customer_last_name}
                        onChange={handleChange}
                        placeholder="Customer last name"
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone_number"
                        value={formData.customer_phone_number}
                        onChange={handleChange}
                        placeholder="Customer phone"
                        required
                      />
                      {phoneNumberError && <p className="error-text">{phoneNumberError}</p>}
                    </div>
                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit">
                        <span>ADD CUSTOMER</span>
                      </button>
                    </div>
                  </div>
                </form>
                {success && <p className="success-text">{successMessage}</p>}
                {serverError && <p className="error-text">{serverError}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddCustomerForm;


