import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const CategorySlider = ({ sliders }) => {
    return (
        <section id="homeSlider">
            <div className="max-w-[1230px] mx-auto px-[20px]">
                <Swiper
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    navigation={sliders.length > 1 ? {
                        nextEl: '.home-next',
                        prevEl: '.home-prev',
                    } : false}
                    modules={[Autoplay, Navigation]}
                    className="home-slider"
                >
                    {sliders.map(slide => (
                        <SwiperSlide key={slide.id}>
                            <a href={slide.href} className="slide-link">
                                <img src={slide.image} alt={`Slide ${slide.id}`} />
                            </a>
                        </SwiperSlide>
                    ))}
                    {sliders.length > 1 && (
                        <>
                            <div className="home-prev"><i className="fa-solid fa-chevron-left fa-sm"></i></div>
                            <div className="home-next"><i className="fa-solid fa-chevron-right fa-sm"></i></div>
                        </>
                    )}
                </Swiper>
            </div>
        </section>
    );
};

export default CategorySlider;
