// Import from the env 
const api_url = import.meta.env.VITE_API_URL;

// Create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    },
    body: JSON.stringify(formData)
  };
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
}

// Get all employees
const getAllEmployees = async (token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/employees`, requestOptions);
  return response;
}

// DELETE an employee by ID
const deleteEmployee = async (employeeId, token) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/employee/${employeeId}`, requestOptions);
  return response;
}

// PUT to update an employee
const editEmployee = async (employee_id, updatedData, token) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(updatedData),
  };

  const response = await fetch(`${api_url}/api/employee/${employee_id}`, requestOptions);
  return response;
};
const getEmployeeById = async (employeeId, token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/employee/${employeeId}`, requestOptions);
  return response;
};

// Export all the functions 
const employeeService = {
  createEmployee,
  getAllEmployees,
  deleteEmployee,
  editEmployee,
  getEmployeeById
};

export default employeeService;

