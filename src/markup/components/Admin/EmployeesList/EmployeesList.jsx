// Import the necessary components
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";
// Import the date-fns library
import { format } from "date-fns"; // To properly format the date on the table
// Import the getAllEmployees function
import employeeService from "../../../../services/employee.service";
import EditEmployee from "../AddEmployeeForm/EditEmployee"; // Import the EditEmployee component
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
// Create the EmployeesList component
const EmployeesList = () => {
  // Create all the states we need to store the data
  // Create the employees state to store the employees data
  const [employees, setEmployees] = useState([]);
  // A state to serve as a flag to show the error message
  const [apiError, setApiError] = useState(false);
  // A state to store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // To get the logged in employee token
  const { employee } = useAuth();
  const navigate = useNavigate(); // To navigate to different routes
  let token = null; // To store the token
  if (employee) {
    token = employee.employee_token;
  }
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  useEffect(() => {
    
    // Call the getAllEmployees function
    const allEmployees = employeeService.getAllEmployees(token);
    allEmployees
      .then((res) => {
        if (!res.ok) {
          console.log(res.status);
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (res.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        return res.json();
      })
      .then((data) => {
        if (data.data.length !== 0) {
          setEmployees(data.data);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
      fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    employeeService.getAllEmployees(token)
      .then((res) => {
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (res.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        return res.json();
      })
      .then((data) => {
        if (data.data.length !== 0) {
          setEmployees(data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
      });
  };
  

  const handleEdit = (employee) => {
    // You can redirect to an edit form page or open a modal here
    setSelectedEmployee(employee);
  setEditModalOpen(true);
    console.log("Edit clicked for:", employee);
    navigate(`/admin/edit-employee/${employee.employee_id}`);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const res = await employeeService.deleteEmployee(id, token);
        if (res.ok) {
          // Filter out deleted employee from the UI
          setEmployees((prev) => prev.filter((e) => e.employee_id !== id));
          console.log("Employee deleted successfully");
        } else {
          const errorText = await res.text();
          console.error("Delete failed:", errorText);
          alert("Failed to delete employee.");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("An error occurred while deleting the employee.");
      }
    }
  };
  

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Employees</h2>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Active</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Role</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.employee_id}>
                      <td>{employee.active_employee ? "Yes" : "No"}</td>
                      <td>{employee.employee_first_name}</td>
                      <td>{employee.employee_last_name}</td>
                      <td>{employee.employee_email}</td>
                      <td>{employee.employee_phone}</td>
                      <td>
                        {format(
                          new Date(employee.added_date),
                          "MM - dd - yyyy | kk:mm"
                        )}
                      </td>
                      <td>{employee.company_role_name}</td>
                      {/* <td>
                        <div style={{ display: "flex", gap: "10px", backgroundColor: "red", padding: "10px" }}>
  <FaEdit style={{ cursor: "pointer", color: "white" }} />
  <FaTrash style={{ cursor: "pointer", color: "white" }} />
</div>

                      </td> */}
                      <td>
  <div
    style={{
      display: "flex",
      gap: "10px",
      backgroundColor: "red",
      padding: "10px",
    }}
  >
    <FaEdit
      style={{ cursor: "pointer", color: "white" }}
      onClick={() => handleEdit(employee)}
    />
    <FaTrash
      style={{ cursor: "pointer", color: "white" }}
      onClick={() => handleDelete(employee.employee_id)}
    />
  </div>
</td>
                    </tr>
                  ))}
                </tbody>
  
              </Table>
              {editModalOpen && selectedEmployee && (
  <EditEmployee
    employee={selectedEmployee}
    onClose={() => setEditModalOpen(false)}
    onSave={fetchEmployees} // refetch employees after save
  />
)}
            </div>
          </section>
        </>
      )}
    </>
  );
};

// Export the EmployeesList component
export default EmployeesList;
