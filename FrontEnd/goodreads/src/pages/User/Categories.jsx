import React, { useState, useEffect } from "react";
import { Container, Nav, Row, Col } from "react-bootstrap";
import AllBooks from "../../components/user/AllBooks";
import styles from "../../styles/userCategories.module.css";
const Categories = () => {
  let [categories, setCategories] = useState([]);
  let [books, setBooks] = useState([]);
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpZCI6IjY0NmE3ZDM5MDU1NjhiZGJkZTQ3ZjA3ZSIsImlhdCI6MTY4NDcwMDc2M30.Jj2j7VAalrJWwvgaRsqVaKiL3UuxJ1rkLUJTHiskNWs";
  const token = sessionStorage.getItem("token");
  let getAllCategories = async () => {
    const res = await fetch("http://localhost:8080/allCategory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setCategories(data);
  };

  let getAllBooks = async () => {
    const res = await fetch("http://localhost:8080/admin/books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setBooks(data.data);
  };

  useEffect(() => {
    getAllCategories();
    getAllBooks();
  }, []);

  let getBooksByCategoryId = async (id) => {
    const res = await fetch(`http://localhost:8080/allCategory/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setBooks(data);
  };
  return (
    <>
      <Container>
        <Row>
          <Col xs={2} className="p-0">
            <div className="sidebar">
              <Nav className="flex-column">
                <Nav.Link
                  style={{
                    backgroundColor: "#261c15",
                    borderColor: "#261c15",
                    color: "white",
                  }}
                  className={`${styles.navlink} w-100 my-1 text-capitalize`}
                  onClick={() => {
                    getAllBooks();
                  }}
                >
                  All
                </Nav.Link>
              </Nav>
              <Nav className="flex-column">
                {categories.map((element) => {
                  return (
                    <Nav.Link
                      style={{
                        backgroundColor: "#261c15",
                        borderColor: "#261c15",
                        color: "white",
                      }}
                      className={`${styles.navlink} w-100 my-1 text-capitalize`}
                      key={element._id}
                      onClick={(event) => {
                        getBooksByCategoryId(element._id);
                      }}
                    >
                      {element.name}
                    </Nav.Link>
                  );
                })}
              </Nav>
            </div>
          </Col>

          <Col xs={10}>
            <Row>
              <AllBooks data={books} />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Categories;
