import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const bgColor = {
    backgroundColor: "#f3f2ec",
  };
  const styles = {
    textDecoration: "none",
  };
  return (
    <footer style={bgColor} className=" text-center text-lg-start ">
      <section>
        <Container className="text-center text-md-start mt-5">
          <Row className="mt-3">
            <Col md={3} lg={4} xl={3} className="mx-auto mb-4">
              <h6
                href={"/"}
                className="fw-bolder "
                style={{
                  color: "#261c15",
                  textTransform: "uppercase",
                  fontSize: "20px",
                }}
              >
                GoodReads
              </h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                consectetur adipisicing elit.
              </p>
            </Col>

            <Col md={2} lg={2} xl={2} className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="/login" style={styles} className="text-reset ">
                  Books
                </a>
              </p>
              <p>
                <a href="/login" style={styles} className="text-reset">
                  Categories
                </a>
              </p>
              <p>
                <a href="/login" style={styles} className="text-reset">
                  Authors
                </a>
              </p>
            </Col>

            <Col md={3} lg={2} xl={2} className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="/login" style={styles} className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="/login" style={styles} className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="/login" style={styles} className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="/login" style={styles} className="text-reset">
                  Help
                </a>
              </p>
            </Col>

            <Col md={4} lg={3} xl={3} className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>Egypt, Giza 10012</p>
              <p>goodReads@example.com</p>
              <p>+20 10 234 567 88</p>
            </Col>
          </Row>
        </Container>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © {new Date().getFullYear()} El-Fankosh.com
      </div>
    </footer>
  );
};

export default Footer;
