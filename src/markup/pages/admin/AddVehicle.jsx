import React from 'react';
// Import the AdminMenu component 
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
// Import the AddVehicleForm component
import AddVehicleForm from '../../components/Admin/AddVehicleForm/AddVehicleForm'; // Adjust the path as necessary




function AddVehicle() {
  const customerId = 1; // You can dynamically get this from route or context
  const customerName = "Adugna Bekele"; // Same here, fetch or pass as prop

  return (
    // <div className="container-fluid">
    //   <div className="row">
    //     {/* Admin sidebar */}
    //     <div className="col-md-2 bg-light vh-100">
    //       <AdminMenu />
    //     </div>

    //     {/* Main content */}
    //     <div className="col-md-10 py-4">
    //       <h4 className="mb-3 text-primary">Add New Vehicle</h4>
    //       <div className="mb-3">
    //         <strong>Customer:</strong> {customerName} <br />
    //         <strong>Customer ID:</strong> {customerId}
    //       </div>

    //       <AddVehicleForm customerId={customerId} />
    //     </div>
    //   </div>
    // </div>


<div>
<div className="container-fluid admin-pages">
  <div className="row">
    <div className="col-md-3 admin-left-side">
      <AdminMenu />
    </div>
    <div className="col-md-9 admin-right-side">
    <AddVehicleForm  />


    </div>
  </div>
</div>
</div>
  );
}

export default AddVehicle;
