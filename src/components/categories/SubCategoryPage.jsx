import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import categories from '../categories/categories';

const SubCategoryPage = () => {
    const { categorySlug, subCategorySlug } = useParams();
    const [subCategoryData, setSubCategoryData] = useState(null);

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

    if (!subCategoryData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="max-w-[1230px] mx-auto px-[20px] py-[50px]">
                <h1 className="text-2xl font-bold">{subCategoryData.name}</h1>
                <div className="grid grid-cols-4 gap-[20px] mt-[30px]">
                    {subCategoryData.products.map(product => (
                        <div key={product.id} className="product-item">
                            <img src={product.image} alt={product.name} />
                            <h2 className="text-lg">{product.name}</h2>
                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SubCategoryPage;
