
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useBookForm } from './model';


import CreateBooks from '../CreateBooks';

const CreateBooksController = () => {
  const formData = useBookForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title: formData.title,
      author: formData.author,
      publishYear: formData.publishYear,
      genre: formData.genre,
      isbn: formData.isbn,
      image: formData.image,
      note: formData.note,
      isRead: formData.isRead,
      completeDate: formData.completeDate,
    };
    setLoading(true);
    axios.post('http://localhost:5555/books', data)
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

  const handleChange = (field, value) => {
    switch (field) {
      case 'title':
        formData.setTitle(value);
        break;
      case 'author':
        formData.setAuthor(value);
        break;
      case 'publishYear':
        formData.setPublishYear(value);
        break;
      case 'genre':
        formData.setGenre(value);
        break;
      case 'isbn':
        formData.setIsbn(value);
        break;
      case 'image':
        formData.setImage(value);
        break;
      case 'note':
        formData.setNote(value);
        break;
      case 'isRead':
        formData.setIsRead(value);
        break;
      case 'completeDate':
        formData.setCompleteDate(value);
        break;
      default:
        break;
    }
  };

  return (
    <CreateBooks
      formData={formData}
      loading={loading}
      handleSaveBook={handleSaveBook}
      handleChange={handleChange}
    />
  );
};

export default CreateBooksController;
