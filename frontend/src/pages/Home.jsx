import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import BooksTable from '../components/home/BookTable';
import BookCard from '../components/home/BookCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All'); // Initial filter status

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // Filter books based on search query and status
        const filteredResults = books.filter(book =>
            (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (filterStatus === 'All' || book.status === filterStatus)
        );
        setFilteredBooks(filteredResults);
    }, [books, searchQuery, filterStatus]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleStatusChange = () => {
        // Fetch updated data after status change
        axios.get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };
    const handleDelete = (deletedBookId) => {
        // Remove the deleted book from the list of books
        setBooks(prevBooks => prevBooks.filter(book => book._id !== deletedBookId));
    };

    return (
        <div>
            <div className='p-4'>
                <div className='flex justify-between items-center gap-x-4 p-4'>
                    <h1 className="text-3xl font-bold mb-4 text-white">Book List</h1>
                    <div className="flex items-center">
                        <div>
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                className="border border-gray-400 rounded-md p-2 mr-2"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="flex items-center mr-4">
                        <span className="text-gray-400">Filter by Status:</span>  <select
                                value={filterStatus}
                                onChange={handleFilterChange}
                                className="border border-gray-400 rounded-md p-2 mr-2"
                            >
                                <option value="All">All</option>
                                <option value="Start">Start</option>
                                <option value="Reading..">Reading..</option>
                                <option value="Complete">Complete</option>
                            </select>
                            
                        </div>
                        <div>
                            <Link to='/books/create'>
                                <div className="flex items-center bg-blue-500 rounded-md p-2 pl-4 pr-4 cursor-pointer hover:bg-blue-600">
                                    <MdAdd className='text-white text-2xl' />
                                    <span className="text-white ml-2">Add Book</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                {loading ? (
                    <Spinner />
                ) :  (
                    <BookCard books={filteredBooks} onStatusChange={handleStatusChange} onDelete={handleDelete} />
                ) }
            </div>
            <div className='gradient-background'></div>
        </div>
    );
};

export default Home;
