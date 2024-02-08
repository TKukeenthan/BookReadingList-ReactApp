import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Button, Box } from "@material-ui/core";
import { 
    AccountCircleOutlined as AccountCircleOutlinedIcon,
    CalendarTodayOutlined as CalendarTodayOutlinedIcon,
    CategoryOutlined as CategoryOutlinedIcon,
    CodeOutlined as CodeOutlinedIcon,
    InfoOutlined as InfoOutlinedIcon,
    ArrowBack as ArrowBackIcon
} from '@material-ui/icons';
import Spinner from '../components/Spinner';

const ShowBooks = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5555/books/${id}`)
            .then(response => {
                setBook(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    if (!book) {
        return <Typography color="error">Book not found</Typography>;
    }

    return (
        <div className="p-4 w-600 flex">
           
            <Box borderRadius={16} boxShadow={3} p={3} className="flex flex-wrap justify-center items-center mb-4">
                <img src={book.image} alt={book.title} className="w-64 h-auto mr-4 mb-4" />
               <div className='flex flex-col'> 
               <Typography variant="h4" color="textPrimary" className="mb-2">
                {book.title}
            </Typography>
            {book.author && (
                        <Typography variant="subtitle1" color="textSecondary" className="font-medium mb-2">
                             {book.author}
                        </Typography>
                    )}
               </div>
               
                <div className="flex flex-row">
                
                   
                    {book.publishYear && (
                        <Typography variant="body2" color="textSecondary" className="mb-2">
                            <CalendarTodayOutlinedIcon /> <strong>Publish Year:</strong> {book.publishYear}
                        </Typography>
                    )}
                    {book.genre && (
                        <Typography variant="body2" color="textSecondary" className="mb-2">
                            <CategoryOutlinedIcon /> <strong>Genre:</strong> {book.genre}
                        </Typography>
                    )}
                    {book.isbn && (
                        <Typography variant="body2" color="textSecondary" className="mb-2">
                            <CodeOutlinedIcon /> <strong>ISBN:</strong> {book.isbn}
                        </Typography>
                    )}
                    {book.status && (
                        <Typography variant="body2" color="textSecondary" className="mb-2">
                            <InfoOutlinedIcon /> <strong>Status:</strong> {book.status}
                        </Typography>
                    )}
                    {book.completeDate && (
                        <Typography variant="body2" color="textSecondary" className="mb-2">
                            <CalendarTodayOutlinedIcon /> <strong>Complete Date:</strong> {new Date(book.completeDate).toLocaleDateString()}
                        </Typography>
                    )}
                </div>
            </Box>
            {book.note && (
                <div className="w-full mb-4">
                    <Typography variant="body2" color="textSecondary">
                        <InfoOutlinedIcon /> <strong>Note:</strong> {book.note}
                    </Typography>
                </div>
            )}
           
        </div>
    );
};

export default ShowBooks;
