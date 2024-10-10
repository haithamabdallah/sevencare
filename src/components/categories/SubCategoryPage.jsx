import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import categories from '../categories/categories'; // Ensure this is your JSON data source
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { useCart } from '../Cart/CartContext/CartContext';
import './subcategorypage.css';

const SubCategoryPage = () => {
    const { categorySlug, subCategorySlug } = useParams();
    const [subCategoryData, setSubCategoryData] = useState(null);
    const [breadcrumbData, setBreadcrumbData] = useState([]);
    const location = useLocation();

    // Fetch Subcategory Data
    useEffect(() => {
        const fetchSubCategoryData = () => {
            const category = categories.find(cat => cat.slug === categorySlug);
            if (category) {
                const subCategory = category.subcategories.find(sub => sub.slug === subCategorySlug);
                setSubCategoryData(subCategory);
            }
        };

        fetchSubCategoryData();
    }, [categorySlug, subCategorySlug]);

    // Generate Breadcrumb
    useEffect(() => {
        const path = location.pathname.split("/").filter(Boolean);
        const breadcrumb = [];

        breadcrumb.push({ name: 'Home', href: '/' });

        let category = categories.find(cat => cat.slug === path[1]);
        if (category) {
            breadcrumb.push({ name: category.name, href: `/category/${category.slug}` });

            if (path[2]) {
                let subcategory = category.subcategories.find(sub => sub.slug === path[2]);
                if (subcategory) {
                    breadcrumb.push({ name: subcategory.name, href: `/category/${category.slug}/${subcategory.slug}` });

                    if (path[3] && path[4]) {
                        const product = subcategory.products.find(prod => prod.id === parseInt(path[4]));
                        if (product) {
                            breadcrumb.push({ name: product.name, href: `/category/${category.slug}/${subcategory.slug}/product/${product.id}` });
                        }
                    }
                }
            }
        }
        setBreadcrumbData(breadcrumb);
    }, [location]);

    const { addToCart } = useCart();

    const handleQuantityChange = (productId, action) => {
        setSubCategoryData(prevData => {
            const updatedProducts = prevData.products.map(product => {
                if (product.id === productId) {
                    const newQuantity = action === 'increase'
                        ? (product.quantity || 1) + 1
                        : Math.max((product.quantity || 1) - 1, 1);
                    return { ...product, quantity: newQuantity };
                }
                return product;
            });
            return { ...prevData, products: updatedProducts };
        });
    };

    const handleQuantityInput = (productId, value) => {
        const newQuantity = Math.max(parseInt(value, 10) || 1, 1);
        setSubCategoryData(prevData => {
            const updatedProducts = prevData.products.map(product => {
                if (product.id === productId) {
                    return { ...product, quantity: newQuantity };
                }
                return product;
            });
            return { ...prevData, products: updatedProducts };
        });
    };

    const handleAddToCart = (productId, quantity) => {
        const productToAdd = subCategoryData.products.find(prod => prod.id === productId);
        if (productToAdd) {
            addToCart({ ...productToAdd, quantity });
            console.log('Added to cart:', productToAdd);
            // Show toast notification
            toast.success(`${productToAdd.name} added to cart!`);
        }
    };


    if (!subCategoryData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div id="subCategoryPage">
                <Breadcrumb breadcrumbData={breadcrumbData} />

                <div className="page-content">
                    <div className="max-w-[1230px] mx-auto px-[20px] py-[50px]">
                        <h1 className="text-2xl font-bold">{subCategoryData.name}</h1>

                        <div className="products-filter">
                            <div className="filter-option">Filter</div>
                            <div className="products-list grid grid-cols-4 gap-[15px]">
                                {subCategoryData.products && subCategoryData.products.map(product => (

                                    <div key={product.id} className="product-item flex flex-col gap-[10px] bg-white rounded-lg p-3">
                                        <a href={`/category/${categorySlug}/${subCategorySlug}/product/${product.id}`}>
                                            <img src={product.image} alt={product.name} className="w-full h-auto" />
                                        </a>
                                        {/* Conditionally render the discount div if there's an old price */}
                                        {product.oldPrice && (
                                            <div className="w-full bg-red-500 rounded-sm flex items-center text-white justify-center py-1">
                                                <span className="text-xs font-bold">
                                                    Save {Math.floor(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-[10px] mt-auto">
                                        <a href={`/category/${categorySlug}/${subCategorySlug}/product/${product.id}`}>
                                            <h2 className="text-xs font-bold line_3">{product.name}</h2>
                                        </a>
                                        <p className="text-black text-sm font-bold">
                                            {product.price} SAR
                                            {product.oldPrice && <strike className="ml-2 text-xs text-gray-500">{product.oldPrice} SAR</strike>}
                                        </p>


                                            <div className="flex gap-[10px] justify-between items-center">
                                                {/* Star Rating */}
                                                <p className="text-yellow-500">
                                                    {'★'.repeat(Math.floor(product.rating))} {/* Filled stars */}
                                                    {'☆'.repeat(5 - Math.floor(product.rating))} {/* Empty stars */}
                                                </p>

                                                <div className="shippedby w-[90px] items-center">
                                                    <img src={product.shipping} alt=""/>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, 'decrease')}
                                                    className="px-2 py-1 border border-blue-500 text-blue-400 bg-white rounded-md w-[36px] h-[36px] hover:bg-gray-200"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    value={product.quantity || 1}
                                                    className="w-10 text-center"
                                                    onChange={(e) => handleQuantityInput(product.id, e.target.value)}
                                                />
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, 'increase')}
                                                    className="px-2 py-1 border border-blue-500 text-blue-400 bg-white rounded-md w-[36px] h-[36px] hover:bg-gray-200"
                                                >
                                                    +
                                                </button>

                                                <button
                                                    onClick={() => handleAddToCart(product.id, product.quantity || 1)}
                                                    className="bg-blue-500 text-white py-2 rounded-md w-[36px] h-[36px] hover:bg-blue-600 ml-auto"
                                                >
                                                    <i className="flex items-center justify-center text-white fa-solid fa-cart-shopping"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Footer />
        </div>
    );
};

export default SubCategoryPage;
