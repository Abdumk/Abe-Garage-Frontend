import React,{useState} from 'react'

function AddEmployee(props) {
    // Declare state variables for each of the form fields  
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

     // Write a function to handle the form submission
  function handleSubmit(event) {
    // Prevent the default behaviour of the form submission
    event.preventDefault();
    // Prepare the data to be sent to the server  
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      password: password
    };
    // Send the data to the server  
    const apiUrl = "http://localhost:4000/add-employee";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    const response = fetch(apiUrl, requestOptions);
    response.then(res => res.json())
      .then(res => {
        console.log(res);
      });


  }
  return (
    <div>


    </div>
  )
}

export default AddEmployee