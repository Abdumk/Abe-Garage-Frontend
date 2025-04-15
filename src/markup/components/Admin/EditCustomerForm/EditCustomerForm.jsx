import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const EditCustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();
  let token = null; // To store the token
  if (employee) {
    token = employee.employee_token;
  }

  const [formData, setFormData] = useState({
    customer_email: "",
    customer_first_name: "",
    customer_last_name: "",
    customer_phone: "",
    active_customer: 0
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    console.log("EditCustomerForm component loaded with ID:", id);
    console.log("Token being sent:", token);

    const fetchCustomer = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token
          }
        });

        const data = await res.json();
        console.log("Response data:", data);
        if (res.ok && data?.data) {
          console.log("Response data:", 
          );
          setFormData({
            customer_email: data.data[0].customer_email || "",
            customer_first_name: data.data[0].customer_first_name || "",
            customer_last_name: data.data[0].customer_last_name || "",
            customer_phone: data.data[0].customer_phone_number || "",
            active_customer: data.data[0].active_customer_status || 0
          });
        } else {
          setErrorMsg(data.message || "Failed to fetch customer.");
        }
      } catch (error) {
        setErrorMsg("Something went wrong while fetching customer data.");
        console.error("Error fetching customer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
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
      const res = await customerService.editCustomer(id, formData, token);
      const data = await res.json();

      if (res.ok) {
        alert("Customer updated successfully!");
        navigate(`/admin/customer/${employee.employee_id}`);
      } else {
        alert(data.message || "Failed to update customer.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong.");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading customer data...</p>;
  if (errorMsg) return <p className="text-red-600 text-center mt-6">{errorMsg}</p>;

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit: {formData.customer_first_name} {formData.customer_last_name}</h2>
          <h5>
            Customer email: <span className="text-black">{formData.customer_email}</span>
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
                        name="customer_first_name"
                        value={formData.customer_first_name}
                        onChange={handleChange}
                        placeholder="First Name"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        value={formData.customer_last_name}
                        onChange={handleChange}
                        placeholder="Customer Last Name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone"
                        value={formData.customer_phone}
                        onChange={handleChange}
                        placeholder="Customer phone (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="active_customer"
                        checked={formData.active_customer === 1}
                        onChange={handleChange}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <label className="text-gray-700 font-medium">Is active customer</label>
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

export default EditCustomerForm;
