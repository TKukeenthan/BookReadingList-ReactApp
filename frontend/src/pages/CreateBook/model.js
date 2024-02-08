// model.js
import { useState } from 'react';

export const useBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [genre, setGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [image, setImage] = useState('https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg');
  const [note, setNote] = useState('');
  const [isRead, setIsRead] = useState(false);
  const [completeDate, setCompleteDate] = useState(null);

  return {
    title,
    setTitle,
    author,
    setAuthor,
    publishYear,
    setPublishYear,
    genre,
    setGenre,
    isbn,
    setIsbn,
    image,
    setImage,
    note,
    setNote,
    isRead,
    setIsRead,
    completeDate,
    setCompleteDate,
  };
};
