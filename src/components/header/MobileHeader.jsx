import React, { useState } from 'react';
import SlideMenu from './SlideMenu'; // Import the slide menu component
import './MobileHeader.css'; // Custom styles for mobile header

const MobileHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className="mobile-header">
                <button onClick={toggleMenu} className="hamburger-btn">
                    <i className="fa-solid fa-bars-staggered"></i>
                </button>
                <div className="d-logo font-bold text-xl">
                    <a href="/" className="block">
                        <img src="/images/logo/logo.png" alt="Seven Care Logo"/>
                    </a>
                </div>
                <div className="search-cart">
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button className="search-btn">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <button className="cart-btn">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </header>

            {/* Slide Menu */}
            <SlideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </>
    );
};

export default MobileHeader;
