
import Layout from 'layout/Layout';
import About from 'pages/About';
import Admin from 'pages/Admin';
import Dashboard from 'pages/Dashboard';
import ProductsList from 'pages/ProductsList';
import React, {useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginUserId, setLoginUserId] = useState(1);
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    console.log('user is connected:', isLoggedIn ? 'yes' : 'no', 'user id:', loginUserId);
    return (
            <BrowserRouter>
            {/* <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, loginUserId, setLoginUserId}}> */}
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/about" />} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/products" element={<ProductsList/>} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/admin" element={<Admin/>} />
                    <Route path="*" element={<h2>404 - Not Found</h2>} />
                </Routes>
            {/* </AuthContext.Provider> */}
            </Layout>
            </BrowserRouter>
    )
        ;
}

export default App;
