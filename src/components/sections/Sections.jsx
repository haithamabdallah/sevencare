// Sections.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { sectionsData } from './sectionsData';
import './sections.css';

const Section = ({ slug, items }) => {
    const { t } = useTranslation();

    return (
        <div className="section-section">
            <h1>{t(`sections.${slug}.title`)}</h1>
            <ul className="items">
                {items.map(item => (
                    <li key={item.id}>
                        <a href={item.href}>
                            <img src={item.image} alt={`Offer ${item.id}`} />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Banner = ({ image, href }) => (
    <div className="section-banner">
        <a href={href}>
            <img src={image} alt="Banner" />
        </a>
    </div>
);

const Sections = () => {
    return (
        <div className="max-w-[1230px] mx-auto px-[20px]">
            {sectionsData.map(data => (
                data.type === 'section' ? (
                    <Section key={data.id} slug={data.slug} items={data.items} />
                ) : (
                    data.showBanner && <Banner key={data.id} image={data.image} href={data.href} />
                )
            ))}
        </div>
    );
};

export default Sections;
