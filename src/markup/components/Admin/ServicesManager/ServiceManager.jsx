import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ServiceManager.css";
import CommonService from "../../../../services/commonServices.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const ServicesManager = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const [services, setServices] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const { employee } = useAuth();
  
  // Get token from employee or fallback to localStorage
  const getToken = () => {
    return employee?.employee_token || localStorage.getItem('employee_token');
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      // Handle case when there's no token (user not logged in)
      setApiError(true);
      setApiErrorMessage("Please login again");
      return;
    }

    const fetchServices = async () => {
      try {
        const res = await CommonService.getAllCommonService(token);
        if (!res.ok) {
          setApiError(true);
          setApiErrorMessage(
            res.status === 401
              ? "Please login again"
              : res.status === 403
              ? "You are not authorized to view this page"
              : "Please try again later"
          );
          return;
        }
        const data = await res.json();
        if (data?.data?.length) {
          setServices(data.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchServices();
  }, [employee]); // Add employee as dependency

  const handleEdit = (id, service_name, service_description) => {
    setEditId(id);
    setEditedName(service_name);
    setEditedDescription(service_description);
  };

  const handleSave = async (id) => {
    const token = getToken();
    if (!token) return;
    
    try {
      const updatedService = {
        service_name: editedName,
        service_description: editedDescription,
      };
      await CommonService.editCommonService(id, updatedService, token);
      // Refresh services
      const res = await CommonService.getAllCommonService(token);
      const data = await res.json();
      if (data?.data?.length) {
        setServices(data.data);
      }
      setEditId(null);
      setEditedName("");
      setEditedDescription("");
    } catch (err) {
      console.error("Failed to update service:", err);
    }
  };

  const handleDelete = async (id) => {
    const token = getToken();
    if (!token) return;
    
    try {
      await CommonService.deleteCommonService(id, token);
      // Refresh services
      const res = await CommonService.getAllCommonService(token);
      const data = await res.json();
      if (data?.data?.length) {
        setServices(data.data);
      }
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  const handleAddService = async () => {
    const token = getToken();
    if (!token) return;
    
    if (editedName.trim() && editedDescription.trim()) {
      const newService = {
        service_name: editedName,
        service_description: editedDescription,
      };
      try {
        await CommonService.createCommonService(newService, token);
        // Refresh services
        const res = await CommonService.getAllCommonService(token);
        const data = await res.json();
        if (data?.data?.length) {
          setServices(data.data);
        }
        setEditedName("");
        setEditedDescription("");
      } catch (err) {
        console.error("Failed to create service:", err);
      }
    }
  };

  // If there's an API error (like unauthorized), show error message
  if (apiError) {
    return (
      <div className="all page-wrapper">
        <section className="services-section py-5">
          <div className="container">
            <div className="alert alert-danger">
              {apiErrorMessage}
              {apiErrorMessage === "Please login again" && (
                <button 
                  className="btn btn-link"
                  onClick={() => navigate('/login')}
                >
                  Go to Login
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="all page-wrapper">
      <section className="services-section py-5">
        <div className="container">
          {/* Section Title */}
          <div className="sec-title style-two">
            <h2>Services We Provide</h2>
            <div className="text">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution.
            </div>
          </div>

          {/* Services List */}
          <div className="row">
            {services.map((service) => (
              <div key={service.service_id} className="col-md-12 mb-3">
                <div className="p-2 border rounded shadow-sm bg-white">
                  <div className="row mb-1">
                    <div className="col-md-8">
                      {editId === service.service_id ? (
                        <>
                          <input
                            type="text"
                            className="form-control mb-1"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                          />
                          <textarea
                            className="form-control mb-1"
                            rows={3}
                            value={editedDescription}
                            onChange={(e) =>
                              setEditedDescription(e.target.value)
                            }
                          />
                        </>
                      ) : (
                        <>
                          <h4 className="fw-bold">{service.service_name}</h4>
                          <p className="text-muted">
                            {service.service_description}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="col-md-4 text-center">
                      {editId === service.service_id ? (
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleSave(service.service_id)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          style={{
                            backgroundColor: "transparent",
                            color: "#007bff",
                            border: "none",
                            padding: 0,
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            marginRight: "12px",
                          }}
                          className=" btn-sm me-3"
                          onClick={() =>
                            handleEdit(
                              service.service_id,
                              service.service_name,
                              service.service_description
                            )
                          }
                        >
                          <FaEdit />
                        </button>
                      )}
                      <button
                        style={{
                          backgroundColor: "transparent",
                          color: "red",
                          border: "none",
                          padding: 0,
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                        className=" btn-sm"
                        onClick={() => handleDelete(service.service_id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Service Form */}
          <div className="page-wrapper d-flex justify-content-center align-items-center py-5">
            <div
              className="service-card p-4 shadow bg-white rounded"
              style={{ maxWidth: "1100px", width: "100%" }}
            >
              <div className="sec-title style-two">
                <h2>Add a New Service</h2>
              </div>
              <div className="add-service">
                <input
                  type="text"
                  className="form-control custom-input mb-1"
                  placeholder="Service name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <textarea
                  className="form-control custom-textarea mb-4"
                  placeholder="Service description"
                  rows={6}
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                <button
                  className="btn btn-danger px-4 py-2 text-uppercase fw-bold"
                  onClick={handleAddService}
                >
                  Add Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesManager;