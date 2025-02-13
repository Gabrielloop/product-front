import Layout from "layout/Layout";
import About from "pages/About";
import Admin from "pages/Admin";
import Dashboard from "pages/Dashboard";
import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Products from "pages/Products";
import ProductDetails from "pages/ProductDetails";
import Cart from "pages/Cart";
import { Context } from "react-helmet-async/lib/Provider";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUserId, setLoginUserId] = useState(1);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  console.log(
    "user is connected:",
    isLoggedIn ? "yes" : "no",
    "user id:",
    loginUserId
  );
  return (
    <BrowserRouter>
      {/* <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, loginUserId, setLoginUserId}}> */}
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/about" />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<h2>404 - Not Found</h2>} />
        </Routes>
        {/* </AuthContext.Provider> */}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
