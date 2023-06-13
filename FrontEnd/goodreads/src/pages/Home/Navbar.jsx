import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const NavbarHome = () => {
  const styles = {
    backgroundColor: "#f3f2ec",
  };
  return (
    <Navbar style={styles} expand="lg" className="py-2">
      <Container style={{ borderBottom: "1px solid rgba(38, 28, 21, 0.18)" }}>
        <Navbar.Brand
          href={"/"}
          className="fw-bold "
          style={{ color: "#261c15", textTransform: "uppercase" }}
        >
          GoodReads
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={"/"} className="my-2">
              Home
            </Nav.Link>
            <Nav.Link href={"/"} className="my-2">
              Books
            </Nav.Link>
          </Nav>
          <Nav.Link className="fw-semibold" href={`/login`}>
            <Button
              style={{ backgroundColor: "#261c15", borderColor: "#261c15" }}
            >
              Login
            </Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarHome;
