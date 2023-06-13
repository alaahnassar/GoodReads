import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const AllBooks = ({ data }) => {
  let [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const navigateToPage = (id) => {
    navigate(`/user/books/${id}`);
  };

  useEffect(() => {
    setBooks(data);
  }, [data]);

  return !books.message ? (
    <>
      {books.map((element) => {
        const imageSrc = element.book_image && element.book_image.data
          ? URL.createObjectURL(new Blob([Int8Array.from(element.book_image.data.data)], { type: element.book_image.contentType }))
          : null;
        return (
          <Col xs={3} key={element._id}>
            <article
              className="book"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigateToPage(element._id);
              }}
            >
              {imageSrc && <img
                src={imageSrc}
                style={{ width: "100%", height: "300px" }}
              />}
              <h2 className="text-capitalize">{element.name}</h2>
              <h2 className="text-capitalize">
                {element.author_id.firstname + " " + element.author_id.lastname}
              </h2>
            </article>
          </Col>
        );
      })}
    </>
  ) : (
    <Col xs={6}>
      <article className="book" style={{ cursor: "pointer" }}>
        <h2>
          Sorry : <br /> There are no books for this category{" "}
        </h2>
      </article>
    </Col>
  );
};

export default AllBooks;
