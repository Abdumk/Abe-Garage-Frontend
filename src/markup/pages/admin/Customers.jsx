import React from 'react'

// Import the AdminMenu component 
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
// Import the Addcutomers component
import AddCustomerForm from '../../components/Admin/AddCustomerForm/AddCustomerForm';
function Customers() {
    return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
             <AddCustomerForm />

              </div>
            </div>
          </div>
        </div>
      );
}

export default Customers