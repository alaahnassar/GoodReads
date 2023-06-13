import React, { useEffect, useState } from "react";
import { fetchData, addData, deleteData, updateData } from "../../state/API";
import AuthorTable from "../../components/admin/author/AuthorTable";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthorForm from "../../components/admin/author/AuthorForm";
import Swal from "sweetalert2";
import Styles from "./Author.module.css";

const Author = () => {
  const [data, setData] = useState([]);
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpZCI6IjY0NmFiZjdmMThlMzk5ZDdjZjA0OTNiZCIsImlhdCI6MTY4NDcxNzQ4OH0.EptcxHe70x1PORjDC-1BgJawglokJYLf2rxc-Yc5Jbw";
  // Access the token from session storage
  const token = sessionStorage.getItem('token');
  const fetchDataFromApi = async () => {
    try {
      const url = "http://127.0.0.1:8080/authors";
      const jsonData = await fetchData(url, token);
      setData(jsonData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addDataFromApi = async (data) => {
    try {
      const url = "http://127.0.0.1:8080/authors";
      const jsonData = await addData(url, token, data);
      console.log(jsonData);
      jsonData.data.dateOfBirth = new Date(jsonData.data.dateOfBirth)
        .toISOString()
        .substring(0, 10);
      setData((prevData) => [...prevData, jsonData.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDataFromApi = async (id) => {
    try {
      const shouldDelete = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this author!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonColor: "#dc3545",
        iconColor: "#dc3545",
      });

      if (shouldDelete.isConfirmed) {
        const url = `http://127.0.0.1:8080/authors/${id}`;
        const jsonData = await deleteData(url, token);
        console.log(jsonData);
        if (jsonData.data.acknowledged)
          setData((prevState) => prevState.filter((el) => el._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateDataFromApi = async (id, dataForm) => {
    try {
      const url = `http://127.0.0.1:8080/authors/${id}`;
      const jsonData = await updateData(url, token, dataForm);
      console.log(jsonData)
      if (jsonData.message === "updated") {
        jsonData.data.dateOfBirth = new Date(jsonData.data.dateOfBirth)
          .toISOString()
          .substring(0, 10);
        setData(prevData => {
          return prevData.map(author => {
            if (author._id === id) {
              const updatedAuthor = {
                ...author,
                firstname: jsonData.data.firstname,
                lastname: jsonData.data.lastname,
                dateOfBirth: jsonData.data.dateOfBirth,
                image: jsonData.data.image,
              };
              return updatedAuthor;
            }
            return author;
          });
        });
      } else {
        // setErrorMessage(jsonData.message); // Set the error message received from the server
        // console.log(errorMessage)
      }
      return jsonData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [data]);

  return (
    <div className={`mb-5 ${Styles.bg}`}>
      <Container className={Styles.shadow} style={{ backgroundColor: "white" }}>
        <Row className="mb-4">
          <Col className="d-flex align-items-end justify-content-between">
            <h2>Authors</h2>
            <AuthorForm addDataFromApi={addDataFromApi} />
          </Col>
        </Row>
        <Row>
          <AuthorTable
            data={data}
            deleteDataFromApi={deleteDataFromApi}
            updateDataFromApi={updateDataFromApi}
          />
        </Row>
      </Container>
    </div>
  );
};

export default Author;
