// Import useState from react 
import React, { useState } from 'react';

function Login() {
  // Declare state variables for each of the form fields
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  // Declare a state variable to store the response from the server
  const [responseMessage, setResponseMessage] = useState('');


  return (
    <div>



    </div>
  )
}

export default Login