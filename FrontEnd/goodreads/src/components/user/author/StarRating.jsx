import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./../StarRating.css";

const StarRating = ({ bookId, updateDataFromApi }) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handelOnClick = (event) => {
        setRating(event.target.value)
        const data = {
            "book_id": bookId,
            "rate": event.target.value,
        }
        updateDataFromApi(data)
    }

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={handelOnClick}
                        />
                        <FaStar
                            size={18}
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
