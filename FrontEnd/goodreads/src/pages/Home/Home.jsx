import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Span } from "react-bootstrap";
import headerImage from "../../styles/images/header3.png";
import Footer from "./Footer";

const Home = () => {
  const [topBooks, setTopBooks] = useState([]);
  const popBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/admin/topbooks");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      setTopBooks(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    popBooks();
  }, []);

  const styles = {
    // backgroundColor: "#f3f2ec",
    backgroundImage: `url(${headerImage})`,
    backgroundSize: "cover",
    height: "90vh",
    overflow: "hidden",
  };

  return (
    <div style={{ maxWidth: "100vw", overflow: "hidden" }}>
      <Row
        style={styles}
        className="d-flex justify-content-center align-items-center  mx-auto"
      >
        <Container className="header mx-auto">
          <Row className="d-flex justify-content-around ">
            <Col xs={12} md={4}>
              {/* Content on the left */}
              <h1
                style={{ fontSize: "50px", color: "#261c15" }}
                className="fw-bold py-3"
              >
                Welcome to the GOODREADS
              </h1>
              <p className="w-75">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                malesuada tellus sed tincidunt gravida. Nulla gravida sapien non
                velit maximus,
              </p>
              <Button
                href="/login"
                style={{ backgroundColor: "#261c15", borderColor: "#261c15" }}
              >
                Read More
              </Button>
            </Col>

            <Col
              xs={12}
              md={5}
              className="d-flex justify-content-end align-items-center"
            >
              {/* Image on the right */}
              <img
                src="https://images.pexels.com/photos/6475045/pexels-photo-6475045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="first"
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </Row>
      <Row
        className="py-5 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#e8e6db", minWidth: "100vw" }}
      >
        <div xs={12}>
          <Col xs={3} className="mx-auto">
            <h2
              style={{
                fontSize: "40px",
                color: "#261c15",
                borderBottom: "1px solid rgba(38, 28, 21, 0.18)",
              }}
              className="fw-bold py-3 mb-3 text-center "
            >
              Popular Books
            </h2>
          </Col>
        </div>
        {topBooks.map((element) => {
          return (
            <Col xs={3} key={element._id} className="px-3 py-5 mx-2">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={element.book_image} />
                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>
                  <Card.Text>
                    <span className="fw-semibold me-1">Author :</span>
                    {element.author_id.firstname +
                      " " +
                      element.author_id.lastname}
                  </Card.Text>
                  <Card.Text>
                    <span className="fw-semibold me-1">Category :</span>
                    {element.category_id.name}
                  </Card.Text>
                  <Button
                    href="/login"
                    style={{
                      backgroundColor: "#261c15",
                      borderColor: "#261c15",
                    }}
                    className="ms-auto"
                  >
                    Read Book
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Row className="">
        <Footer />
      </Row>
    </div>
  );
};

export default Home;
