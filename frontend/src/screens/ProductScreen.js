import React,{useEffect} from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import {useDispatch,useSelector} from 'react-redux';
import {listProductDetails} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


const ProductScreen = ({match}) => {
    const dispatch  = useDispatch();
    useEffect( ()=>{
        dispatch(listProductDetails(match.params.id));
    },[match.params.id,dispatch]) //adding match also doest the job

    const {product,loading,error} = useSelector(state=>state.productDetails);

    return (
        <>
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>
        {
            loading ? <Loader/>: error ? <Message varaint='danger'>{error}</Message>:
            <Row>
                <Col md={6} >
                    <Image src={product.image} alt={product.name} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroupItem>
                        <ListGroupItem>
                            Price:${product.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            Description: {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Price
                                    </Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Status
                                    </Col>
                                    <Col>{product.countInStock>0 ?'In Stock':'Out of Stock'}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button className='btn btn-block' type='button' disabled={product.countInStock===0}>Add To Cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        }
        </>
    )
}

export default ProductScreen
