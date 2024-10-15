// Layout.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from "./Spinner";
import Header from "./components/header/Header";
import MobileHeader from "./components/header/MobileHeader";
import Footer from "./components/footer/Footer";

const Layout = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();
    const location = useLocation();

    const changeLanguage = (lng) => {
        setLoading(true);
        i18n.changeLanguage(lng).then(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className={`${i18n.language === 'ar' ? 'rtl' : 'ltr'} fade-in`}>
                    <Header changeLanguage={changeLanguage} currentLanguage={i18n.language} />
                    <MobileHeader />
                    <main>{children}</main>
                    <Footer />
                </div>
            )}
        </>
    );
};

export default Layout;
