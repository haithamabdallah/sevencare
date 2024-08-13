import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import categories from '../categories/categories';
import './header.css';

const Header = ({ changeLanguage, currentLanguage }) => {
    const { t } = useTranslation();
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const dropdownRef = useRef(null);
    const delta = 5;

    useEffect(() => {
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;

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

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    return (
        <header
            className={`default-header w-full transition-transform duration-300 fixed top-0 left-0 transform ${
                isScrollingUp ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <div className="max-w-[1230px] px-[20px] mx-auto">
                <div className={`header-row-1 p-4 flex items-center justify-between transition-colors duration-300 ${
                    isAtTop ? 'bg-transparent' : 'bg-white'
                }`}>
                    {/* Row 1: Logo and Nav */}
                    <div className="d-logo font-bold text-xl">
                        <Link to="/" className="block">
                            <img src="/images/logo/logo.png" alt="Seven Care Logo"/>
                        </Link>
                    </div>
                    <nav className="flex items-center gap-[15px]">
                        {currentLanguage === 'en' ? (
                            <button onClick={() => changeLanguage('ar')}>العربية</button>
                        ) : (
                            <button onClick={() => changeLanguage('en')}>English</button>
                        )}
                        <Link to="/signin" className="text-gray-600">{t('headers.sign-in')}</Link>
                        <Link to="/favorites" className="text-gray-600">{t('headers.my-favourite')}</Link>
                        <Link to="/cart" className="text-gray-600">{t('headers.my-cart')}</Link>
                    </nav>
                </div>
                <div className="bg-gray-100 flex justify-between items-center mt-[5px]">
                    {/* Row 2: Categories and Search */}
                    <div
                        className="flex items-center gap-[30px] relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className="flex justify-between gap-[15px] items-center text-white p-4 bg-blue-600 min-w-[250px]">
                            <i className="fa-solid fa-border-none"></i>
                            <span className="font-bold">{t('all-categories')}</span>
                            <i className="fa-solid fa-chevron-down"></i>
                        </button>
                        {isDropdownOpen && (
                            <ul ref={dropdownRef} className="absolute top-[50px] left-0 mt-2 w-[400px] bg-white shadow-lg divide-y divide-gray-400">
                                {categories.map((category) => (
                                    <li key={category.id} className="group relative">
                                        <Link to={category.href} className="flex justify-between items-center px-4 py-2 text-gray-700">
                                            <span className="font-bold">{t(`categories.${category.slug}`)}</span>
                                            {category.subcategories && <i className="fa-solid fa-chevron-right fa-sm text-blue-600"></i>}
                                        </Link>
                                        {category.subcategories && (
                                            <ul className="absolute left-full top-0 mt-0 ml-2 w-[300px] bg-white shadow-lg hidden group-hover:block">
                                                {category.subcategories.map((sub) => (
                                                    <li key={sub.id}>
                                                        <Link to={`${category.href}/${sub.slug}`} className="block px-4 py-2 text-gray-700">
                                                            {t(`categories.${sub.slug}`)}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <Link to="/offers" className="text-red-600 font-bold">{t('offers')}</Link>
                    </div>
                    <div>
                        <input type="text" placeholder={t('search')} className="border border-gray-300 p-2" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
