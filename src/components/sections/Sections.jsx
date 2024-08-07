// Sections.jsx
import React from 'react';
import { sectionsData } from './sectionsData';

const Section = ({ title, items }) => (
    <div className="section">
        <h1>{title}</h1>
        <div className="items">
            {items.map(item => (
                <a key={item.id} href={item.href}>
                    <img src={item.image} alt={`Offer ${item.id}`} />
                </a>
            ))}
        </div>
    </div>
);

const Banner = ({ image, href }) => (
    <div className="banner">
        <a href={href}>
            <img src={image} alt="Banner" />
        </a>
    </div>
);

const Sections = () => {
    return (
        <div className="sections-container">
            {sectionsData.map(data => (
                data.type === 'section' ? (
                    <Section key={data.id} title={data.title} items={data.items} />
                ) : (
                    <Banner key={data.id} image={data.image} href={data.href} />
                )
            ))}
        </div>
    );
};

export default Sections;
