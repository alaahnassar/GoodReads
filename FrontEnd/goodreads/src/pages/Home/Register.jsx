import React, { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import headerImage from "../../styles/images/header.png";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    retypePassword: "",
    image: null,
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    retypePassword: "",
    // image: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Validate the corresponding field and update the error message
    const field = e.target.name;
    const value = e.target.value.trim();
    let errorMessage = "";

    if (field === "firstname" && (value === "" || value.length <= 3)) {
      errorMessage = "Please enter at least 3 characters.";
    } else if (field === "lastname" && (value === "" || value.length <= 3)) {
      errorMessage = "Please enter at least 3 characters.";
    } else if (field === "email" && (value === "" || !emailRegex.test(value))) {
      errorMessage = "Please enter a valid email address.";
    } else if (field === "password" && value === "") {
      errorMessage = "Please enter a password.";
    } else if (field === "retypePassword" && value !== formData.password) {
      errorMessage = "Passwords do not match.";
    }

    setErrors({ ...errors, [field]: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = { ...errors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate form fields
    if (formData.firstname.trim() === "" && formData.firstname.length <= 3) {
      formIsValid = false;
      newErrors.firstname = "Please enter your first name.";
    }
    if (formData.lastname.trim() === "" && formData.lastname.length <= 3) {
      formIsValid = false;
      newErrors.lastname = "Please enter your last name.";
    }
    if (formData.email.trim() === "" && !emailRegex.test(formData.email)) {
      formIsValid = false;
      newErrors.email = "Please enter your email address.";
    }
    if (formData.password.trim() === "") {
      formIsValid = false;
      newErrors.password = "Please enter a password.";
    }
    if (
      formData.password.trim() === "" &&
      formData.password.trim() !== formData.password
    ) {
      formIsValid = false;
      newErrors.retypePassword = "Passwords do not match.";
    }
    // // Add more validation checks for other fields as needed

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataObj = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        formDataObj.append(key, value);
      }
      // const formDataObj = new FormData();
      // formDataObj.append("firstname", formData.firstname);
      // formDataObj.append("lastname", formData.lastname);
      // formDataObj.append("email", formData.email);
      // formDataObj.append("password", formData.password);
      // formDataObj.append("retypePassword", formData.retypePassword);
      // formDataObj.append("image", formData.image);

      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        body: formDataObj,
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.message.includes("email")) {
          newErrors.email = "This email is already registered.";
          setErrors(newErrors);
        } else {
          throw new Error(errorData.message);
        }
      } else {
        // Registration successful
        const data = await response.json();
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          retypePassword: "",
          image: null,
        });
        navigate("/login");
        setErrors({});
      }
    } catch (error) {
      setErrors(error.message);
    }
  };
  const styles = {
    // backgroundColor: "#f3f2ec",
    backgroundImage: `url(${headerImage})`,
    backgroundSize: "cover",
  };
  return (
    <div style={styles}>
      <div
        className="d-flex align-items-center justify-content-center mx-auto"
        style={{ height: "90vh" }}
      >
        <Card
          style={{ boxShadow: "0 1px 6px rgba(0, 0, 0, 0.2)" }}
          className="w-50 border-0"
        >
          <Form onSubmit={handleSubmit} className="p-5">
            <h5 className="fw-normal pb-3 text-center">Create Your Account</h5>
            <Row>
              <Col>
                <Form.Group controlId="firstname" className="my-1">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    onBlur={handleChange}
                    // required
                  />
                  {errors.firstname && (
                    <Form.Text className="text-danger">
                      {errors.firstname}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lastname" className="my-1">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    onBlur={handleChange}
                    // required
                  />
                  {errors.lastname && (
                    <Form.Text className="text-danger">
                      {errors.lastname}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="email" className="my-1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                // required
              />
              {errors.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="password" className="my-1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    // required
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      {errors.password}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="retypePassword" className="my-1">
                  <Form.Label>Retype Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="retypePassword"
                    value={formData.retypePassword}
                    onChange={handleChange}
                    // required
                  />
                  {errors.retypePassword && (
                    <Form.Text className="text-danger">
                      {errors.retypePassword}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="image" className="my-1">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
                // required
              />
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#261c15",
                borderColor: "#261c15",
              }}
              className="w-100 mt-3 mb-2"
              type="submit"
            >
              Register
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;

// import React, { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     retypePassword: "",
//     image: null,
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateForm(formData);

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const formDataObj = new FormData();
//       for (const [key, value] of Object.entries(formData)) {
//         formDataObj.append(key, value);
//       }

//       const response = await fetch("http://localhost:8080/register", {
//         method: "POST",
//         body: formDataObj,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message);
//       }

//       // Registration successful
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       setErrors({ serverError: error.message });
//     }
//   };

//   const validateForm = (formData) => {
//     const errors = {};

//     if (formData.firstname.trim() === "") {
//       errors.firstname = "Please enter your first name.";
//     } else if (formData.firstname.length <= 3) {
//       errors.firstname = "Please enter at least 3 characters.";
//     }

//     if (formData.lastname.trim() === "") {
//       errors.lastname = "Please enter your last name.";
//     } else if (formData.lastname.length <= 3) {
//       errors.lastname = "Please enter at least 3 characters.";
//     }

//     if (formData.email.trim() === "") {
//       errors.email = "Please enter your email address.";
//     } else if (!isValidEmail(formData.email)) {
//       errors.email = "Please enter a valid email address.";
//     }

//     if (formData.password.trim() === "") {
//       errors.password = "Please enter a password.";
//     }

//     if (formData.retypePassword.trim() !== formData.password.trim()) {
//       errors.retypePassword = "Passwords do not match.";
//     }

//     return errors;
//   };

//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   return (
//     <Form onSubmit={handleSubmit} className="w-50 mx-auto py-5">
//       {errors.serverError && (
//         <Alert variant="danger">{errors.serverError}</Alert>
//       )}
//       <Form.Group controlId="firstname">
//         <Form.Label>First Name</Form.Label>
//         <Form.Control
//           type="text"
//           name="firstname"
//           value={formData.firstname}
//           onChange={handleChange}
//         />
//         {errors.firstname && (
//           <Form.Text className="text-danger">{errors.firstname}</Form.Text>
//         )}
//       </Form.Group>
//       <Form.Group controlId="lastname">
//         <Form.Label>Last Name</Form.Label>
//         <Form.Control
//           type="text"
//           name="lastname"
//           value={formData.lastname}
//           onChange={handleChange}
//         />
//         {errors.lastname && (
//           <Form.Text className="text-danger">{errors.lastname}</Form.Text>
//         )}
//       </Form.Group>
//       <Form.Group controlId="email">
//         <Form.Label>Email</Form.Label>
//         <Form.Control
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         {errors.email && (
//           <Form.Text className="text-danger">{errors.email}</Form.Text>
//         )}
//       </Form.Group>
//       <Form.Group controlId="password">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         {errors.password && (
//           <Form.Text className="text-danger">{errors.password}</Form.Text>
//         )}
//       </Form.Group>
//       <Form.Group controlId="retypePassword">
//         <Form.Label>Retype Password</Form.Label>
//         <Form.Control
//           type="password"
//           name="retypePassword"
//           value={formData.retypePassword}
//           onChange={handleChange}
//         />
//         {errors.retypePassword && (
//           <Form.Text className="text-danger">{errors.retypePassword}</Form.Text>
//         )}
//       </Form.Group>
//       <Form.Group controlId="image">
//         <Form.Label>Image</Form.Label>
//         <Form.Control type="file" name="image" onChange={handleChange} />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Register
//       </Button>
//     </Form>
//   );
// };

// export default RegistrationForm;
