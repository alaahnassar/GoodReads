import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AuthorForm = ({ addDataFromApi, updateDataFromApi, author }) => {
    const [show, setShow] = useState(false);
    const [change, setChange] = useState(false);
    const formRef = useRef(null);

    const handleClose = () => {
        resetForm();
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        dateOfBirth: '',
        image: null,
        errors: {},
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        // If the input is a file input, use the file object
        const inputValue = name === 'image' ? files[0] : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: inputValue,
        }));
        setChange(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        let hasErrors = false;

        // Validate each input field
        if (formData.firstname.length < 3 || formData.firstname.length > 10) {
            errors.firstname = 'First name must be between 3 and 10 characters.';
            hasErrors = true;
        }

        if (formData.lastname.length < 3 || formData.lastname.length > 10) {
            errors.lastname = 'Last name must be between 3 and 10 characters.';
            hasErrors = true;
        }

        if (!formData.dateOfBirth) {
            errors.dateOfBirth = 'Date of birth is required.';
            hasErrors = true;
        }

        if (hasErrors) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                errors: { ...errors },
            }));
            return;
        }

        // Create a FormData object to send the form data and file
        const formDataToSend = new FormData();
        formDataToSend.append('firstname', formData.firstname);
        formDataToSend.append('lastname', formData.lastname);
        formDataToSend.append('dateOfBirth', formData.dateOfBirth);
        formDataToSend.append('image', formData.image);

        if (author) {
            formDataToSend.append('change', change);
            updateDataFromApi(author._id, formDataToSend)
                .then((jsonData) => {
                    // Handle success
                    if (jsonData.message !== 'updated') {
                        // Set the error message received from the server
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            errors: { message: jsonData.message },
                        }));
                    } else {
                        resetForm();
                        handleClose();
                    }
                    console.log(jsonData);
                })
                .catch((error) => {
                    // Handle error
                    console.log(error);
                });
        } else {
            addDataFromApi(formDataToSend);
            resetForm();
            handleClose();
        }
    };

    const resetForm = () => {
        setFormData({
            firstname: author ? author.firstname : '',
            lastname: author ? author.lastname : '',
            dateOfBirth: author ? author.dateOfBirth : '',
            image: author ? author.image : null,
            errors: {},
        });
    };

    useEffect(() => {
        resetForm();
    }, []);

    useEffect(() => {
        const handleClickOutsideForm = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutsideForm);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideForm);
        };
    }, []);

    return (
        <>
            {/* <Button onClick={handleShow}> */}
            {author ? <i type="button" className="bi bi-pencil me-3 fs-5" style={{ color: "#261c15" }} onClick={handleShow}></i> : <i type="button" className="bi bi-plus-circle fs-3" style={{ color: "#261c15" }} onClick={handleShow}></i>}
            {/* </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{author ? 'Edit' : 'Add'} Author</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicInput1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleInputChange}
                            />
                            {formData.errors.firstname && (
                                <div className="text-danger mt-1">{formData.errors.firstname}</div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicInput2">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleInputChange}
                            />
                            {formData.errors.lastname && (
                                <div className="text-danger mt-1">{formData.errors.lastname}</div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                            />
                            {formData.errors.dateOfBirth && (
                                <div className="text-danger mt-1">{formData.errors.dateOfBirth}</div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="image" onChange={handleInputChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AuthorForm;
