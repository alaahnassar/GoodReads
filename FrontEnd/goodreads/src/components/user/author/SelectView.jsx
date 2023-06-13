import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import StarRating from "./StarRating";

const BookData = ({ bookId, updateDataFromApi }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        console.log(event.target.value);
        const data = {
            "book_id": bookId,
            "view": event.target.value,
        }
        updateDataFromApi(data)
    };

    return (
        <div>
            <Form.Select value={selectedOption} onChange={handleSelectChange}>
                <option value="wantToRead">Select Value</option>
                <option value="wantToRead">want to read</option>
                <option value="reading">reading</option>
                <option value="read">read</option>
            </Form.Select>
            <StarRating bookId={bookId} updateDataFromApi={updateDataFromApi}></StarRating>
        </div>
    );
};

export default BookData;
