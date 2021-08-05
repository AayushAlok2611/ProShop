import express from 'express';
import products  from './data/products.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const app = express();

//Connect to Mongo DB
connectDB();

//Moutning routes
app.use('/api/products',productRoutes);

app.get('/',(req,res)=>{
    res.send('API is running');
})

app.use((req,res,next)=>{
    const error = new Error(`Not found - ${req.originalUrl}`);//throwing a new error if trying to access an undefined
                                                                //route
    res.status(404);
    next(error);
})

app.use((err,req,res,next)=>{
    const statusCode = res.statusCode ===200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV === 'production' ? null :err.stack //stack trace is visible only in development mode
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold);
})