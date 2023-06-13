import React, { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "./StarRating.css";

const StaticStarRating = ({ book, user_rate }) => {
  const [rating, setRating] = useState(null);
  useEffect(() => {
    if (book) {
      const rate = book.totalOfReviews / book.numberOfReviews;
      setRating(rate);
    } else {
      setRating(user_rate);
    }
  }, [book?.totalOfReviews, book?.numberOfReviews]);

  const getStarIcon = (index) => {
    const ratingValue = index + 1;
    if (rating >= ratingValue) {
      return (
        <FaStar key={index} size={18} className="star mt-0" color="#ffc107" />
      );
    } else if (rating >= ratingValue - 0.5) {
      return (
        <FaStarHalfAlt
          style={{ cursor: 'auto' }}
          key={index}
          size={18}
          className="star mt-0"
          color="#ffc107"
        />
      );
    } else {
      return (
        <FaStar style={{ cursor: 'auto' }} key={index} size={18} className="star mt-0" color="#e4e5e9" />
      );
    }
  };

  return <div>{[...Array(5)].map((star, i) => getStarIcon(i))}</div>;
};

export default StaticStarRating;
