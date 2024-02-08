import React from 'react';
import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books, onStatusChange,onDelete }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mr-4 gap-4'>
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} onStatusChange={onStatusChange} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BooksCard;
