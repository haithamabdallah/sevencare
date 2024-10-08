// Breadcrumb.js
import React from "react";
import { Link } from "react-router-dom";
import './Breadcrumb.css';

const Breadcrumb = ({ breadcrumbData }) => {
    return (
        <div className="max-w-[1230px] mx-auto px-[20px]">
            <nav id="breadcrumb" className="bg-white" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {breadcrumbData.map((item, index) => (
                        <li
                            key={index}
                            className={`breadcrumb-item ${
                                index === breadcrumbData.length - 1 ? "active" : ""
                            }`}
                            aria-current={index === breadcrumbData.length - 1 ? "page" : undefined}
                        >
                            {index === breadcrumbData.length - 1 ? (
                                item.name
                            ) : (
                                <Link to={item.href}>{item.name}</Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
