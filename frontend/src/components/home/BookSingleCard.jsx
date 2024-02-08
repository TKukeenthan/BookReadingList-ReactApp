import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { Typography, Tooltip, Button } from "@material-tailwind/react";
import BookModal from './BookModal';
import DeleteBooks from '../../pages/DeleteBooks';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookSingleCard = ({ book, onStatusChange ,onDelete}) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [status, setStatus] = useState(book.status);
    const [title, setTitle] = useState(book.title);
   
    const [author, setAuthor] = useState(book.author);
    const navigate = useNavigate();

    const toggleReadStatus = () => {
        const updatedStatus = book.status === 'Start' ? 'Reading..' : 'Complete';

        const data = {
            title,
            author,
            status: updatedStatus,
            // Add current date and time if status is 'Complete'
            completeDate: updatedStatus === 'Complete' ? new Date().toISOString() : null
        };

        axios.put(`http://localhost:5555/books/${book._id}`, data).then(() => {
            if (updatedStatus === 'Reading..') {
                alert('Congratulations, You started to read the book.');
            } else {
                alert('Congratulations, You completed the book.');
            }
            setStatus(updatedStatus);
            onStatusChange(); // Call the onStatusChange function
            navigate('/');
        }).catch((error) => {
            console.log(error);
            alert('An error occurred');
        });
    };
    return (
        <div className="w-80 p-10 cursor-pointer border border-gray-300 bg-white rounded-xl">
            <div className="h-80  ">
                <img src={book.image} alt="profile-picture" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {book.title}
                </Typography>
                <Typography color="blue-gray" className="font-medium" textGradient>
                    {book.author}
                </Typography>
            </div>
            <div className="flex justify-center gap-7 pt-2">

            
                <Tooltip content="Show">
                 
                    <BiShow
                        className="text-3xl text-blue-800 hover:text-black cursor-pointer"
                        onClick={() => setShowModal(true)}
                    />
                </Tooltip>
                <Tooltip content="Edit">
                    <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
                    </Link>
                </Tooltip>
                <Tooltip content="Delete">
                <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
                    
                </Tooltip>
            </div>
            {showModal && (
                <BookModal book={book} onClose={() => setShowModal(false)} />
            )}
            {/* {showDeleteDialog && (
              //  <DeleteBooks onClose={handleCloseDeleteDialog} book={book} onDelete={onDelete}/>
            )} */}
            <div className="flex justify-center mt-4 bg-black w-100 h-50">
                <Button
                    color="black"
                    onClick={toggleReadStatus}
                    className="border-red-500 p-2"
                >
                  {status}
                </Button>
            </div>
        </div>
    );
};

export default BookSingleCard;



