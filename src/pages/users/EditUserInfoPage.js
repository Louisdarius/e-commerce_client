import React, { useState, useEffect } from 'react';
import FormContainer from '../../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { EditUserInfo } from '../../actions/UserActions';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import env from 'react-dotenv';

const EditUserInfoPage = () => {
  const goTo = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  if (!user) {
    goTo('/login');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const url = `${env.API_URL}/user/updateUser`;
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = { authorisation: `Bearer ${token}` };

    await Axios.patch(url, user, { headers })
      .then((res) => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(res.data));
        goTo(0);
        goTo('/profile');
      })
      .catch((e) => {
        console.log(e);
        window.alert(e);
      });
  };
  const handleCancel = () => goTo('/profile');

  return (
    <FormContainer>
      <Form className='m-4'>
        <Form.Group controlId='firstName' className='mb-4'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            name='firstName'
            value={user.firstName}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='lastName' className='mb-4'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            name='lastName'
            value={user.lastName}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='lastName' className='mb-4'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='text'
            name='phoneNumber'
            value={user.phoneNumber}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>{' '}
        <Form.Group controlId='email' className='mb-4'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={user.email}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='mb-4'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={user.password}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Button
          type='submit'
          variant='warning'
          size='sm'
          onClick={handleCancel}
          className='m-2'
        >
          Cancel
        </Button>
        <Button
          type='submit'
          variant='primary'
          size='sm'
          onClick={handleSave}
          className='m-2'
        >
          Save
        </Button>
      </Form>
    </FormContainer>
  );
};

export default EditUserInfoPage;
