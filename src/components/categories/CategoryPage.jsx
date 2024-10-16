//Category page
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import categories from './categories';
import CategorySlider from './CategorySlider';
import SubCategories from "./SubCategory";

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
            <CategorySlider sliders={categoryData.sliders} />
            <SubCategories categorySlug={categorySlug} subcategories={categoryData.subcategories} />
        </div>
    );
};

export default CategoryPage;
