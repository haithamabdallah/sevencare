// Layout.jsx
import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Layout = ({ children, changeLanguage, currentLanguage }) => {
    return (
        <div>
            <Header changeLanguage={changeLanguage} currentLanguage={currentLanguage} />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
