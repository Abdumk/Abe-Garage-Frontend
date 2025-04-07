import React, { useState } from 'react';


function AddCustomerForm() {
 const [formData, setFormData] = useState({
     employee_email: '',
     employee_first_name: '',
     employee_last_name: '',
     employee_phone: '',
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
        customer_email: formData.customer_email,
        customer_phone_number: formData.customer_phone_number,
        customer_first_name: formData.customer_first_name,
        customer_last_name: formData.customer_last_name,
        active_customer_status: 1,
     };
 
     try { 
       const response = await fetch('http://localhost:3000/api/customer', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(payload)
       });
 
       const data = await response.json();
       if (response.ok) {
         alert('customer added successfully!');
         setFormData({
            customer_email: '',
            customer_first_name: '',
            customer_last_name: '',
            customer_phone_number: '',
         });
       } else {
         alert(data.error || 'Failed to add customer.');
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
           <h2>Add a new customer</h2>
         </div>
         <div className="row clearfix">
           <div className="form-column col-lg-7">
             <div className="inner-column">
               <div className="contact-form">
                 <form onSubmit={handleSubmit}>
                   <div className="row clearfix">
                     <div className="form-group col-md-12">
                       <input type="email" name="customer_email" value={formData.customer_email} onChange={handleChange} placeholder="customer email" required />
                     </div>
                     <div className="form-group col-md-12">
                       <input type="text" name="customer_first_name" value={formData.customer_first_name} onChange={handleChange} placeholder="customer first name" required />
                     </div>
                     <div className="form-group col-md-12">
                       <input type="text" name="customer_last_name" value={formData.customer_last_name} onChange={handleChange} placeholder="customer last name" required />
                     </div>
                     <div className="form-group col-md-12">
                       <input type="text" name="customer_phone_number" value={formData.customer_phone_number} onChange={handleChange} placeholder="customer phone" required />
                     </div>
                    
                     <div className="form-group col-md-12">
                       <button className="theme-btn btn-style-one" type="submit"><span>ADD CUSTOMER</span></button>
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

export default AddCustomerForm