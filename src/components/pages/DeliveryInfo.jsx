// Privacy.jsx
import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";


const DeliveryInfo = () => {

    const breadcrumbData = [
        { name: "Home", href: "/" },
        { name: "Delivery Information", href: "/delivery-information" }
    ];

    return (
        <div id="page-contents">
            <Breadcrumb breadcrumbData={breadcrumbData} />
            <div className="max-w-[1230px] mx-auto px-[20px]">
                <h1>Delivery Information</h1>
                <p>This is the Delivery Information page content.</p>
            </div>
        </div>
    );
};

export default DeliveryInfo;
