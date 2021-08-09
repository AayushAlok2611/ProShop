import React,{useState,useEffect} from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel,Row,Col } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import {Link} from 'react-router-dom'
import { login } from '../actions/userActions';
import Loader from '../components/Loader';

const LoginScreen = ({history,location}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();

    const {loading,error,userInfo} = useSelector(state=>state.userLogin);
    
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(()=>{
        if(userInfo){ //if user already logged in
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = e=>{
        e.preventDefault();
        //dispatch login action
        dispatch(login(email,password));
    }

    return (
        <FormContainer>
            <h1>Sign in</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='email'>
                    <FormLabel >Email Address</FormLabel>
                    <FormControl type='email' placeholder='enter email' value={email} onChange={e=>setEmail(e.target.value)}></FormControl>
                </FormGroup>
                <FormGroup controlId='password'>
                    <FormLabel >Password</FormLabel>
                    <FormControl type='password' placeholder='enter password' value={password} onChange={e=>setPassword(e.target.value)}></FormControl>
                </FormGroup>
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
