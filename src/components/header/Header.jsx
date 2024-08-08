import React, { useEffect, useState, useRef } from 'react';

const Header = () => {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const delta = 5;

    useEffect(() => {
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;

            if (Math.abs(lastScrollTop - st) <= delta) {
                return;
            }

            if (st > lastScrollTop) {
                setIsScrollingUp(false); // Scrolling down
            } else {
                setIsScrollingUp(true); // Scrolling up
            }

            setLastScrollTop(st);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header
            className={`w-full transition-transform duration-300 fixed top-0 left-0 transform ${
                isScrollingUp ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <div className="max-w-[1230px] px-[20px] bg-white mx-auto">
                <div className="p-4 flex justify-between items-center">
                    {/* Row 1: Logo and Nav */}
                    <div className="flex items-center space-x-4">
                        <div className="font-bold text-xl">Logo</div>
                        <nav className="flex items-center space-x-4">
                            <a href="#language" className="text-gray-600">Language</a>
                            <a href="#signin" className="text-gray-600">Sign In / Register</a>
                            <a href="#favorites" className="text-gray-600">Favorites</a>
                            <a href="#cart" className="text-gray-600">My Cart</a>
                        </nav>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 flex justify-between items-center">
                    {/* Row 2: Categories and Search */}
                    <div className="flex items-center space-x-4 relative">
                        <button onClick={toggleDropdown} className="text-gray-600">
                            All Categories
                        </button>
                        {isDropdownOpen && (
                            <div ref={dropdownRef} className="absolute left-0 mt-2 w-48 bg-white shadow-lg">
                                <a href="#category1" className="block px-4 py-2 text-gray-700">Category 1</a>
                                <a href="#category2" className="block px-4 py-2 text-gray-700">Category 2</a>
                                <a href="#subcategory1" className="block px-4 py-2 text-gray-700">Subcategory 1</a>
                            </div>
                        )}
                        <a href="#offer" className="text-gray-600">Offer</a>
                    </div>
                    <div>
                        <input type="text" placeholder="Search" className="border border-gray-300 p-2" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
