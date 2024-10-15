import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import categories from '../categories/categories';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const ProductPage = () => {
    const { categorySlug, subCategorySlug, productId } = useParams();
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    const [product, setProduct] = useState(null);
    const [breadcrumbData, setBreadcrumbData] = useState([]);
    const [userRating, setUserRating] = useState(0);
    const [review, setReview] = useState('');

    useEffect(() => {
        const fetchProductData = () => {
            const category = categories.find(cat => cat.slug === categorySlug);
            if (category) {
                const subCategory = category.subcategories.find(sub => sub.slug === subCategorySlug);
                if (subCategory) {
                    const productData = subCategory.products.find(prod => prod.id === parseInt(productId));
                    setProduct(productData);
                }
            }
        };
        fetchProductData();
    }, [categorySlug, subCategorySlug, productId]);

    useEffect(() => {
        const path = location.pathname.split('/').filter(Boolean);
        const breadcrumb = [{ name: 'Home', href: '/' }];
        const category = categories.find(cat => cat.slug === path[1]);

        if (category) {
            breadcrumb.push({ name: category.name, href: `/category/${category.slug}` });
            const subCategory = category.subcategories.find(sub => sub.slug === path[2]);
            if (subCategory) {
                breadcrumb.push({ name: subCategory.name, href: `/category/${category.slug}/${subCategory.slug}` });
                if (product) breadcrumb.push({ name: product.name });
            }
        }
        setBreadcrumbData(breadcrumb);
    }, [location, product]);

    const handleRating = (rating) => {
        setUserRating(rating);
        toast.success(`You rated this product ${rating} stars!`);
    };

    const handleReviewSubmit = () => {
        if (review.trim()) {
            toast.success('Review submitted!');
            setReview('');
        } else {
            toast.error('Please enter a valid review.');
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <Breadcrumb breadcrumbData={breadcrumbData} />

            <div className="max-w-[1230px] mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img src={product.image} alt={product.name} className="w-full rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <p className="text-gray-600">
                            {product.price} SAR
                            {product.oldPrice && (
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                    {product.oldPrice} SAR
                                </span>
                            )}
                        </p>
                        <p className="text-yellow-500">
                            {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
                        </p>
                        <div className="flex items-center">
                            <span>Ships by: </span>
                            <img src={product.shipping} alt="Shipping" className="ml-2 w-16" />
                        </div>

                        {isLoggedIn ? (
                            <div className="mt-4">
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            className={`text-2xl ${
                                                userRating >= star ? 'text-yellow-500' : 'text-gray-300'
                                            }`}
                                            onClick={() => handleRating(star)}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>

                                <textarea
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Write your review..."
                                    className="w-full mt-4 p-2 border rounded"
                                ></textarea>

                                <button
                                    onClick={handleReviewSubmit}
                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Submit Review
                                </button>
                            </div>
                        ) : (
                            <p className="text-red-500">Please log in to rate and review this product.</p>
                        )}

                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default ProductPage;
