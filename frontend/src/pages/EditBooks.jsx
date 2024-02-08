import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import Form from '../components/Form/Form';

const EditBooks = () => {
  const { id } = useParams();
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

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        const { title, author, publishYear, genre, isbn, image, note, status, completeDate } = response.data;
        setFormData({ title, author, publishYear, genre, isbn, image, note, status, completeDate });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleEditBook = () => {
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, formData)
      .then(() => {
        setLoading(false);
        navigate('/');
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
        <h1 className="text-3xl font-bold">Edit Book</h1>
      </div>
      
      {loading && <Spinner />}
      <Form formData={formData} setFormData={setFormData} onSubmit={handleEditBook} loading={loading} />
    </div>
  );
};

export default EditBooks;
