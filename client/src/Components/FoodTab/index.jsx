import React from 'react';
import { RiShoppingBag3Line } from "react-icons/ri";

const MobileTabs = () => {
    return (
        <>
            <div className="lg:hidden bg-white shadow-lg p-3 fixed bottom-0 z-10 w-full">
                <div className="flex flex-col tems-center">
                    <RiShoppingBag3Line />
                    <h5>Delivery</h5>
                </div>
            </div>
        </>
    );
};

const FoodTab = () => {
    return (
        <>
            <div>
                <MobileTabs />
            </div>
        </>
    );
}

export default FoodTab;
