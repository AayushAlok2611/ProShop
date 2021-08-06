import React,{useEffect} from 'react'
import { Col, Image, ListGroup, ListGroupItem, Row ,Form,Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { addToCart } from '../actions/cartActions';
import Message from '../components/Message';

const CartScreen = ({match,location,history}) => {
    const productId = match.params.id; //there is not always an id since in App.js we have stated id as an optional param
    const qty = location.search ? Number(location.search.split('=')[1]) : 1; //defualt qty is 1
    const dispatch = useDispatch();

    const {cartItems} = useSelector(state=>state.cart);

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    },[dispatch,productId,qty]);

    const removeFromCartHandler = (prodId)=>{

    }

    const checkoutHandler = ()=>{
        history.push('/login?redirect=shipping'); // on checking out if user not logged in the head to login page else if user logged in then head to shipping page
        
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {   
                    cartItems.length==0 ? <Message>Your cart is empty <Link to='/'>Go back</Link> </Message>:
                    (
                        <ListGroup variant='flush'>
                            {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>${item.price}</Col>
                                <Col md={2}>
                                    <Form.Control
                                    as='select'
                                    value={item.qty}
                                    onChange={(e) =>
                                        dispatch(
                                        addToCart(item.product, Number(e.target.value))
                                        )
                                    }
                                    >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                        </option>
                                    ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button
                                    type='button'
                                    variant='light'
                                    onClick={() => removeFromCartHandler(item.product)} //item.product is the product _id
                                    >
                                    <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                                </Row>
                            </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <h2>
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                            items
                        </h2>
                        $
                        {cartItems
                            .reduce((acc, item) => acc + item.qty * item.price, 0)
                            .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
