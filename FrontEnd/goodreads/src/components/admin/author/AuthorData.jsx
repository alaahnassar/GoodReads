import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import AuthorForm from './AuthorForm';

const AuthorData = ({ author, index, deleteDataFromApi, updateDataFromApi, errorMessage }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        dateOfBirth: '',
    });

    useEffect(() => {
        setFormData({
            firstname: author.firstname,
            lastname: author.lastname,
            dateOfBirth: author.dateOfBirth,
        });
    }, [author]);

    const imageSrc = author.image && author.image.data
        ? URL.createObjectURL(new Blob([Int8Array.from(author.image.data.data)], { type: author.image.contentType }))
        : null;

    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td>
                    {imageSrc && <Image src={imageSrc} roundedCircle style={{ width: '50px', height: '50px' }} />}
                </td>
                <td>{formData.firstname}</td>
                <td>{formData.lastname}</td>
                <td>{formData.dateOfBirth}</td>
                <td>
                    <AuthorForm updateDataFromApi={updateDataFromApi} author={author} errorMessage={errorMessage} />{' '}
                    {/* <Button variant="danger" onClick={() => deleteDataFromApi(author._id)}>
                        delete
                    </Button>{' '} */}
                    <i type="button" className="bi bi-trash3 text-danger  fs-5" onClick={() => deleteDataFromApi(author._id)}></i>
                </td>
            </tr>
        </>
    );
};

export default AuthorData;
