// const api_url = import.meta.env.VITE_API_URL;

// const getVehiclesByCustomer = async (customerId, token) => {
//   const requestOptions = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': token
//     }
//   };
//   const response = await fetch(`${api_url}/api/vehicles/customer/${customerId}`, requestOptions);
//   return response;
// };

// const addVehicle = async (vehicleData, token) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': token
//     },
//     body: JSON.stringify(vehicleData)
//   };
//   const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
//   return response;
// };

// const vehicleService = {
//   getVehiclesByCustomer,
//   addVehicle
// };

// export default vehicleService;
const api_url = import.meta.env.VITE_API_URL;

const getVehiclesByCustomer = async (customerId, token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/vehicles/customer/${customerId}`, requestOptions);
  return response;
};

const addVehicle = async (vehicleData, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(vehicleData)
  };
  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
};

const getVehicleById = async (vehicleId, token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/vehicle/${vehicleId}`, requestOptions);
  return response;
};

const vehicleService = {
  getVehiclesByCustomer,
  addVehicle,
  getVehicleById
};

export default vehicleService;