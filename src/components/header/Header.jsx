import React, { useEffect, useState, useRef } from 'react';

const Header = ({ changeLanguage, currentLanguage }) => {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const dropdownRef = useRef(null);
    const delta = 5;

    useEffect(() => {
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;

            // Check if the user is at the top of the page
            if (st === 0) {
                setIsAtTop(true);
            } else {
                setIsAtTop(false);
            }

            if (Math.abs(lastScrollTop - st) <= delta) {
                return;
            }

            if (st > lastScrollTop) {
                setIsScrollingUp(false);
            } else {
                setIsScrollingUp(true);
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
            <div className="max-w-[1230px] px-[20px] mx-auto">
                <div className={`header-row-1 p-4 flex items-center justify-between transition-colors duration-300 ${
                    isAtTop ? 'bg-transparent' : 'bg-white'
                }`}>
                    {/* Row 1: Logo and Nav */}
                    <div className="font-bold text-xl">Logo</div>
                    <nav className="flex items-center gap-[15px]">
                        {currentLanguage === 'en' ? (
                            <button onClick={() => changeLanguage('ar')}>العربية</button>
                        ) : (
                            <button onClick={() => changeLanguage('en')}>English</button>
                        )}
                        <a href="/signin" className="text-gray-600">Sign In / Register</a>
                        <a href="/favorites" className="text-gray-600">Favorites</a>
                        <a href="/cart" className="text-gray-600">My Cart</a>
                    </nav>
                </div>
                <div className="bg-gray-100 flex justify-between items-center mt-[5px]">
                    {/* Row 2: Categories and Search */}
                    <div className="flex items-center gap-[30px] relative">
                        <button onClick={toggleDropdown} className="flex justify-between gap-[15px] items-center text-white p-4 bg-blue-600 min-w-[250px]">
                            <i className="fa-solid fa-border-none"></i>
                            <span className="font-bold">All Categories</span>
                            <i className="fa-solid fa-chevron-down"></i>
                        </button>
                        {isDropdownOpen && (
                            <div ref={dropdownRef} className="absolute top-[50px] left-0 mt-2 w-[400px] bg-white shadow-lg divide-y divide-gray-400">
                                <a href="#category1" className="flex justify-between items-center px-4 py-2 text-gray-700">
                                    <span className="font-bold">Category 1</span>
                                    <i className="fa-solid fa-chevron-right fa-sm text-blue-600"></i>
                                </a>
                                <a href="#category2" className="block px-4 py-2 text-gray-700">Category 2</a>
                                <a href="#subcategory1" className="block px-4 py-2 text-gray-700">Subcategory 1</a>
                            </div>
                        )}
                        <a href="#offer" className="text-red-600 font-bold">Offer</a>
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
