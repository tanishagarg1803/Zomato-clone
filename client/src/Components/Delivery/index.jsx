import React from 'react';

//components
import DeliveryCarousel from './DeliveryCarousel';
import Brand from './Brand';
import RestaurantCarousel from '../RestaurantCarousel';

const Delivery = () => {
    return (
        <>
            <DeliveryCarousel />
            <Brand />
            <RestaurantCarousel />
        </>
    );
}

export default Delivery;
