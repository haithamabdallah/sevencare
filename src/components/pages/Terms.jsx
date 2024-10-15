import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const Terms = () => {

    const breadcrumbData = [
        { name: "Home", href: "/" },
        { name: "Terms of Use", href: "/terms" }
    ];

    return (
        <div id="page-contents">
            <Breadcrumb breadcrumbData={breadcrumbData} />
            <div className="max-w-[1230px] mx-auto px-[20px]">
                <h1>Terms of use</h1>
                <p>This is the Terms of use page content.</p>
            </div>
        </div>
    );
};

export default Terms;