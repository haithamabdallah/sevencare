import React, { useState } from 'react';

const Rating = ({ initialRating = 0, onRatingChange }) => {
    // State to store the current rating
    const [rating, setRating] = useState(initialRating);

    // Hover state to handle when the user hovers over stars
    const [hover, setHover] = useState(null);

    // Handle the click event to set the rating
    const handleClick = (ratingValue) => {
        setRating(ratingValue);
        if (onRatingChange) {
            onRatingChange(ratingValue); // Pass rating to parent if needed
        }
    };

    return (
        <div className="star-rating flex gap-1">
            {/* Render 5 stars */}
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                    <span
                        key={index}
                        className={`cursor-pointer text-2xl ${
                            ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                        onClick={() => handleClick(ratingValue)} // Set rating on click
                        onMouseEnter={() => setHover(ratingValue)} // Highlight stars on hover
                        onMouseLeave={() => setHover(null)} // Remove highlight on mouse leave
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default Rating;
