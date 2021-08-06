import express from 'express';
import products  from './data/products.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import {errorHandler,notFound} from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();
const app = express();

app.use(express.json());

//Connect to Mongo DB
connectDB();

//Moutning routes
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);


app.get('/',(req,res)=>{
    res.send('API is running');
})

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold);
})