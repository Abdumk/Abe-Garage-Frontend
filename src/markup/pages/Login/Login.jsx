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
      {/* Display the return message in here */}
      <div className='notice'><h2>{responseMessage}</h2></div>
      <h1>Login </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label><br />
        <input type="text" id="email" name="email" value={emailAddress} onChange={event => setEmailAddress(event.target.value)} /><br />
        <label htmlFor="password">Password:</label><br />
        <input type="text" id="password" name="password" value={password} onChange={event => setPassword(event.target.value)} /><br /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Login