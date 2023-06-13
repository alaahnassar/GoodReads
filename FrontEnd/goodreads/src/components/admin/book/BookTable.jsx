import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchData, addData, deleteBook, updateData } from "../../../state/API";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from 'sweetalert2';
import Image from 'react-bootstrap/Image';

function BookTable() {
  //for select data for table
  const [bookData, setBookData] = useState([]);
  //for select data for droplist to from
  const [categoryName, setCategory] = useState([]);
  const [authorName, setAuthor] = useState([]);
  //for show model
  const [show, setShow] = useState(false);
  //for change button for form
  const [flag, setFalg] = useState(true);
  //for validate from
  const [validated, setValidated] = useState(false);
  //for get data from form
  const [BookName, setBookName] = useState("");
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");
  const [selectedAuthorValue, setSelectedAuthorValue] = useState("");
  const [selectedImage, setSelectedImage] = useState({});
  const [selectBookId, setBookId] = useState("");
  // Access the token from session storage
  const token = sessionStorage.getItem('token');
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpZCI6IjY0NmFiZjdmMThlMzk5ZDdjZjA0OTNiZCIsImlhdCI6MTY4NDcxNzQ4OH0.EptcxHe70x1PORjDC-1BgJawglokJYLf2rxc-Yc5Jbw";

  // Function to reset the form fields
  const resetForm = () => {
    setBookName("");
    setSelectedCategoryValue("");
    setSelectedAuthorValue("");
    setSelectedImage({});
    setValidated(false);
  };

  //for display from
  const handleClose = () => {
    setShow(false);
    resetForm(); // Reset the form fields
  };

  const getDataCatAuth = () => {
    fetchData("http://localhost:8080/admin/categories", token)
      .then((data) => {
        setCategory(data);
        console.log(categoryName);
      })
      .catch((error) => {
        console.log(error);
      });
    fetchData("http://localhost:8080/authors", token)
      .then((data) => {
        setAuthor(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShow = (bookId) => {
    setShow(true);
    if (bookId !== null) {
      fetchData(`http://localhost:8080/admin/books/${bookId}`, token)
        .then((data) => {
          console.log(data);
          setBookName(data.data.name);
          setSelectedCategoryValue(data.data.category_id._id); // Set the selected category value
          setSelectedAuthorValue(data.data.author_id._id); // Set the selected author value
          setSelectedImage(data.data.book_image);
          setBookId(bookId);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //for connecting with api
  useEffect(() => {
    fetchData("http://localhost:8080/admin/books")
      .then((data) => {
        setBookData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getDataCatAuth();
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const formData = new FormData();
      formData.append("name", BookName);
      formData.append("author_id", selectedAuthorValue);
      formData.append("category_id", selectedCategoryValue);
      formData.append("file", selectedImage);
      if (flag) {
        addData("http://localhost:8080/admin/books", token, formData)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      } else {
        formData.append("id", selectBookId);

        updateData("http://localhost:8080/admin/books", token, formData)
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    setValidated(true);
  };
  //for addBook data
  const addBookData = () => {
    setFalg(true);
    handleShow(null);
  };

  //for delete book data
  const deleteBookData = async (id) => {
    try {
      const shouldDelete = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this book!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonColor: "#dc3545",
        iconColor: "#dc3545",
      });

      if (shouldDelete.isConfirmed) {
        deleteBook("http://localhost:8080/admin/books", id)
          .then((data) => {
            console.log(data);
            if (data.message === "book deleted successfully.")
              setBookData((prevState) =>
                prevState.filter((el) => el._id !== id)
              );
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //for update book
  const updateBookData = (bookId) => {
    setFalg(false);
    handleShow(bookId);
  };

  //for get data from form
  const handleBookName = (e) => {
    setBookName(e.target.value);
  };
  const handleDropdownChangeForCategory = (event) => {
    setSelectedCategoryValue(event.target.value);
    console.log(selectedCategoryValue);
  };
  const handleDropdownChangeForAuthor = (event) => {
    setSelectedAuthorValue(event.target.value);
    console.log(selectedAuthorValue);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <>
      <div className="d-flex flex-row-reverse justify-content-between mb-4 ">
        <i
          type="button"
          className="bi bi-plus-circle fs-3"
          style={{ color: "#261c15" }}
          onClick={addBookData}
        ></i>
        <h2>Books</h2>
      </div>
      <Table>
        <thead className="border-0">
          <tr className="border-0">
            <th>ID</th>
            <th>Photo</th>
            <th> Name</th>
            <th>Category Name</th>
            <th>Author Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            bookData.map((book, index) => {
              const imageSrc =
                book.book_image && book.book_image.data
                  ? URL.createObjectURL(
                    new Blob([Int8Array.from(book.book_image.data.data)], {
                      type: book.book_image.contentType,
                    })
                  )
                  : null;

              return (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>
                    {imageSrc && <Image src={imageSrc} roundedCircle style={{ width: '50px', height: '50px' }} />}
                  </td>
                  <td>{book.name}</td>
                  <td>{book.category_id.name}</td>
                  <td>{book.author_id.firstname}</td>
                  <td>
                    <i
                      type="button"
                      className="bi bi-pencil me-3 fs-5"
                      style={{ color: "#261c15" }}
                      onClick={() => {
                        updateBookData(book._id);
                      }}
                    ></i>
                    <i
                      type="button"
                      className="bi bi-trash3 text-danger  fs-5"
                      onClick={() => {
                        deleteBookData(book._id);
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })
          }
        </tbody >

      </Table >

      {/* from model for add or update  */}
      < Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{BookName ? "Edit Book" : "Add Book"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* book input */}
            <Row className="mb-3">
              <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  value={BookName}
                  onChange={handleBookName}
                  required
                  type="text"
                  name="bookname"
                  placeholder="Book name"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* category name */}
            <Row className="mb-3 mt-3">
              <Form.Group md="4" controlId="validationCustom02">
                <Form.Label>Category name</Form.Label>
                <Dropdown>
                  <Form.Select
                    aria-label="Default select example"
                    value={selectedCategoryValue}
                    onChange={handleDropdownChangeForCategory}
                  >
                    <option disabled value="">
                      Select a Value
                    </option>
                    {categoryName.map((cat, index) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                </Dropdown>
              </Form.Group>
            </Row>
            {/* author name */}
            <Row className="mb-3 mt-3">
              <Form.Group md="4" controlId="validationCustom02">
                <Form.Label>Author name</Form.Label>
                <Dropdown>
                  <Form.Select
                    aria-label="Default select example"
                    value={selectedAuthorValue}
                    onChange={handleDropdownChangeForAuthor}
                  >
                    <option disabled value="">
                      Select a Value
                    </option>
                    {authorName.map((auth, index) => (
                      <option key={auth._id} value={auth._id}>
                        {auth.firstname + " " + auth.lastname}
                      </option>
                    ))}
                  </Form.Select>
                </Dropdown>
              </Form.Group>
            </Row>
            {/* input iamge */}
            <Row className="mb-3">
              <Form.Group md="4" controlId="validationCustom02">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  required
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
            </Row>
            <Button type="submit">{flag ? "Add Book" : "Edit Book "} </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
}

export default BookTable;
