import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ServicesPage from "./Pages/ServicesPage";
import Gallery from "./Pages/Gallery";
import ContactPage from "./Pages/ContactPage";
import FloatingActions from "./components/FloatingActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
    <FloatingActions/>
    
      {/* Toastify (keep this once in the app) */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Routes>
        {/* Layout wrapper for nested routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/services" element={<ServicesPage/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/contact" element={<ContactPage/>}/>

          {/* Add more routes here if needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
