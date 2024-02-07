import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mangoose from 'mongoose';
import{ Book } from './models/bookModel.js';
import bookRoute from './routes/bookRoutes.js';

import cors from 'cors';
const app = express();

 // middleware for parsing request body
 app.use(express.json());
 //middleware for handling CORS policy
 //app.use(cors())
 app.use(
     cors({
         origin:'http://localhost:5173',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type'],
     })
  );
app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('hi trk')
})
app.use('/books',bookRoute);
mangoose
 .connect(mongoDBURL)
 .then(()=>{
    console.log('App Connected to Database ');
    app.listen(PORT,()=>{
    console.log(`App is Listening to port: ${PORT}`);
})})
 .catch((error)=>{
    console.log(error);
 });