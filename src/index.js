import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n'; // Import the i18n setup file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import CategoryPage from "./components/categories/CategoryPage";
import SubCategoryPage from "./components/categories/SubCategoryPage";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import { CartProvider } from './components/Cart/CartContext/CartContext';
import CartPage from "./components/Cart/CartPage";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router>
            <CartProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/category/:categorySlug" element={<CategoryPage />} />
                        <Route path="/category/:categorySlug/:subCategorySlug" element={<SubCategoryPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/cart" element={<CartPage />} />
                    </Routes>
                </Layout>
            </CartProvider>
        </Router>
    </React.StrictMode>
);
