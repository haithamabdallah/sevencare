import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import $ from 'jquery'; // Import jQuery
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import categories from '../categories/categories'; // Ensure this is your JSON data source
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { useCart } from '../Cart/CartContext/CartContext';
import Rating from '../Rating/Rating';

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
    const [cart, setCart] = useState([]);

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

    const [userRating, setUserRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setUserRating(newRating);
        console.log('User selected rating:', newRating);
    };

    if (!subCategoryData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div id="subCategoryPage">
                <Breadcrumb breadcrumbData={breadcrumbData} />

                <div className="max-w-[1230px] mx-auto px-[20px] py-[50px]">
                    <h1 className="text-2xl font-bold">{subCategoryData.name}</h1>

                    <div className="grid grid-cols-4 gap-[20px] mt-[30px]">
                        {subCategoryData.products && subCategoryData.products.map(product => (
                            <div key={product.id} className="product-item p-4 border border-gray-200 rounded-lg">
                                <img src={product.image} alt={product.name} className="w-full h-auto" />
                                <h2 className="text-lg font-bold mt-2">{product.name}</h2>
                                <p className="mt-1 text-gray-700">
                                    {product.price} SAR
                                    {product.oldPrice && <strike className="ml-2 text-sm text-gray-500">{product.oldPrice} SAR</strike>}
                                </p>

                                <div className="mt-2">
                                    <Rating initialRating={userRating} onRatingChange={handleRatingChange} />
                                    <p>Your rating: {userRating}</p>
                                </div>

                                <div className="flex items-center mt-4">
                                    <button
                                        onClick={() => handleQuantityChange(product.id, 'decrease')}
                                        className="px-2 py-1 border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        value={product.quantity || 1}
                                        className="mx-2 w-12 text-center border border-gray-300"
                                        onChange={(e) => handleQuantityInput(product.id, e.target.value)}
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(product.id, 'increase')}
                                        className="px-2 py-1 border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleAddToCart(product.id, product.quantity || 1)}
                                    className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Footer />
        </div>
    );
};

export default SubCategoryPage;
