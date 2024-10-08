import React from 'react';
import './subcategory.css';

const SubCategories = ({ categorySlug, subcategories }) => {
    return (
        <section id="subCategory">
            <div className="max-w-[1230px] mx-auto px-[20px]">
                <h1>Shop By Skin Care Category</h1>
                <div className="subList grid grid-cols-4 gap-[30px]">
                    {subcategories.map(sub => (
                        <div className="item" key={sub.id}>
                            <a href={`/category/${categorySlug}/${sub.slug}`}>
                                <img src={sub.image} alt={`Brand ${sub.id}`} />
                                <h1>{sub.name}</h1>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SubCategories;
