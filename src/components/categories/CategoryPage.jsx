import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import categories from './categories';
import CategorySlider from './CategorySlider';
import Header from "../header/Header";
import Footer from "../footer/Footer"; // Import the CategorySlider component

const CategoryPage = () => {
    const { categorySlug } = useParams();
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        const fetchCategoryData = () => {
            const category = categories.find(cat => cat.slug === categorySlug);
            setCategoryData(category);
        };

        fetchCategoryData();
    }, [categorySlug]);

    if (!categoryData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{categoryData.name}</h1>
            <Header />
            {/* Render CategorySlider and pass sliders data */}
            <CategorySlider sliders={categoryData.sliders} />
            {/* Render other category details here */}
            <Footer />
        </div>
    );
};

export default CategoryPage;
