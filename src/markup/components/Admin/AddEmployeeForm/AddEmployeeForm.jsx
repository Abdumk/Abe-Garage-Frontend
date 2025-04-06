import React, { useState } from 'react';

function AddEmployeeForm() {
  const [formData, setFormData] = useState({
    employee_email: '',
    employee_first_name: '',
    employee_last_name: '',
    employee_phone: '',
    employee_role: '1',
    employee_password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data with backend-compatible keys
    const payload = {
      employee_email: formData.employee_email,
      employee_first_name: formData.employee_first_name,
      employee_last_name: formData.employee_last_name,
      employee_phone: formData.employee_phone,
      employee_password: formData.employee_password,
      active_employee: 1,
      company_role_id: parseInt(formData.employee_role)
    };

    try {
      const response = await fetch('http://localhost:3000/admin/employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        alert('Employee added successfully!');
        setFormData({
          employee_email: '',
          employee_first_name: '',
          employee_last_name: '',
          employee_phone: '',
          employee_role: '1',
          employee_password: '',
        });
      } else {
        alert(data.error || 'Failed to add employee.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while submitting the form.');
    }
  };

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
                      <input type="email" name="employee_email" value={formData.employee_email} onChange={handleChange} placeholder="Employee email" required />
                    </div>
                    <div className="form-group col-md-12">
                      <input type="text" name="employee_first_name" value={formData.employee_first_name} onChange={handleChange} placeholder="Employee first name" required />
                    </div>
                    <div className="form-group col-md-12">
                      <input type="text" name="employee_last_name" value={formData.employee_last_name} onChange={handleChange} placeholder="Employee last name" required />
                    </div>
                    <div className="form-group col-md-12">
                      <input type="text" name="employee_phone" value={formData.employee_phone} onChange={handleChange} placeholder="Employee phone" required />
                    </div>
                    <div className="form-group col-md-12">
                      <select name="employee_role" value={formData.employee_role} onChange={handleChange} className="custom-select-box">
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12">
                      <input type="password" name="employee_password" value={formData.employee_password} onChange={handleChange} placeholder="Employee password" required />
                    </div>
                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit"><span>Add employee</span></button>
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











// import React from 'react';

// function AddEmployeeForm(props) {
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
//                 <form>
//                   <div className="row clearfix">
//                     <div className="form-group col-md-12">
//                       <input type="email" name="employee_email" placeholder="Employee email" />
//                     </div>
//                     <div className="form-group col-md-12">
//                       <input type="text" name="employee_first_name" placeholder="Employee first name" />
//                     </div>

//                     <div className="form-group col-md-12">
//                       <input type="text" name="employee_last_name" placeholder="Employee last name" required />
//                     </div>

//                     <div className="form-group col-md-12">
//                       <input type="text" name="employee_phone" placeholder="Employee phone (555-555-5555)" required />
//                     </div>

//                     <div className="form-group col-md-12">
//                       <select name="employee_role" className="custom-select-box">
//                         <option value="1">Employee</option>
//                         <option value="2">Manager</option>
//                         <option value="3">Admin</option>
//                       </select>
//                     </div>

//                     <div className="form-group col-md-12">
//                       <input type="password" name="employee_password" placeholder="Employee password" />
//                     </div>

//                     <div className="form-group col-md-12">
//                       <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Add employee</span></button>
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