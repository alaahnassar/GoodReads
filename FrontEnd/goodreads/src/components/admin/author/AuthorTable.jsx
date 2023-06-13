import React from 'react'
import Table from 'react-bootstrap/Table';
import AuthorData from './AuthorData';

const AuthorTable = ({ data, deleteDataFromApi, updateDataFromApi }) => {
    return (
        <Table responsive striped bordered className='text-center'>
            <thead className='border-0'>
                <tr className='border-0'>
                    <th>ID</th>
                    <th>Photo</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date Of Birth</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((author, index) => (
                        <AuthorData key={author._id} author={author} index={index}
                            deleteDataFromApi={deleteDataFromApi} updateDataFromApi={updateDataFromApi} />
                    ))
                }
            </tbody>
        </Table>
    );
}

export default AuthorTable
