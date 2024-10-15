// App.jsx
import React from 'react';
import HomeSlider from "./components/swiper/HomeSlider";
import CategoriesList from "./components/categories/CategoriesList";
import BannerSlider from "./components/swiper/BannerSlider";
import Sections from "./components/sections/Sections";
import Brands from "./components/brands/Brands";

function App() {
    return (
        <div className="fade-in">
            <CategoriesList />
            <HomeSlider />
            <BannerSlider />
            <Sections />
            <Brands />
        </div>
    );
}

export default App;
