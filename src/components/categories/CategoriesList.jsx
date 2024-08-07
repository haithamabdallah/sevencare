import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import categories from './categories';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import './categories.css';

const CategoriesList = () => {
    const { t } = useTranslation();

    return (
        <section id="categoriesList">
            <div className="max-w-[1230px] mx-auto px-[20px]">
                <div className="categories-list">
                    <Swiper
                        className="category-slider"
                        modules={FreeMode}
                        spaceBetween={0}
                        autoPlay={true}
                        slidesPerView={3}
                        breakpoints={{
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 6,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 6,
                                spaceBetween: 20,
                            },
                            1025: {
                                slidesPerView: 12,
                                spaceBetween: 0,
                            }
                        }}
                    >
                        {categories.map(category => (
                            <SwiperSlide key={category.id}>
                                <div className="category">
                                    <a href={`${category.href}-${category.slug}-${category.id}`}>
                                        <img src={category.image} alt={t(`categories.${category.slug}`)} />
                                        <h2>{t(`categories.${category.slug}`)}</h2>
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

export default CategoriesList;
