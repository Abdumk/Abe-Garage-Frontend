const api_url = import.meta.env.VITE_API_URL;

const createOrder = async (orderData, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(orderData)
  };
  const response = await fetch(`${api_url}/api/order`, requestOptions);
  return response;
};

const getAllOrders = async (token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/orders`, requestOptions);
  return response;
};

const getOrderById = async (orderId, token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/order/${orderId}`, requestOptions);
  return response;
};

const orderService = {
  createOrder,
  getAllOrders,
  getOrderById
};

export default orderService;