// Privacy.jsx
import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";


const Faq = () => {

    const breadcrumbData = [
        { name: "Home", href: "/" },
        { name: "FAQ", href: "/faq" }
    ];

    return (
        <div id="page-contents">
            <Breadcrumb breadcrumbData={breadcrumbData} />
            <div className="max-w-[1230px] mx-auto px-[20px]">
                <h1>Faq</h1>
                <p>This is the Fa1 page content.</p>
            </div>
        </div>
    );
};

export default Faq;
