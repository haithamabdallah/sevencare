import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HomeSlider from "./components/swiper/HomeSlider";
import LoadingSpinner from "./Spinner";
import CategoriesList from "./components/categories/CategoriesList";
import BannerSlider from "./components/swiper/BannerSlider";
import Sections from "./components/sections/Sections";
import Header from "./components/header/Header";

function App() {
    const { t, i18n } = useTranslation();
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
                    <CategoriesList />
                    <HomeSlider />
                    <BannerSlider />
                    <Sections />
                </div>
            )}
        </div>
    );
}

export default App;
