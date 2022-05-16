import React, { useState } from 'react';
import FormContainer from '../../components/FormContainer';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import env from 'react-dotenv';

const RegisterPage = () => {
  const goTo = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await Axios.post(`${env.API_URL}/user/register`, user)
      .then((res) => {
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
      <h1>Sign Up</h1>

      <Form className='m-4'>
        <Form.Group controlId='firstName' className='mb-4'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            name='firstName'
            value={user.firstName}
            placeholder='Enter First Name'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='lastName' className='mb-4'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            name='lastName'
            value={user.lastName}
            placeholder='Enter Last Name'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='lastName' className='mb-4'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='text'
            name='phoneNumber'
            value={user.phoneNumber}
            placeholder='Enter Phone Number'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>{' '}
        <Form.Group controlId='email' className='mb-4'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            value={user.email}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='mb-4'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Enter password'
            value={user.password}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' onClick={handleRegister}>
          Register
        </Button>
      </Form>

      <Row className='m-3'>
        <Col>
          Have an Account? <Link to='/login'>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
