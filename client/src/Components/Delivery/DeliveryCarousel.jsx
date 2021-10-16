import React from 'react';
import Slider from "react-slick";

//component
import DeliveryCategory from './DeliveryCategory';
import { NextArrow, PrevArrow } from '../CarouselArrow';

const DeliveryCarousel = () => {

    const categories = [
        {
            image: "https://b.zmtcdn.com/data/o2_assets/dac899b33f72d7adf9f9c0af0cb55bd71632716658.png",
            title: "Chole Bhature"
        },
        {
            image: "https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png",
            title: "Dosa"
        },
        {
            image: "https://b.zmtcdn.com/data/o2_assets/f9d277eb1668d7abf9235302402b06001632716602.png",
            title: "Kachori"
        },
        {
            image: "https://b.zmtcdn.com/data/o2_assets/e61347d2b01cfae669530bd4b8e778e41632716577.png",
            title: "Rolls"
        },
        {
            image: "https://b.zmtcdn.com/data/dish_images/7cc29024fb8b3bea5eb9112601fcf0f01615267835.png",
            title: "Sub"
        },
        {
            image: "https://b.zmtcdn.com/data/o2_assets/a335fd8b33e309f24f02426f9a9b85fe1633501287.png",
            title: "Coffee"
        },
    ];
    const settings = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <>
            <h1 className="text-xl mb-4 font-semibold">Inspiration for your first order</h1>
            <div className="lg:hidden flex flex-wrap gap-3  lg:gap-0 justify-between">
                {categories.map((food) => (
                    <DeliveryCategory {...food} />
                ))}
            </div>
            <div className="hidden lg:block">
                <Slider {...settings}>
                    {categories.map((food) => (
                        <DeliveryCategory {...food} />
                    ))}
                </Slider>
            </div>
        </>
    );
}

export default DeliveryCarousel;
