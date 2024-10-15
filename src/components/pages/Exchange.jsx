// Privacy.jsx
import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";


const Exchange = () => {

    const breadcrumbData = [
        { name: "Home", href: "/" },
        { name: "Exchange and Return", href: "/exchange-return" }
    ];

    return (
        <div id="page-contents">
            <Breadcrumb breadcrumbData={breadcrumbData} />
            <div className="max-w-[1230px] mx-auto px-[20px]">
                <h1>Exchange and Return</h1>
                <p>This is the Exchange and Return page content.</p>
            </div>
        </div>
    );
};

export default Exchange;
