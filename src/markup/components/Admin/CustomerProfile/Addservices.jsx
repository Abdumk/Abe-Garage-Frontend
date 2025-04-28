import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import "./ServiceManager.css";
import CommonService from "../../../../services/commonServices.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const Addservices = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceDescription, setNewServiceDescription] = useState("");
  const { employee } = useAuth();

  const getToken = () => {
    return employee?.employee_token || localStorage.getItem("employee_token");
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
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
        setServices(data?.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchServices();
  }, [employee]);

  const handleCheckboxChange = (serviceId) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  const handleAddService = async () => {
    const token = getToken();
    if (!token) return;

    if (newServiceName.trim() && newServiceDescription.trim()) {
      const newService = {
        service_name: newServiceName,
        service_description: newServiceDescription,
      };
      try {
        await CommonService.createCommonService(newService, token);
        const res = await CommonService.getAllCommonService(token);
        const data = await res.json();
        setServices(data?.data || []);
        setNewServiceName("");
        setNewServiceDescription("");
      } catch (err) {
        console.error("Failed to create service:", err);
      }
    }
  };

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
                  onClick={() => navigate("/login")}
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
    // <div className="page-wrapper d-flex justify-content-center align-items-center py-5">
          
    <div className="all page-wrapper">
      <section className="services-section py-5">
        <div className="container">
          <div className="sec-title style-two">
            <h2>Choose Services</h2>
          </div>

          <div className="row">
  {services.map((service) => (
    <div key={service.service_id} className="col-md-12 mb-3">
      <div className="p-2 border rounded shadow-sm bg-white d-flex justify-content-between align-items-center">
        <div className="flex-grow-1">
          <h5 className="fw-bold mb-1">{service.service_name}</h5>
          <p className="text-muted mb-0">{service.service_description}</p>
        </div>
        <div>
          <input
            type="checkbox"
            className="form-check-input"
            checked={selectedServices.includes(service.service_id)}
            onChange={() => handleCheckboxChange(service.service_id)}
          />
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
                <h2>Addtional request</h2>
              </div>
              <div className="add-service">
               
                <textarea
                  className="form-control custom-textarea mb-4"
                  placeholder="Service description"
                  rows={6}
                  value={newServiceDescription}
                  onChange={(e) => setNewServiceDescription(e.target.value)}
                />
                 <input
                  type="text"
                  className="form-control custom-input mb-1"
                  placeholder="Price"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                />
                <button
                  className="btn btn-danger px-4 py-2 text-uppercase fw-bold"
                  onClick={handleAddService}
                >
                  SUBMIT ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addservices;
