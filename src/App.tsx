
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
                <Routes>
                        <Route path="/" element="Produit Exercice"/>
                </Routes>
            {/* </AuthContext.Provider> */}
            </BrowserRouter>
    )
        ;
}

export default App;
