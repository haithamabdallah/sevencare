import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Grid } from 'swiper/modules';

import brandsData from './brandsData';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/grid';
import './brands.css'

const Brands = () => {
    const { t } = useTranslation();

    return (
        <section id="brandsList">
            <div className="max-w-[1230px] mx-auto px-[20px]">
                <div className="title">
                    <h1>{t('shop-brands')}</h1>
                </div>
                <div className="brands-list">
                    <Swiper
                        modules={[FreeMode, Grid]}
                        className="brands-list"
                        slidesPerView={5}
                        grid={{
                            rows: 2,
                        }}
                        spaceBetween={30}

                    >
                        {brandsData.map(brand => (
                            <SwiperSlide key={brand.id}>
                                <div className="brands">
                                    <a href={`${brand.href}-${brand.slug}-${brand.id}`}>
                                        <img src={brand.logo} alt={t(`brands.${brand.slug}`)} />
                                    </a>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Brands;
