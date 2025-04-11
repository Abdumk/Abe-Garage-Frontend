//const api_url = process.env.REACT_APP_API_URL;
const api_url = import.meta.env.VITE_API_URL;

// A function to send post request to create a new employee 
const createEmployee = async (formData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  };
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
}
// Export all the functions 
const employeeService = {
  createEmployee
}
export default employeeService; 


// // api_url from environment variable
// const api_url = import.meta.env.VITE_API_URL;

// console.log("API URL from env:", api_url); // Should print http://localhost:3000

// // Function to get token from localStorage
// const getLoggedInEmployeeToken = () => {
//   const token = localStorage.getItem('employeeToken');
//   if (!token) {
//     console.error('Authorization token is missing');
//     return null; // Optionally redirect to login page if no token
//   }
//   return token;
// };

// // A function to send POST request to create a new employee
// const createEmployee = async (formData) => {
//   const loggedInEmployeeToken = getLoggedInEmployeeToken();
//   if (!loggedInEmployeeToken) {
//     throw new Error('Authorization token is missing');
//   }

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': loggedInEmployeeToken,
//     },
//     body: JSON.stringify(formData),
//   };

//   try {
//     console.log('Creating employee with token:', loggedInEmployeeToken);
//     const response = await fetch(`${api_url}/api/employee`, requestOptions);
//     console.log('API response:', response);

//     // Check if response is not okay (e.g., 401 or 500 error)
//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('API error:', errorData);
//       throw new Error(errorData.message || 'Error creating employee');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// // A function to send GET request to get all employees
// const getAllEmployees = async () => {
//   const loggedInEmployeeToken = getLoggedInEmployeeToken();
//   if (!loggedInEmployeeToken) {
//     throw new Error('Authorization token is missing');
//   }

//   const requestOptions = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': loggedInEmployeeToken,
//     },
//   };

//   try {
//     console.log('Fetching all employees with token:', loggedInEmployeeToken);
//     const response = await fetch(`${api_url}/api/employees`, requestOptions);
//     console.log('API response:', response);

//     // Check if response is not okay (e.g., 401 or 500 error)
//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('API error:', errorData);
//       throw new Error(errorData.message || 'Error fetching employees');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// // Export all the functions
// export default {
//   createEmployee,
//   getAllEmployees,
// };









// //const api_url = process.env.REACT_APP_API_URL;
// const api_url = import.meta.env.VITE_API_URL;

// // A function to send post request to create a new employee 
// const createEmployee = async (formData) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(formData)
//   };
//   const response = await fetch(`${api_url}/api/employee`, requestOptions);
//   return response;
// }
// // Export all the functions 
// const employeeService = {
//   createEmployee
// }
// export default employeeService; 








// const api_url = import.meta.env.VITE_API_URL;

// console.log("API URL from env:", api_url); // Should print http://localhost:3000
// // A function to send post request to create a new employee 
// const createEmployee = async (formData, loggedInEmployeeToken) => {
//   console.log('Logged In Token:', loggedInEmployeeToken);
//   // Ensure that the token is available before making the request
//   if (!loggedInEmployeeToken) {
//     throw new Error('Authorization token is missing');
//   }

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': loggedInEmployeeToken,
//     },
//     body: JSON.stringify(formData),
//   };

//   try {
//     const response = await fetch(`${api_url}/api/employee`, requestOptions);
    
//     // Check if response is not okay (e.g., 401 or 500 error)
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Error creating employee');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// // A function to send get request to get all employees
// const getAllEmployees = async (loggedInEmployeeToken) => {
//   // Ensure that the token is available before making the request
//   if (!loggedInEmployeeToken) {
//     throw new Error('Authorization token is missing');
//   }

//   const requestOptions = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': loggedInEmployeeToken,
//     },
//   };

//   try {
//     const response = await fetch(`${api_url}/api/employees`, requestOptions);

//     // Check if response is not okay (e.g., 401 or 500 error)
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Error fetching employees');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// // Export all the functions 
// const employeeService = {
//   createEmployee,
//   getAllEmployees,
// };

// export default employeeService;



// //const api_url = process.env.REACT_APP_API_URL;
// const api_url = import.meta.env.VITE_API_URL;
// console.log("API URL from env:", api_url); // Should print http://localhost:3000




// // A function to send post request to create a new employee 
// const createEmployee = async (formData) => {
//   const loggedInEmployeeToken = localStorage.getItem("loggedInEmployeeToken");
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json',
//             'x-access-token': loggedInEmployeeToken },
//     body: JSON.stringify(formData)
//   };
//   const response = await fetch(`${api_url}/api/employee`, requestOptions);
//   return response;
// }
// // Export all the functions 
// const employeeService = {
//   createEmployee
// }
// export default employeeService; 