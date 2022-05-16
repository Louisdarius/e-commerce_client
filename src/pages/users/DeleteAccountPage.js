import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import env from 'react-dotenv';
import Axios from 'axios';

const DeleteAccountPage = () => {
  const goTo = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    goTo('/login');
  }

  const handleCancel = () => goTo('/profile');

  const handleDelete = async (e) => {
    e.preventDefault();
    const url = `${env.API_URL}/user/deleteUser`;
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = { authorisation: `Bearer ${token}` };
    await Axios.delete(url, { headers: headers }, {})
      .then((res) => {
        localStorage.clear();
        goTo(0);
        goTo('/');
        window.alert('Your account has been been successfully deleted');
      })
      .catch((e) => {
        console.log(e);
        window.alert(e);
      });
  };

  return (
    <FormContainer>
      <h4>Sorry to see you go {user.firstName} </h4>

      <Form className='m-4'>
        <Form.Select aria-label='Default select example' className='mb-4'>
          <option>Where did you hear about us?</option>
          <option value='1'>Adverts</option>
          <option value='2'>Friends</option>
          <option value='3'>Newspaper</option>
          <option value='3'>Others</option>
        </Form.Select>

        <Form.Select aria-label='Default select example' className='mb-4'>
          <option>Reason for leaving</option>
          <option value='1'>Found a better site</option>
          <option value='2'>Had a bad experience</option>
          <option value='3'>Others</option>
        </Form.Select>
        <Form.Select aria-label='Default select example' className='mb-4'>
          <option>Would you recommend us?</option>
          <option value='1'>YES</option>
          <option value='2'>NO</option>
        </Form.Select>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>
            Tell us in a few words about your experience with us
          </Form.Label>
          <Form.Control as='textarea' rows={3} />
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
          onClick={handleDelete}
          className='m-2'
        >
          Delete
        </Button>
      </Form>
    </FormContainer>
  );
};

export default DeleteAccountPage;
