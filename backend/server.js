import express from 'express';
import products  from './data/products.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';

dotenv.config();
const app = express();

//Connect to Mongo DB
connectDB();

app.get('/api/products',(req,res)=>{
    res.json(products);
})

app.get('/api/products/:id',(req,res)=>{
    const product = products.find(p=>p._id===req.params.id);
    res.json(product);
})

app.get('/',(req,res)=>{
    res.send('API is running');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold);
})