// Import react 
import React from 'react';
// Import the Routes and Route components from react-router 
import { Routes, Route } from "react-router";


// Import the css files 
import "./assets/template_assets/css/bootstrap.css"; 
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";


// Import the custom css file 
import "./assets/styles/custom.css";

// Import the Header component 
import Header from '../src/markup/components/Header/Header';
// Import the Footer component
import Footer from '../src/markup/components/Footer/Footer';
// import the Login component
import Login from '../src/markup/components/LoginForm/LoginForm';
// import the Home component
import Home from '../src/markup/pages/Home';
// import the AddEmployee component
import AddEmployee from '../src/markup/pages/admin/AddEmployee';
// import the Services component
import Services from '../src/markup/pages/Services';
// import the About component
import About from '../src/markup/pages/About';
// import the Contact component
import Contact from '../src/markup/pages/Contact';
// Import the Addcutomers component
import AddCustomers from './markup/pages/admin/AddCustomers';
// Import the cutomersList component
import CutomerList from './markup/pages/admin/CustomersList';

// Import the AddVehiclePage component
//  import AddVehicle from './markup/pages/admin/AddVehicle';
// Import the AdminDashboard component
import AdminDashboard from './markup/pages/admin/AdminDashboardpage';
// Import the PrivateAuthRoute component 
import PrivateAuthRoute from './markup/components/Auth/PrivateAuthRoute';
// Import Orders component
// import Orders from './markup/pages/admin/Orders';
// Import Unauthorized component
import Unauthorized from './markup/pages/Unauthorized';
// Import the Employees
import Employees from './markup/pages/admin/Employees';
// Import the Neworder component
// import Neworder from './markup/pages/admin/Neworder';
// Import the Services Manager component
import ServicesManager from './markup/pages/admin/ServicesManager';

import EditEmployees from './markup/pages/admin/EditEmployes';
import EditCustomer from './markup/pages/admin/EditCustomer'; 
// Import the CustomerProfile component 
// import CustomerProfile from './markup/pages/admin/CustomersProfile';
import CustomerProfile from './markup/components/Admin/CustomerProfile/CustomerProfile';
//Import the NewOrder 
import NewOrder from './markup/pages/admin/Neworder';
//Import the OrderDetails 
// import OrderDetails from './markup/components/Admin/Orders/Orders';  
import OrderDetails from '../src/markup/pages/admin/Orders';
// import EditOrderPage
import EditOrderPage from '../src/markup/pages/admin/EditOrderPage';

// import the AddVehicleForm
import AddVehicleForm from './markup/components/Admin/AddVehicleForm/AddVehicleForm';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} /> 
        <Route path="/admin" element={<AdminDashboard   />} /> 


         {/* // Add the Orders Route  */}
         {/* <Route path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          } /> */}
      

    {/* // Add the Add Employees Route  */}
         <Route path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          } />
       
       {/* // Add the Employees list Route N:B the autorization code write in itself component */}
        {/* <Route path="/admin/employees" element={<Employees />} />  */}
        <Route path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Employees />
            </PrivateAuthRoute>
          } />




         {/* // Add the CustomerList Route  */}
        <Route path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CutomerList />
            </PrivateAuthRoute>
          } />
            

        {/* // Add the Add Customer Route  */}
        <Route path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
            <AddCustomers  />
            </PrivateAuthRoute>
          } />
        {/* // Add the Services Route  */}
        <Route path="/admin/services"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <ServicesManager />
            </PrivateAuthRoute>
          } /> 
        {/* <Route path="/admin/edit-employee/:id" element={<EditEmployee />} /> */}
        <Route path="/admin/employee/:id" element={<EditEmployees />} />
        <Route path="/admin/customer/:id" element={<EditCustomer />} />

       
        <Route path="/admin/orders/edit/:id" element={<EditOrderPage />} />


<Route 
  path="/admin/customer-profile/:customerId"
  element={
    <PrivateAuthRoute roles={[2, 3]}>
      <CustomerProfile />
    </PrivateAuthRoute>
  }
/>
  {/* // Add the New order Route  */}
        {/* <Route path="admin/order" element={<Neworder />} />   */}
<Route 
  path="/admin/order"
  element={
    <PrivateAuthRoute roles={[1, 2, 3]}>
      <NewOrder />
    </PrivateAuthRoute>
  }
/>
<Route 
  // path="/admin/orders/:orderId"
  path="/admin/orders"
  element={
    <PrivateAuthRoute roles={[1, 2, 3]}>
      <OrderDetails />
    </PrivateAuthRoute>
  }
/>
<Route 
  path="/admin/add-vehicle/:customer-Id"
  element={
    <PrivateAuthRoute roles={[2, 3]}>
      <AddVehicleForm />
    </PrivateAuthRoute>
  }
/>

      </Routes>
      <Footer />
    </>
  );
}

export default App;


