import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { Login } from '../../actions/UserActions';
import env from 'react-dotenv';
import Axios from 'axios';

const LoginPage = () => {
  const goTo = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await Axios.post(`${env.API_URL}/user/login`, { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', JSON.stringify(res.data.token));
        goTo(0);
        goTo('/profile');
      })
      .catch((e) => {
        console.log(e);
        window.alert(e);
      });
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form className='m-4'>
        <Form.Group controlId='email' className='mb-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' onClick={handleLogin}>
          Sign In
        </Button>
      </Form>

      <Row className='m-3'>
        <Col>
          New Customer? <Link to='/register'>Register</Link>
        </Col>
        <p>{email}</p>
        <p>{password}</p>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
