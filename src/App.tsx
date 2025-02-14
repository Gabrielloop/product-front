import Layout from "layout/Layout";
import About from "pages/About";
import Admin from "pages/Admin";
import Dashboard from "pages/Dashboard";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Products from "pages/Products";
import ProductDetails from "pages/ProductDetails";
import Cart from "pages/Cart";
import { AuthContext } from "auth/AuthContext";
import { getUserRole } from "auth/authUtils.service";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUserId, setLoginUserId] = useState(1);
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [loginUserRole, setLoginUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userEmailInToken = getUserRole();
      setIsLoggedIn(true);
      setLoginUserRole(userEmailInToken);
    }
    console.log("loginUserEmail", loginUserEmail);
    console.log("loginUserRole", loginUserRole);
  }, [isLoggedIn]);

  console.log(
    "user is connected:",
    isLoggedIn ? "yes" : "no",
    "user id:",
    loginUserId
  );
  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          loginUserId,
          setLoginUserId,
          loginUserEmail,
          setLoginUserEmail,
          loginUserRole,
          setLoginUserRole,
        }}
      >
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/about" />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<h2>404 - Not Found</h2>} />
          </Routes>
        </Layout>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
