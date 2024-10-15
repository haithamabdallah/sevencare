// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import CategoryPage from "./components/categories/CategoryPage";
import SubCategoryPage from "./components/categories/SubCategoryPage";
import ProductPage from "./components/ProductPage/ProductPage";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import { CartProvider } from './components/Cart/CartContext/CartContext';
import CartPage from "./components/Cart/CartPage";
import Privacy from "./components/pages/Privacy";
import Terms from "./components/pages/Terms";
import About from "./components/pages/About";
import Faq from "./components/pages/Faq";
import Exchange from "./components/pages/Exchange";
import DeliveryInfo from "./components/pages/DeliveryInfo";
import Contactus from "./components/pages/Contactus";
import Stores from "./components/pages/Stores";
import Corporate from "./components/pages/Corporate";

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
                        <Route path="/category/:categorySlug/:subCategorySlug/product/:productId" element={<ProductPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/faq" element={<Faq />} />
                        <Route path="/exchange-return" element={<Exchange />} />
                        <Route path="/delivery-information" element={<DeliveryInfo />} />
                        <Route path="/stores" element={<Stores />} />
                        <Route path="/corporate" element={<Corporate />} />
                        <Route path="/contacts" element={<Contactus />} />
                    </Routes>
                </Layout>
            </CartProvider>
        </Router>
    </React.StrictMode>
);
