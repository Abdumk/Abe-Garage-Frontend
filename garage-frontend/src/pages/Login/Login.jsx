// Import useState from react 
import React, { useState } from 'react';

function Login() {
  // Declare state variables for each of the form fields
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  // Declare a state variable to store the response from the server
  const [responseMessage, setResponseMessage] = useState('');

  
  // Write a function to handle the form submission
  function handleSubmit(event) {
    // Prevent the default behaviour of the form submission
    event.preventDefault();
    // Prepare the data to be sent to the server
    const loginData = {
      email: emailAddress,
      password: password
    }
    // Check if the data is being captured correctly
    console.log(loginData);
    // Send the data to the server
    const apiUrl = 'http://localhost:4000/login';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    };
    const response = fetch(apiUrl, requestOptions);
    // Save the response from the server in the state variable
    response.then(res => res.json())
      .then(data => {
        setResponseMessage(data.message)
        if (data.status === "success") {
          // Redirect the user to the home page after 5 seconds 
          setTimeout(() => {
            window.location.href = "/";
          }, 5000);
        }
      })
      .catch(error => console.log(error));
  }


  return (
    <div>



    </div>
  )
}

export default Login