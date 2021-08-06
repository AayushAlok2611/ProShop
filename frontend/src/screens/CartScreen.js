import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { addToCart } from '../actions/cartActions';
import Message from '../components/Message';

const CartScreen = ({match,location,history}) => {
    const productId = match.params.id; //there is not always an id since in App.js we have stated id as an optional param
    const qty = location.search ? Number(location.search.split('=')[1]) : 1; //defualt qty is 1
    const dispatch = useDispatch();
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    },[dispatch,productId,qty]);
    return (
        <>
        </>
    )
}

export default CartScreen
