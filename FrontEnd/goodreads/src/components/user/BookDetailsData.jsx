import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StaticStarRating from './StaticStarRating';
import Styles from './author/Author.module.css';
import SelectView from './author/SelectView';

const BookDetailsData = ({ book, updateDataFromApi }) => {
  const [bookData, setBookData] = useState({});
  const imageSrc = bookData.book_image && bookData.book_image.data
    ? URL.createObjectURL(new Blob([Int8Array.from(bookData.book_image.data.data)], { type: bookData.book_image.contentType }))
    : null;
  useEffect(() => {
    setBookData(book);
  }, [book])
  return (
    <>
      <div>
        <Card className="border-0" style={{ margin: "20px 0px" }}>
          <Card.Body>
            <Row>
              <Col md={4}>
                <Card.Img
                  src={imageSrc}
                  alt="Card image"
                  style={{ width: "100%", height: "400px" }}
                />
                <div className="my-4">
                  <SelectView bookId={bookData._id} updateDataFromApi={updateDataFromApi}></SelectView>
                </div>
              </Col>
              <Col className="pt-4 px-4" md={8}>
                <Card.Title className="text-capitalize fs-2">
                  {bookData.name}
                </Card.Title>
                <Card.Text>{bookData.author_id?.firstname + " " + bookData.author_id?.lastname}</Card.Text>
                <Card.Text>{bookData.category_id?.name}</Card.Text>
                <StaticStarRating book={bookData}></StaticStarRating>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card className={Styles.shadowCard} style={{ margin: "40px" }}>
          <Card.Body>
            <Card.Title className="text-capitalize fs-2 mx-2">Description</Card.Title>
            <Row>
              <Card.Text className='px-5 py-3'>{book.bookDescription}</Card.Text>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default BookDetailsData;
