import React from 'react';
import { useAuth } from "../../../Contexts/AuthContext";
import LoginForm from '../../components/LoginForm/LoginForm';
import AdminMenu from '../../../markup/components/Admin/AdminMenu/AdminMenu';
import NewOrderForm from '../../components/Admin/NewOrder/NewOrderForm';

function NewOrder() {
    const { isLogged, isAdmin } = useAuth();
     
       if (isLogged) {
         if (isAdmin) {
        return (
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <div className="p-3">
                  <NewOrderForm />
                </div>
              </div>
            </div>
          </div>
    );
  } else {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          You are not authorized to access this page
        </div>
      </div>
    );
  }
} else {
  return <LoginForm />;
}
}

export default NewOrder;