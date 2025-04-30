import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import orderService from "../../../../services/order.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const EditOrdersForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();
  const token = employee?.employee_token || null;

  const [formData, setFormData] = useState({
    customer_id: "",
    vehicle_id: "",
    employee_id: "",
    order_description: "",
    order_date: "",
    estimated_completion_date: "",
    completion_date: "",
    order_completed: false,
    services: []
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderService.getOrderById(id, token);
        const data = await res.json();

        if (res.ok && data) {
          setFormData({
            customer_id: data.customer_id || "",
            vehicle_id: data.vehicle_id || "",
            employee_id: data.employee_id || "",
            order_description: data.order_description || "",
            order_date: data.order_date || "",
            estimated_completion_date: data.estimated_completion_date || "",
            completion_date: data.completion_date || "",
            order_completed: data.order_completed || false,
            services: data.services || []
          });
        } else {
          setErrorMsg(data.message || "Failed to fetch order.");
        }
      } catch (error) {
        setErrorMsg("Something went wrong while fetching order data.");
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleServiceChange = (serviceId, isChecked) => {
    setFormData(prev => {
      const services = isChecked 
        ? [...prev.services, serviceId]
        : prev.services.filter(id => id !== serviceId);
      return { ...prev, services };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await orderService.updateOrder(id, formData, token);
      const data = await res.json();

      if (res.ok) {
        alert("Order updated successfully!");
        navigate("/admin/orders");
      } else {
        alert(data.message || "Failed to update order.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong.");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading order data...</p>;
  if (errorMsg) return <p className="text-red-600 text-center mt-6">{errorMsg}</p>;

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit Order #{id}</h2>
        </div>
        
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <label>Order Description</label>
                      <textarea
                        name="order_description"
                        value={formData.order_description}
                        onChange={handleChange}
                        placeholder="Order description"
                        required
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label>Order Date</label>
                      <input
                        type="date"
                        name="order_date"
                        value={formData.order_date}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label>Estimated Completion</label>
                      <input
                        type="date"
                        name="estimated_completion_date"
                        value={formData.estimated_completion_date}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label>Actual Completion</label>
                      <input
                        type="date"
                        name="completion_date"
                        value={formData.completion_date}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label>Status</label>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          name="order_completed"
                          checked={formData.order_completed}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>Order Completed</span>
                      </div>
                    </div>

                    {/* Services Selection */}
                    <div className="form-group col-md-12">
                      <label>Services</label>
                      {/* Replace with your actual services data */}
                      {availableServices.map(service => (
                        <div key={service.id} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={`service-${service.id}`}
                            checked={formData.services.includes(service.id)}
                            onChange={(e) => handleServiceChange(service.id, e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor={`service-${service.id}`}>
                            {service.name} - ${service.price}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>UPDATE ORDER</span>
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

export default EditOrdersForm;