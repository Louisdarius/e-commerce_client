import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';

const UserInfoPage = () => {
  const goTo = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    goTo('/login');
  }

  return (
    <FormContainer>
      <Form className='m-4'>
        <Form.Group controlId='firstName' className='mb-4'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            name='firstName'
            value={user.firstName}
            placeholder='Enter First Name'
            disabled
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='lastName' className='mb-4'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            name='lastName'
            value={user.lastName}
            placeholder='Enter Last Name'
            disabled
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='phoneNumber' className='mb-4'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='text'
            name='phoneNumber'
            value={user.phoneNumber}
            placeholder='Enter Phone Number'
            disabled
          ></Form.Control>
        </Form.Group>{' '}
        <Form.Group controlId='email' className='mb-4'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            disabled
            value={user.email}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='mb-4'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Enter password'
            disabled
            value='..............'
          ></Form.Control>
        </Form.Group>
        <Link to='/editUserInfo' className='mb-4'>
          Edit{' '}
        </Link>
      </Form>
    </FormContainer>
  );
};

export default UserInfoPage;
