import React, { useEffect, useState } from 'react'
import { fetchData } from '../../state/API';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import BookDetailsData from "../../components/user/BookDetailsData";
import jwtDecode from 'jwt-decode';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [image, setImage] = useState(null);
  const token = sessionStorage.getItem('token');
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImlkIjoiNjQ2YjZhOTQwYjZlYTllYzMyMzY2OTFjIiwiaWF0IjoxNjg2MDUyMTE2fQ.i5qDjNmljDAyLgdgmzZ7LhZpXuC0obfbRZMSJl0qpEs';
  let user_id = null;

  try {
    const decoded = jwtDecode(token);
    // Access the decoded data
    const { role, id, iat } = decoded;
    user_id = id;
    console.log(id)
  } catch (error) {
    console.error('Invalid token');
  }

  const fetchDataFromApi = async () => {
    try {
      fetchData(`http://localhost:8080/admin/books/${id}`, token)
        .then((data) => {
          console.log(data)
          setBook(data.data)
        }).catch((error) => {
          console.log(error)
        });
      // const blob = new Blob([Int8Array.from(jsonData.data.image.data.data)], { type: jsonData.data.image.contentType });
      // setImage(window.URL.createObjectURL(blob));
    } catch (error) {
      console.log(error);
    }
  };

  const updateDataFromApi = async (dataToUpdate) => {
    try {
      const url = `http://127.0.0.1:8080/checkBook/${user_id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate),
      });
      const jsonData = await response.json();
      // Swal.fire(
      //     'Good job!',
      //     'You clicked the button!',
      //     'success'
      // )

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <>
      <Container>
        <BookDetailsData book={book} updateDataFromApi={updateDataFromApi}></BookDetailsData>
      </Container>
    </>
  );
};

export default BookDetails;
