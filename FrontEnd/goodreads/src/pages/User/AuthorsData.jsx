import React, { useEffect, useState } from 'react'
import { fetchData } from '../../state/API';
import Container from 'react-bootstrap/Container';
import AuthorsCard from '../../components/user/author/AuthorsCard';
import "./AuthorsData.css"

const AuthorUser = () => {
    const [authors, setAuthors] = useState([]);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImlkIjoiNjQ2YjZhOTQwYjZlYTllYzMyMzY2OTFjIiwiaWF0IjoxNjg2MDUyMTE2fQ.i5qDjNmljDAyLgdgmzZ7LhZpXuC0obfbRZMSJl0qpEs';
    const token = sessionStorage.getItem('token');
    const fetchDataFromApi = async () => {
        try {
            const url = 'http://127.0.0.1:8080/authors';
            const jsonData = await fetchData(url, token);
            setAuthors(jsonData.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDataFromApi();
    }, [authors])

    return (
        <>
            <Container>
                <article className='book-list'>
                    {authors.map((author) => {
                        return <AuthorsCard author={author} key={author._id} />;
                    })}
                </article>
            </Container>
        </>
    )
}

export default AuthorUser
