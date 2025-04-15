import React from 'react'

import EditCustomers from '../../components/Admin/EditCustomerForm/EditCustomerForm';
// Import the AdminMenu component 
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';

function EditCustomer() {
    return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <EditCustomers />
              </div>
            </div>
          </div>
        </div>
      )
}

export default EditCustomer



