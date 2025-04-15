// Import from the env
const api_url = import.meta.env.VITE_API_URL;

// Create a new customer
const createCustomer = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/customer`, requestOptions);
  return response;
};

// Get all customers
const getAllCustomers = async (loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken,
    },
  };
  const response = await fetch(`${api_url}/api/customers`, requestOptions);
  return response;
};

// Delete a customer
const deleteCustomer = async (customerId, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken,
    },
  };
  const response = await fetch(`${api_url}/api/customer/${customerId}`, requestOptions);
  return response;
};

// Update customer
const editCustomer = async (customerId, updatedData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken,
    },
    body: JSON.stringify(updatedData),
  };
  const response = await fetch(`${api_url}/api/customer/${customerId}`, requestOptions);
  return response;
};

// Get a customer by ID
const getCustomerById = async (customerId, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken,
    },
  };
  const response = await fetch(`${api_url}/api/customer/${customerId}`, requestOptions);
  return response;
};

const customerService = {
  createCustomer,
  getAllCustomers,
  deleteCustomer,
  editCustomer,
  getCustomerById,
};

export default customerService;

