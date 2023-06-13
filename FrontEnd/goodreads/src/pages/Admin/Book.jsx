import React from "react";
import BookStyle from "./Book.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import BookTable from "../../components/admin/book/BookTable";

function Book() {
  return (
    <div className={BookStyle.bg}>
      <Container
        className={BookStyle.shadow}
        style={{ backgroundColor: "white" }}
      >
        <Row>
          {/* table book  */}
          <BookTable></BookTable>
        </Row>
      </Container>
    </div>
  );
}

export default Book;
