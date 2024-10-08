// CartPage.jsx
import React from 'react';
import { useCart } from '../Cart/CartContext/CartContext';
import { Link } from 'react-router-dom';
import './cart.css'; // Optional: You can add your styles here

const CartPage = () => {
    const { cartItems, addToCart } = useCart();

    const handleQuantityChange = (productId, action) => {
        addToCart({
            id: productId,
            quantity: action === 'increase' ? 1 : -1, // Increase or decrease quantity by 1
        });
    };

    const handleQuantityInput = (productId, value) => {
        const newQuantity = Math.max(parseInt(value, 10) || 1, 1);
        addToCart({
            id: productId,
            quantity: newQuantity - 1, // Adjust by the difference from current
        });
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div>Your cart is empty.</div>
            ) : (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item flex items-center justify-between border-b py-4">
                            <div className="flex items-center">
                                <img src={item.image} alt={item.name} className="w-20 h-20 mr-4" />
                                <div>
                                    <h2 className="font-bold">{item.name}</h2>
                                    <p>{item.price} SAR</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                                    className="px-2 py-1 border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200"
                                    disabled={item.quantity === 1}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={item.quantity}
                                    className="mx-2 w-12 text-center border border-gray-300"
                                    onChange={(e) => handleQuantityInput(item.id, e.target.value)}
                                />
                                <button
                                    onClick={() => handleQuantityChange(item.id, 'increase')}
                                    className="px-2 py-1 border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold mt-4">
                        <span>Total Price:</span>
                        <span>{calculateTotalPrice()} SAR</span>
                    </div>
                </div>
            )}
            <Link to="/" className="mt-4 text-blue-600 hover:underline">Continue Shopping</Link>
        </div>
    );
};

export default CartPage;
