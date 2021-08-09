import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

const App = ()=>{
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path='/login' exact component={LoginScreen}/>
          <Route path='/register' exact component={RegisterScreen}/>
          <Route path='/profile' exact component={ProfileScreen}/>
          <Route path='/product/:id' exact component={ProductScreen}/>
          <Route path='/cart/:id?' exact component={CartScreen}/>
          <Route path='/' exact component={HomeScreen}/>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
