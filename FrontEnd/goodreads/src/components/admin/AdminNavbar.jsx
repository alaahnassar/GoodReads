import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import logo from "../../images/Goodreads_logo.svg.png";
const AdminNavbar = () => {
  const styles = {
    backgroundColor: "#f3f2ec",
  };
  let logout = () => {
    sessionStorage.removeItem("token");
  };
  return (
    <Navbar style={styles} expand="lg" className="py-2 mb-5">
      <Container style={{ borderBottom: "1px solid rgba(38, 28, 21, 0.18)" }}>
        <Navbar.Brand
          href={`admin/categories`}
          className="fw-bold "
          style={{ color: "#261c15", textTransform: "uppercase" }}
        >
          {" "}
          GoodReads
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="my-2" href={`/admin/categories`}>
              Categories
            </Nav.Link>
            <Nav.Link className="my-2" href={`/admin/books`}>
              Books
            </Nav.Link>
            <Nav.Link className="my-2" href={`/admin/author`}>
              Authors
            </Nav.Link>
          </Nav>
          <Nav.Link className="fw-semibold" href={`/login`} onClick={logout}>
            <Button
              style={{ backgroundColor: "#261c15", borderColor: "#261c15" }}
            >
              Logout
            </Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
