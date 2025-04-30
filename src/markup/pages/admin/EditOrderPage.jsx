import React from 'react';
import { useAuth } from "../../../Contexts/AuthContext";
import LoginForm from '../../components/LoginForm/LoginForm';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import EditOrderForm from '../../components/Admin/EditOrdersList/EditOrdersList';

function EditOrderPage() {
  const { isLogged, isAdmin } = useAuth();

  if (!isLogged) return <LoginForm />;
  if (!isAdmin) return (
    <div className="container mt-5">
      <div className="alert alert-danger">
        You are not authorized to access this page
      </div>
    </div>
  );

  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <EditOrderForm />
        </div>
      </div>
    </div>
  );
}

export default EditOrderPage;