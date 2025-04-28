const api_url = import.meta.env.VITE_API_URL;

// Get all services
const getAllServices = async (token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/services`, requestOptions);
  return response;
};

// Get single service by ID
const getServiceById = async (serviceId, token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/service/${serviceId}`, requestOptions);
  return response;
};

// Create new service
const createService = async (serviceData, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(serviceData)
  };
  const response = await fetch(`${api_url}/api/service`, requestOptions);
  return response;
};

// Update existing service
const updateService = async (serviceId, serviceData, token) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(serviceData)
  };
  const response = await fetch(`${api_url}/api/service`, requestOptions);
  return response;
};

// Delete service
const deleteService = async (serviceId, token) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/service/${serviceId}`, requestOptions);
  return response;
};

const serviceService = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};

export default serviceService;