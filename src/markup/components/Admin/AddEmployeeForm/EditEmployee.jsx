import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import employeeService from "../../../../services/employee.service";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employee_email: "",
    employee_first_name: "",
    employee_last_name: "",
    employee_phone: "",
    company_role_id: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
        //fetch this from backend

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
        if (data?.data) {
          setFormData({
            employee_email: data.data.employee_email,
            employee_first_name: data.data.employee_first_name,
            employee_last_name: data.data.employee_last_name,
            employee_phone: data.data.employee_phone,
            company_role_id: data.data.company_role_id
          });
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await employeeService.editEmployee(id, formData, token);
      if (res.ok) {
        alert("Employee updated successfully!");
        navigate("/admin/employees");
      } else {
        const error = await res.json();
        alert(error.message || "Failed to update employee.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="email"
          name="employee_email"
          value={formData.employee_email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="employee_first_name"
          value={formData.employee_first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="employee_last_name"
          value={formData.employee_last_name}
          onChange={handleChange}
          placeholder="Last Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="employee_phone"
          value={formData.employee_phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="company_role_id"
          value={formData.company_role_id}
          onChange={handleChange}
          placeholder="Role ID"
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
