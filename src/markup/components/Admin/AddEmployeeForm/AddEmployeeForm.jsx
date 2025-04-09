import React, { useState } from 'react';
// import employee.service.js 
import employeeService from '../../../../services/employee.service';

function AddEmployeeForm(props) {
  const [employee_email, setEmail] = useState('');
  const [employee_first_name, setFirstName] = useState('');
  const [employee_last_name, setLastName] = useState('');
  const [employee_phone, setPhoneNumber] = useState('');
  const [employee_password, setPassword] = useState('');
  const [active_employee, setActive_employee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);
  // Errors 
  const [emailError, setEmailError] = useState('');
  const [firstNameRequired, setFirstNameRequired] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations  
    let valid = true; // Flag 
    // First name is required 
    if (!employee_first_name) {
      setFirstNameRequired('First name is required');
      valid = false;
    } else {
      setFirstNameRequired('');
    }
    // Email is required
    if (!employee_email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!employee_email.includes('@')) {
      setEmailError('Invalid email format');
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError('Invalid email format');
        valid = false;
      } else {
        setEmailError('');
      }
    }
    // Password has to be at least 6 characters long
    if (!employee_password || employee_password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }
    // If the form is not valid, do not submit 
    if (!valid) {
      return;
    }
    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id
    };

    // Pass the form data to the service 
    const newEmployee = employeeService.createEmployee(formData);
    newEmployee.then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error)
        } else {
          // Handle successful response 
          setSuccess(true);
          setServerError('')
          // Redirect to the employees page after 2 seconds 
          // For now, just redirect to the home page 
          setTimeout(() => {
            // window.location.href = '/admin/employees';
            window.location.href = '/';
          }, 2000);
        }
      })
      // Handle Catch 
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  }


  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && <div className="validation-error" role="alert">{serverError}</div>}
                      <input type="email" name="employee_email" value={employee_email} onChange={event => setEmail(event.target.value)} placeholder="Employee email" />
                      {emailError && <div className="validation-error" role="alert">{emailError}</div>}
                    </div>
                    <div className="form-group col-md-12">
                      <input type="text" name="employee_first_name" value={employee_first_name} onChange={event => setFirstName(event.target.value)} placeholder="Employee first name" />
                      {firstNameRequired && <div className="validation-error" role="alert">{firstNameRequired}</div>}
                    </div>

                    <div className="form-group col-md-12">
                      <input type="text" name="employee_last_name" value={employee_last_name} onChange={event => setLastName(event.target.value)} placeholder="Employee last name" required />
                    </div>

                    <div className="form-group col-md-12">
                      <input type="text" name="employee_phone" value={employee_phone} onChange={event => setPhoneNumber(event.target.value)} placeholder="Employee phone (555-555-5555)" required />
                    </div>

                    <div className="form-group col-md-12">
                      <select name="employee_role" value={company_role_id} onChange={event => setCompany_role_id(event.target.value)} className="custom-select-box">
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>

                    <div className="form-group col-md-12">
                      <input type="password" name="employee_password" value={employee_password} onChange={event => setPassword(event.target.value)} placeholder="Employee password" />
                      {passwordError && <div className="validation-error" role="alert">{passwordError}</div>}
                    </div>

                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Add employee</span></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AddEmployeeForm;




// import React, { useState } from 'react';

// function AddEmployeeForm() {
//   const [formData, setFormData] = useState({
//     employee_email: '',
//     employee_first_name: '',
//     employee_last_name: '',
//     employee_phone: '',
//     employee_role: '1',
//     employee_password: '',
//   });

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare the data with backend-compatible keys
//     const payload = {
//       employee_email: formData.employee_email,
//       employee_first_name: formData.employee_first_name,
//       employee_last_name: formData.employee_last_name,
//       employee_phone: formData.employee_phone,
//       employee_password: formData.employee_password,
//       active_employee: 1,
//       company_role_id: parseInt(formData.employee_role)
//     };

//     try {
//       const response = await fetch('http://localhost:3000/admin/employee', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert('Employee added successfully!');
//         setFormData({
//           employee_email: '',
//           employee_first_name: '',
//           employee_last_name: '',
//           employee_phone: '',
//           employee_role: '1',
//           employee_password: '',
//         });
//       } else {
//         alert(data.error || 'Failed to add employee.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Something went wrong while submitting the form.');
//     }
//   };

//   return (
//     <section className="contact-section">
//       <div className="auto-container">
//         <div className="contact-title">
//           <h2>Add a new employee</h2>
//         </div>
//         <div className="row clearfix">
//           <div className="form-column col-lg-7">
//             <div className="inner-column">
//               <div className="contact-form">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row clearfix">
//                     <div className="form-group col-md-12">
//                       <input type="email" name="employee_email" value={formData.employee_email} onChange={handleChange} placeholder="Employee email" required />
//                     </div>
//                     <div className="form-group col-md-12">
//                       <input type="text" name="employee_first_name" value={formData.employee_first_name} onChange={handleChange} placeholder="Employee first name" required />
//                     </div>
//                     <div className="form-group col-md-12">
//                       <input type="text" name="employee_last_name" value={formData.employee_last_name} onChange={handleChange} placeholder="Employee last name" required />
//                     </div>
//                     <div className="form-group col-md-12">
//                       <input type="text" name="employee_phone" value={formData.employee_phone} onChange={handleChange} placeholder="Employee phone" required />
//                     </div>
//                     <div className="form-group col-md-12">
//                       <select name="employee_role" value={formData.employee_role} onChange={handleChange} className="custom-select-box">
//                         <option value="1">Employee</option>
//                         <option value="2">Manager</option>
//                         <option value="3">Admin</option>
//                       </select>
//                     </div>
//                     <div className="form-group col-md-12">
//                       <input type="password" name="employee_password" value={formData.employee_password} onChange={handleChange} placeholder="Employee password" required />
//                     </div>
//                     <div className="form-group col-md-12">
//                       <button className="theme-btn btn-style-one" type="submit"><span>Add employee</span></button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

// export default AddEmployeeForm;











// // import React from 'react';

// // function AddEmployeeForm(props) {
// //   return (
// //     <section className="contact-section">
// //       <div className="auto-container">
// //         <div className="contact-title">
// //           <h2>Add a new employee</h2>
// //         </div>
// //         <div className="row clearfix">
// //           <div className="form-column col-lg-7">
// //             <div className="inner-column">
// //               <div className="contact-form">
// //                 <form>
// //                   <div className="row clearfix">
// //                     <div className="form-group col-md-12">
// //                       <input type="email" name="employee_email" placeholder="Employee email" />
// //                     </div>
// //                     <div className="form-group col-md-12">
// //                       <input type="text" name="employee_first_name" placeholder="Employee first name" />
// //                     </div>

// //                     <div className="form-group col-md-12">
// //                       <input type="text" name="employee_last_name" placeholder="Employee last name" required />
// //                     </div>

// //                     <div className="form-group col-md-12">
// //                       <input type="text" name="employee_phone" placeholder="Employee phone (555-555-5555)" required />
// //                     </div>

// //                     <div className="form-group col-md-12">
// //                       <select name="employee_role" className="custom-select-box">
// //                         <option value="1">Employee</option>
// //                         <option value="2">Manager</option>
// //                         <option value="3">Admin</option>
// //                       </select>
// //                     </div>

// //                     <div className="form-group col-md-12">
// //                       <input type="password" name="employee_password" placeholder="Employee password" />
// //                     </div>

// //                     <div className="form-group col-md-12">
// //                       <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Add employee</span></button>
// //                     </div>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // export default AddEmployeeForm;