import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'; // Only import Route and Routes, not Router
import { useTranslation } from 'react-i18next';
import HomeSlider from "./components/swiper/HomeSlider";
import LoadingSpinner from "./Spinner";
import CategoriesList from "./components/categories/CategoriesList";
import BannerSlider from "./components/swiper/BannerSlider";
import Sections from "./components/sections/Sections";
import Header from "./components/header/Header";
import Brands from "./components/brands/Brands";
import Footer from "./components/footer/Footer";
import MobileHeader from "./components/header/MobileHeader";
import CategoryPage from "./components/categories/CategoryPage";

function App() {
    const { i18n } = useTranslation();
    const [loading, setLoading] = useState(false);

    const changeLanguage = (lng) => {
        setLoading(true);
        i18n.changeLanguage(lng).then(() => {
            setLoading(false);
        });
    };

    return (
        <div className={`${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="fade-in">
                    <Header changeLanguage={changeLanguage} currentLanguage={i18n.language} />
                    <MobileHeader />

                    {/* No Router here, just components */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/category/:categorySlug" element={<CategoryPage />} />
                        {/* Add more routes here if needed */}
                    </Routes>

                    <Footer />
                </div>
            )}
        </div>
    );
}

function Home() {
    return (
        <>
            <CategoriesList />
            <HomeSlider />
            <BannerSlider />
            <Sections />
            <Brands />
        </>
    );
}

export default App;
