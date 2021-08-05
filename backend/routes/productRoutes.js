import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

//@desc    Fetch all prodcuts
//@route   GET /api/products
//@access  Public(No need to log in)
router.get('/',asyncHandler(async (req,res)=>{
    const products = await Product.find();
    res.json(products);
}))

//@desc    Fetch single prodcut
//@route   GET /api/products/:id
//@access  Public(No need to log in)
router.get('/:id',asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product)
        res.json(product);
    else
    {
        res.status(404).json('Product not found');
    }
}))

export default router;