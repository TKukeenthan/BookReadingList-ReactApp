// CreateBooks.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import Form from '../../components/Form/Form';

const CreateBooks = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishYear: '',
    genre: '',
    isbn: '',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
    note: '',
    status: 'Start',
    completeDate: null
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    setLoading(true);
    axios.post('http://localhost:5555/books', formData)
      .then(() => {
        setLoading(false);
        navigate('/', { replace: true }); // Navigate to the home screen and reload
      })
      .catch((error) => {
        console.log(error);
        alert('Error occurred');
        setLoading(false);
      });
  };

  return (
    <div className='p-4'>
      <div className="bg-purple-500 text-white text-center py-4 rounded-lg mb-8">
        <h1 className="text-3xl font-bold">Create Book</h1>
      </div>
     
      {loading && <Spinner />}
      <Form formData={formData} setFormData={setFormData} onSubmit={handleSaveBook} loading={loading} />
    </div>
  );
};

export default CreateBooks;
