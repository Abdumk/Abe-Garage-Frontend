import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import customerService from "../../../../services/customer.service";
import { useNavigate } from "react-router-dom";
import EditCustomers from "../EditCustomerForm/EditCustomerForm"; // Import the EditCustomers component

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  const navigate = useNavigate();
  let token = employee?.employee_token || null;
 const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    customerService.getAllCustomers(token)
      .then((res) => {
        if (!res.ok) {
          setApiError(true);
          setApiErrorMessage(
            res.status === 401 ? "Please login again"
            : res.status === 403 ? "You are not authorized to view this page"
            : "Please try again later"
          );
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data?.length) {
          setCustomers(data.data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleEdit = (customer) => {
    navigate(`/admin/customer/${customer.customer_id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const res = await customerService.deleteCustomer(id, token);
        if (res.ok) {
          setCustomers((prev) => prev.filter((c) => c.customer_id !== id));
        } else {
          alert("Failed to delete customer.");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("An error occurred.");
      }
    }
  };

  return (
    <>
      {apiError ? (
        <h2>{apiErrorMessage}</h2>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Customers</h2>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Active</th>

                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>

                    <td>{customer.customer_first_name}</td>
                    <td>{customer.customer_last_name}</td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.customer_phone}</td>
                    <td>
                      {format(
                        new Date(customer.customer_added_date),
                        "MM - dd - yyyy | kk:mm"
                      )}
                    </td>
                    <td>{customer.active_customer_status ? "Yes" : "No"}</td>

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
      onClick={() => handleEdit(customer)} // ✅ Pass the whole customer object
    />
    <FaTrash
      style={{ cursor: "pointer", color: "white" }}
      onClick={() => handleDelete(customer.customer_id)} // ✅ Pass just the ID
    />
  </div>
</td>
                  </tr>
                ))}
              </tbody>
            </Table>
{/* 
{editModalOpen && selectedEmployee && (
  // <EditEmployee
  <EditCustomers
    employee={selectedEmployee}
    onClose={() => setEditModalOpen(false)}
    onSave={fetchEmployees} // refetch employees after save
  />
)} */}



          </div>
        </section>
      )}
    </>
  );
};

export default CustomersList;
