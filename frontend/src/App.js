import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';

const App = ()=>{
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path='/' exact component={HomeScreen}/>
          <Route path='/product/:id' exact component={ProductScreen}/>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
