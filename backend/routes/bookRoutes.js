import express from 'express';
import { Book  } from '../models/bookModel.js';

const router =express.Router();
// Route for Save a new Book
router.post('/',async(request,response)=>{
    try{
if(
    !request.body.title || 
    !request.body.author
)
{
return response.status(400).send({
    message: 'Send all required fields:title,author',});
}
const newBook = {
    title: request.body.title ,
    author: request.body.author ,
    publishYear: request.body.publishYear , // Default publish year
    genre: request.body.genre ,
    isbn: request.body.isbn ,
    image: request.body.image , // Default image path
    note: request.body.note ,
    status: request.body.status , // Default value for isRead
    completeDate: request.body.completeDate  // Default value for completeDate
};

const book = await Book.create(newBook);
return response.status(201).send(book);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
    
   
})

// Route for get all books from database

router.get('/', async (request,response)=>{
    try{
const book = await Book.find({
   
});
return response.status(200).json({
    count:book.length,
    data: book
});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});
// Route for get specific book from database
router.get('/:id', async (request,response)=>{
    try{
        const { id } =request.params;
const book = await Book.findById(id);
return response.status(200).json(  book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})
// Route for update specific book from database
router.put('/:id', async (request,response)=>{
try{
    if(
        !request.body.title || 
        !request.body.author
    ){
        return response.status(400).send({ 
            message: 'Send all required fields:title,author'
        });

    }
    const { id } =request.params;
    const result =await Book.findByIdAndUpdate(id,request.body)
    if(!result){
        return response.status(404).json({message:'Book not found'});
    }
    return response.status(200).send({message:'Book update successfully'});
}catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message});
}

});

// router for delete book

router.delete('/:id', async (request,response)=>{
    try{
        const { id } =request.params;
        const result =await Book.findByIdAndDelete(id)
        if(!result){
            return response.status(404).json({message:'Book not found'});
        }
        return response.status(200).send({message:'Book Delete successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

export default router;