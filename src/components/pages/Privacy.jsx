// Privacy.jsx
import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";


const Privacy = () => {

    const breadcrumbData = [
        { name: "Home", href: "/" },
        { name: "Privacy Policy", href: "/privacy" }
    ];

    return (
        <div id="page-contents">
                <Breadcrumb breadcrumbData={breadcrumbData} />
            <div className="max-w-[1230px] mx-auto px-[20px]">
                <h1>Privacy Policy</h1>
                <p>This is the privacy policy page content.</p>
            </div>
        </div>
    );
};

export default Privacy;
