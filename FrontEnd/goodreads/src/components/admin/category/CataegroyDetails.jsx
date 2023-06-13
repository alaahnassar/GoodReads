import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchData, addData, deleteBook, updateData } from "../../../state/API";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";

function CataegroyDetails() {
  //for select data for table
  const [bookData, setBookData] = useState([]);
  //for select data for droplist to from
  const [categoryName, setCategory] = useState([]);

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
  // const token = sessionStorage.getItem('token');
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpZCI6IjY0NmFiZjdmMThlMzk5ZDdjZjA0OTNiZCIsImlhdCI6MTY4NDcxNzQ4OH0.EptcxHe70x1PORjDC-1BgJawglokJYLf2rxc-Yc5Jbw";

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



  const handleShow = (bookId) => {
    console.log(bookId);
    setShow(true);
    if (bookId !== null) {
      fetchData(`http://localhost:8080/admin/categories/${bookId}`, token)
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
    fetchData("http://localhost:8080/admin/categories")
      .then((data) => {
        setBookData(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        if (flag) {
            let objBookName={name:BookName}
            event.preventDefault();
            console.log(objBookName)
        addData("http://localhost:8080/admin/categories", token, objBookName)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      } else {
        updateData(
          "hhttp://localhost:8080/admin/categories",
          token,
          selectBookId
        )
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

  return (
    <>
      <div className="d-flex flex-row-reverse mb-4 ">
        <i
          type="button"
          className="bi bi-plus-circle text-primary fs-3"
          onClick={addBookData}
        ></i>
      </div>
      <Table>
        <thead className="border-0">
          <tr className="border-0">
            <th>ID</th>
            <th> Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookData.map((book, index) => (
            <tr key={book._id}>
              <td>{index + 1}</td>
              <td>{book.name}</td>
              <td>
                <i
                  type="button"
                  className="bi bi-pencil text-info me-3 fs-5"
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
          ))}
        </tbody>
      </Table>

      {/* from model for add or update  */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {BookName ? "Edit Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* book input */}
            <Row className="mb-3">
              <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>Category Name</Form.Label>
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
            <Button type="submit">{flag ? "Add Book" : "Edite Book "} </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CataegroyDetails;
