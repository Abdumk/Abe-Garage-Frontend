import React from 'react'
// Import the AddEmployeeForm component 
import CustomerProfile from '../../components/Admin/CustomerProfile/CustomerProfile'; 
// Import the AdminMenu component 
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
// Import the auth hook 
import { useAuth } from "../../../Contexts/AuthContext";
// Import the login form component 
import LoginForm from '../../components/LoginForm/LoginForm';
function CustomersProfile() {
      // Destructure the auth hook 
      const { isLogged, isAdmin } = useAuth();
    
      if (isLogged) {
    
        console.log("Kebede");
    
        if (isAdmin) {
  return (
    <div className="container-fluid admin-pages">
    <div className="row">
      <div className="col-md-3 admin-left-side">
        <AdminMenu />
      </div>
      <div className="col-md-9 admin-right-side">
        <CustomerProfile />
      </div>
    </div>
  </div>

);
} else {
  return (
    <div>
      <h1>You are not authorized to access this page</h1>
    </div>
  );
}
} else {
return (
  <div>
    <LoginForm />
  </div>
);
}
}

export default CustomersProfile