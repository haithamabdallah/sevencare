import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import categories from '../categories/categories';
import './SlideMenu.css';

const SlideMenu = ({ isOpen, toggleMenu }) => {
    const menuRef = useRef(null);

    const [openCategoryId, setOpenCategoryId] = useState(null);

    const handleCategoryClick = (categoryId) => {
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
                                {/* Updated link to ensure proper slug path */}
                                <Link to={`/category/${category.slug}`} onClick={toggleMenu}>
                                    <span>{category.name}</span>
                                </Link>
                                <i className={`fa-solid ${openCategoryId === category.id ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </div>
                            {openCategoryId === category.id && (
                                <div className="subcategory-list">
                                    {category.subcategories.map((subcategory) => (
                                        <div key={subcategory.id} className="subcategory-item">
                                            {/* Updated subcategory link to ensure proper slug path */}
                                            <Link to={`/category/${category.slug}/${subcategory.slug}`} onClick={toggleMenu}>
                                                {subcategory.name}
                                            </Link>
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
