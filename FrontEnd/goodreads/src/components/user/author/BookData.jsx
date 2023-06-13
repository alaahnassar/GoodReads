import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SelectView from './SelectView';
import Styles from './Author.module.css';
import StaticStarRating from './../StaticStarRating';

const BookData = ({ book, updateDataFromApi }) => {
    const rate = book.totalOfReviews / book.numberOfReviews;
    const ratingText = isNaN(rate) ? 'No ratings' : `${rate} - ${book.numberOfReviews} ratings`;
    const imageSrc = book.book_image && book.book_image.data
        ? URL.createObjectURL(new Blob([Int8Array.from(book.book_image.data.data)], { type: book.book_image.contentType }))
        : null;
    return (
        <div>
            <Card className={Styles.shadowCard} style={{ margin: '40px' }}>
                <Card.Body>
                    <Row>
                        <Col md={4}>
                            <Card.Img
                                src={imageSrc}
                                alt="Card image"
                            />
                        </Col>
                        <Col md={6} className="mt-4">
                            <Card.Title>{book.name}</Card.Title>
                            <Card.Text>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <StaticStarRating book={book} />
                                    <span style={{ marginLeft: '10px' }}>{ratingText}</span>
                                </div>
                            </Card.Text>
                        </Col>
                        <Col md={2} className="mt-4">
                            <SelectView bookId={book._id} updateDataFromApi={updateDataFromApi}></SelectView>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookData;
