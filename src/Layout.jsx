import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from "./Spinner";

const Layout = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust timing as needed

        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="fade-in">
                    {children}
                </div>
            )}
        </>
    );
};

export default Layout;
