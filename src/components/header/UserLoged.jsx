import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Ensure the correct path

const UserLoged = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="relative">
            {/* Username Button */}
            <button
                className="text-black font-bold text-sm flex items-center gap-2"
                onClick={toggleDropdown}
            >
                <i className="text-blue-600 fa-regular fa-user"></i>
                <span>{user.name}</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                    <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                        My Account
                    </Link>
                    <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                        Orders
                    </Link>
                    <Link
                        to="/wishlist"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                        Wishlist
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserLoged;

/*

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Example() {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Options
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            Account settings
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            Support
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            License
                        </a>
                    </MenuItem>
                    <form action="#" method="POST">
                        <MenuItem>
                            <button
                                type="submit"
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                                Sign out
                            </button>
                        </MenuItem>
                    </form>
                </div>
            </MenuItems>
        </Menu>
    )
}
*/
