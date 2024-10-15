// Privacy.jsx
import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";


const Stores = () => {

    const breadcrumbData = [
        { name: "Home", href: "/" },
        { name: "Stores", href: "/stores" }
    ];

    return (
        <div id="page-contents">
            <Breadcrumb breadcrumbData={breadcrumbData} />
            <div className="max-w-[1230px] mx-auto px-[20px]">
                <h1>Stores</h1>
                <p>This is the Stores page content.</p>
            </div>
        </div>
    );
};

export default Stores;
