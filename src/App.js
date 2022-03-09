import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import React from 'react';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <Container>
        <h1> Welcome to the e-commerce site</h1>
      </Container>
      <Header />
      <Footer />
    </>
  );
};

export default App;
