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

import Customers from './markup/pages/admin/Customers';

// Import the AddVehiclePage component
 import AddVehicle from './markup/pages/admin/AddVehicle';
// Import the AdminDashboard component
import AdminDashboard from './markup/pages/admin/AdminDashboardpage';
// Import the PrivateAuthRoute component 
import PrivateAuthRoute from './markup/components/Auth/PrivateAuthRoute';
// Import Orders component
import Orders from './markup/pages/admin/Orders';
// Import Unauthorized component
import Unauthorized from './markup/pages/Unauthorized';
// Import the Employees
import Employees from './markup/pages/admin/Employees';
// Import the Neworder component
import Neworder from './markup/pages/admin/Neworder';
// Import the Services Manager component
import ServicesManager from './markup/pages/admin/ServicesManager';

import EditEmployee from './markup/components/Admin/AddEmployeeForm/EditEmployee';
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
         <Route path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          } />
        {/* // Add the New order Route  */}
        <Route path="admin/order" element={<Neworder />} />  

    {/* // Add the Add Employees Route  */}
         <Route path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          } />
       
       {/* // Add the Employees list Route N:B the autorization code write in itself component */}
        <Route path="/admin/employees" element={<Employees />} /> 


         {/* // Add the Customers Route  */}
        <Route path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AddVehicle />
            </PrivateAuthRoute>
          } />

        {/* // Add the Add Vehicle Route  */}
        <Route path="/admin/add-customer" element={<Customers  />} /> 

        {/* // Add the Services Route  */}
        <Route path="/admin/services" element={<ServicesManager />} />  
        <Route path="/admin/edit-employee/:id" element={<EditEmployee />} />



        
        {/* <Route path="/admin/add-customer" element={<Customers />} />  */}


      </Routes>
      <Footer />
    </>
  );
}

export default App;


