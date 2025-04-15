import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 const { employee } = useAuth();
   let token = null; // To store the token
   if (employee) {
     token = employee.employee_token;
   }
 
  const [formData, setFormData] = useState({
    employee_email: "",
    employee_first_name: "",
    employee_last_name: "",
    employee_phone: "",
    company_role_id: "",
    active_employee: 0
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {

   
    console.log("EditEmployee component loaded with ID:", id);
    console.log("Token being sent:", token);

    const fetchEmployee = async () => {
      try {
       
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/employee/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token
          }
        });

        const data = await res.json();
        if (res.ok && data?.data) {
          setFormData({
            employee_email: data.data.employee_email || "",
            employee_first_name: data.data.employee_first_name || "",
            employee_last_name: data.data.employee_last_name || "",
            employee_phone: data.data.employee_phone || "",
            company_role_id: data.data.company_role_id || "",
            active_employee: data.data.active_employee || 0
          });
        } else {
          setErrorMsg(data.message || "Failed to fetch employee.");
        }
      } catch (error) {
        setErrorMsg("Something went wrong while fetching employee data.");
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await employeeService.editEmployee(id, formData, token);
      const data = await res.json();

      if (res.ok) {
        alert("Employee updated successfully!");
        navigate(`/admin/employee/${employee.employee_id}`);
      } else {
        alert(data.message || "Failed to update employee.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong.");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    // Get the token
    const employeeData = localStorage.getItem("employee");
    if (!employeeData) {
      console.log("No token found");
      return;
    }
  
    const { employee_token } = JSON.parse(employeeData);
  
    try {
      const response = await fetch("http://localhost:3000//api/employee/:id", {
        method: "PUT", // or POST
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({
          // your update payload here
        }),
      });
  
      const data = await response.json();
      console.log("Update response:", data);
    } catch (error) {
      console.error("Update error:", error);
    }
  };
  
  if (loading) return <p className="text-center mt-6">Loading employee data...</p>;
  if (errorMsg) return <p className="text-red-600 text-center mt-6">{errorMsg}</p>;

return (
  <section className="contact-section">
  <div className="auto-container">
    <div className="contact-title">
      <h2>Edit: {formData.employee_first_name} {formData.employee_last_name}</h2>
      <h5 >
        Employee email: <span className="text-black">{formData.employee_email}</span>
      </h5>
    </div>
    <div className="row clearfix">
      <div className="form-column col-lg-7">
        <div className="inner-column">
          <div className="contact-form">
  
            <form onSubmit={handleSubmit}>
              <div className="row clearfix">
                <div className="form-group col-md-12">
  
                  <input
                    type="text"
                    name="employee_first_name"
                    value={formData.employee_first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
               
                </div>
  
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    name="employee_last_name"
                    value={formData.employee_last_name}
                    onChange={handleChange}
                    placeholder="Employee Last Name"
                    required
                  />
                </div>
  
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    name="employee_phone"
                    value={formData.employee_phone}
                    onChange={handleChange}
                    placeholder="Employee phone (555-555-5555)"
                    required
                  />
                </div>
  
            
                <div className="form-group col-md-12">
  <select
    name="company_role_id"
    value={formData.company_role_id}
    onChange={handleChange}
    className="custom-select-box"
  >
    <option value="1">Employee</option>
    <option value="2">Manager</option>
    <option value="3">Admin</option>
  </select>
</div>
  
                <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="active_employee"
            checked={formData.active_employee === 1}
            onChange={handleChange}
            className="accent-blue-600 w-4 h-4"
          />
          <label className="text-gray-700 font-medium">Is active employee</label>
        </div>
  
                <div className="form-group col-md-12">
                  <button
                    className="theme-btn btn-style-one"
                    type="submit"
                    data-loading-text="Please wait..."
                  >
                    <span> UPDATE</span>
                  </button>
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

};

export default EditEmployee;


