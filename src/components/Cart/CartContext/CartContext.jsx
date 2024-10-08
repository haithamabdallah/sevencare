// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                // If product already exists, increase its quantity
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
                );
            } else {
                // If product is new, add it to the cart
                return [...prevItems, { ...product, quantity: product.quantity }];
            }
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
