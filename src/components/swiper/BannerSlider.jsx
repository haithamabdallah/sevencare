import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import bannerData from './bannerData';
import 'swiper/css';
import 'swiper/css/navigation';
import './swiper.css';

const BannerSlider = () => {
    return (
        <section id="bannerSlider">
            <div className="max-w-[1230px] mx-auto px-[20px]">
                <Swiper
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    navigation={bannerData.length > 1 ? {
                        nextEl: '.banner-next',
                        prevEl: '.banner-prev',
                    } : false}
                    modules={[Autoplay, Navigation]}
                    className="banner-slider"
                >
                    {bannerData && bannerData.map(slide => (
                        <SwiperSlide key={slide.id}>
                            <a
                                href={slide.href}
                                className="slide-link"
                            >
                                <img src={`${slide.image}`} alt={slide.title} />
                            </a>
                        </SwiperSlide>
                    ))}
                    {bannerData.length > 1 && (
                        <>
                            <div className="banner-prev"><i className="fa-solid fa-chevron-left fa-sm"></i></div>
                            <div className="banner-next"><i className="fa-solid fa-chevron-right fa-sm"></i></div>
                        </>
                    )}
                </Swiper>
            </div>
        </section>
    );
};

export default BannerSlider;
