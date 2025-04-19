const api_url = import.meta.env.VITE_API_URL;


const createCommonService = async (formData, loggedInEmployeeToken) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': loggedInEmployeeToken,
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${api_url}/api/service`, requestOptions);
    return response;
  };


  const getAllCommonService = async (loggedInEmployeeToken) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': loggedInEmployeeToken,
      },
    };
    const response = await fetch(`${api_url}/api/services`, requestOptions);
    return response;
  };


  const deleteCommonService = async (service_id, loggedInEmployeeToken) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': loggedInEmployeeToken,
      },
    };
    const response = await fetch(`${api_url}/api/service/${service_id}`, requestOptions);
    return response;
  };


  const editCommonService = async (service_id, updatedData, loggedInEmployeeToken) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': loggedInEmployeeToken,
      },
      body: JSON.stringify(updatedData),
    };
    const response = await fetch(`${api_url}/api/service/${service_id}`, requestOptions);
    return response;
  };


  const getCommonServiceById = async (service_id, loggedInEmployeeToken) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': loggedInEmployeeToken,
      },
    };
    const response = await fetch(`${api_url}/api/service/${service_id}`, requestOptions);
    return response;
  };

  const CommonServiceService = {
    createCommonService,
    getAllCommonService,
    deleteCommonService,
    editCommonService,
    getCommonServiceById,
  };

  export default CommonServiceService;