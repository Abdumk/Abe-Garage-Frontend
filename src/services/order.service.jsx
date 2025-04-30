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
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token || ''
      },
      credentials: 'include' // If using cookies
    };
    
    console.log('Sending request to:', `${api_url}/api/orders`);
    console.log('With token:', token);
    
    const response = await fetch(`${api_url}/api/orders`, requestOptions);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.message || 'Failed to fetch orders');
    }
    
    return response;
  } catch (error) {
    console.error('Network Error:', error);
    throw error;
  }
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

const updateOrder = async (orderId, orderData, token) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(orderData)
  };
  const response = await fetch(`${api_url}/api/order/${orderId}`, requestOptions);
  return response;
};

const deleteOrder = async (orderId, token) => {
  const requestOptions = {
    method: 'DELETE',
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
  getOrderById,
  updateOrder,
  deleteOrder
};

export default orderService;