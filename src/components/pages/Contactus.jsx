// Privacy.jsx
import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";


const Contactus = () => {

    const breadcrumbData = [
        { name: "Home", href: "/" },
        { name: "Contact us", href: "/contacts" }
    ];

    return (
        <div id="page-contents">
            <Breadcrumb breadcrumbData={breadcrumbData} />
            <div className="max-w-[1230px] mx-auto px-[20px]">
                <h1>Contact us</h1>
                <p>This is the Contact us page content.</p>
            </div>
        </div>
    );
};

export default Contactus;
