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

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-employee" element={<AddEmployee />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;


