import React, { useEffect, useState } from "react";
import BookData from "./BookData";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Styles from "./Author.module.css";

const AuthorBooks = ({ books, updateDataFromApi }) => {
  return books.length != 0 ? (
    <Container className={Styles.shadow}>
      <h2 className="mx-3 my-4">Author's Books</h2>
      {books.map((book) => (
        <BookData
          key={book._id}
          book={book}
          updateDataFromApi={updateDataFromApi}
        ></BookData>
      ))}
    </Container>
  ) : (
    <Container className={Styles.shadow}>
      <article className="book" style={{ cursor: "pointer" }}>
        <h2>
          Sorry :( <br /> There are no books for this author{" "}
        </h2>
      </article>
    </Container>
  );
};

export default AuthorBooks;
