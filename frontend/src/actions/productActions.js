import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants'
import axios from 'axios';

export const listProducts = ()=>async dispatch=>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data}  = await axios.get('/api/products');
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL , 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
        //Here error.response.data.message is the custom error message , if any , that is thron by our backend server
        //error.response exists if some error occurs with our backend but if some error occurs with the process
        //of ending the request to the backend then only error exists no error.response
    }
}

export const listProductDetails = (prodId)=>async dispatch=>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});

        const {data}  = await axios.get(`/api/products/${prodId}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL , 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
        //Here error.response.data.message is the custom error message , if any , that is thron by our backend server
        //error.response exists if some error occurs with our backend but if some error occurs with the process
        //of ending the request to the backend then only error exists no error.response
    }
}