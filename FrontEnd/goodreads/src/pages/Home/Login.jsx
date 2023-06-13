import React, { useState } from "react";
import { Button, Card, Row, Col, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import headerImage from "../../styles/images/header3.png";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8080/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Login successful
      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      let user_id;
      const decoded = jwtDecode(data.token);
      // Access the decoded data
      const { role } = decoded;
      if (role == "admin") {
        navigate("/admin/author");
      } else {
        navigate("/user/home");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const styles = {
    backgroundImage: `url(${headerImage})`,
    backgroundSize: "cover",
    // backgroundColor: "#f3f2ec",
  };
  return (
    <div style={styles} className="border-top-1">
      <div
        className="d-flex align-items-center justify-content-center mx-auto"
        style={{ height: "90vh" }}
      >
        <Card
          style={{ height: 450, boxShadow: "0 1px 6px rgba(0, 0, 0, 0.2)" }}
          className="w-50 border-0"
        >
          <Row className="g-0">
            <Col md="6">
              <div style={{ height: 450 }}>
                <Card.Img
                  style={{ objectFit: "cover", height: "100%" }}
                  src="https://images.pexels.com/photos/1031588/pexels-photo-1031588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="login form"
                  className="rounded-start w-100"
                />
              </div>
            </Col>
            <Col md="6">
              <Card.Body className="d-flex flex-column">
                <h5 className="fw-normal my-4 pb-3 mx-auto">
                  Sign Into Your Account
                </h5>
                <Form onSubmit={handleSubmit} className="w-75  mx-auto">
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form.Group controlId="email" className="my-1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="password" className="my-1 ">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button
                    style={{
                      backgroundColor: "#261c15",
                      borderColor: "#261c15",
                    }}
                    type="submit"
                    className="w-100 mt-3 mb-2"
                  >
                    Login
                  </Button>
                  <p className="py-2">
                    Not A Member?
                    <Link to={`/register`}>Register</Link>
                  </p>
                </Form>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
