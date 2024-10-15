// src/components/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create AuthContext
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user is logged in from localStorage (on initial load)
    useEffect(() => {
        const savedLoginState = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (savedLoginState) {
            setIsLoggedIn(savedLoginState);
        }
    }, []);

    // Login and Logout Handlers
    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', true); // Save login status
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn'); // Clear login status
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
