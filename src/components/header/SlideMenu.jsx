import React, { useState, useEffect, useRef } from 'react';
import categories from '../categories/categories'; // Import your categories data
import './SlideMenu.css'; // Custom styles for the slide menu

const SlideMenu = ({ isOpen, toggleMenu }) => {
    const menuRef = useRef(null);

    // State to manage which category is open
    const [openCategoryId, setOpenCategoryId] = useState(null);

    // Function to handle category click
    const handleCategoryClick = (categoryId) => {
        // Toggle the selected category
        setOpenCategoryId((prevCategoryId) => (prevCategoryId === categoryId ? null : categoryId));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                toggleMenu();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleMenu]);

    return (
        <>
            {isOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
            <div ref={menuRef} className={`slide-menu ${isOpen ? 'open' : ''}`}>
                <div className="menu-header">
                    <button onClick={toggleMenu} className="close-btn">
                        <i className="fa-solid fa-times"></i>
                    </button>
                    <div className="welcome-message">
                        <p>Welcome, Guest!</p>
                        <button className="sign-in-btn">Sign In / Register</button>
                    </div>
                </div>
                <div className="menu-content">
                    {categories.map((category) => (
                        <div key={category.id} className="category-item">
                            <div
                                className="category-header"
                                onClick={() => handleCategoryClick(category.id)}
                            >
                                <span>{category.name}</span>
                                <i className={`fa-solid ${openCategoryId === category.id ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </div>
                            {openCategoryId === category.id && (
                                <div className="subcategory-list">
                                    {category.subcategories.map((subcategory) => (
                                        <div key={subcategory.id} className="subcategory-item">
                                            {subcategory.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SlideMenu;
