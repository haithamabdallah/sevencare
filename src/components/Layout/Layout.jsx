// Layout.jsx
import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import MobileHeader from "../header/MobileHeader";

const Layout = ({ children, changeLanguage, currentLanguage }) => {
    return (
        <div>
            <Header changeLanguage={changeLanguage} currentLanguage={currentLanguage} />
            <MobileHeader />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
