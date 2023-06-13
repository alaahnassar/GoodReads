import React, { useEffect, useState } from 'react'
import { fetchData } from '../../state/API';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthorBooks from '../../components/user/author/AuthorBooks';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

const AuthorUser = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState([]);
    const [books, setBooks] = useState([]);
    const [image, setImage] = useState(null);
    const token = sessionStorage.getItem('token');
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImlkIjoiNjQ2YjZhOTQwYjZlYTllYzMyMzY2OTFjIiwiaWF0IjoxNjg2MDUyMTE2fQ.i5qDjNmljDAyLgdgmzZ7LhZpXuC0obfbRZMSJl0qpEs';
    let user_id = null;
    try {
        const decoded = jwtDecode(token);
        // Access the decoded data
        const { role, id, iat } = decoded;
        user_id = id;
    } catch (error) {
        console.error('Invalid token');
    }

    const fetchDataFromApi = async () => {
        try {
            const url = `http://127.0.0.1:8080/authors/${id}`;
            const jsonData = await fetchData(url, token);
            setAuthor(jsonData.data);
            const blob = new Blob([Int8Array.from(jsonData.data.image.data.data)], { type: jsonData.data.image.contentType });
            setImage(window.URL.createObjectURL(blob));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchBooksDataFromApi = async () => {
        try {
            const url = `http://127.0.0.1:8080/authorsBooks/${id}`;
            const jsonData = await fetchData(url, token);
            setBooks(jsonData.data);
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
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            )

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDataFromApi();
        fetchBooksDataFromApi();
    }, []);

    return (
        <>
            <Container>
                <div>
                    <Card className='border-0' style={{ margin: '20px 0px' }}>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Card.Img
                                        src={image}
                                        alt="Card image"
                                        style={{ width: '100%', height: '400px' }}
                                    />
                                </Col>
                                <Col className='pt-4 px-4' md={8}>
                                    <Card.Title className='text-capitalize fs-2'>{author.firstname + " " + author.lastname}</Card.Title>
                                    <Card.Text className='px-2'>
                                        {author.dateOfBirth}
                                    </Card.Text>
                                    {/* <Card.Text>
                                    Additional information can go here Additional information can go here.
                                    Additional information can go here Additional information can go here
                                    Additional information can go here Additional information can go here
                                    Additional information can go here Additional information can go here
                                    Additional information can go here Additional information can go here
                                </Card.Text> */}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
                <div className='border'>
                    <AuthorBooks books={books} updateDataFromApi={updateDataFromApi}></AuthorBooks>
                </div>
            </Container>
        </>
    )
}

export default AuthorUser
