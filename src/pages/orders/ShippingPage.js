import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const ShippingPage = () => {
  const goTo = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => !user && goTo('/login'));

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    goTo('/paymentMethodPage');
  };
  return (
    <FormContainer>
      {/* <CheckoutSteps step1 step2 /> */}
      <h1>Shipping</h1>
      <Form className='m-4' onSubmit={handleSubmit}>
        <Form.Group controlId='address' className='mb-4'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            name='address'
            placeholder='Enter address'
            value={shippingAddress.address}
            required
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city' className='mb-4'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            name='city'
            placeholder='Enter city'
            value={shippingAddress.city}
            required
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode' className='mb-4'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            name='postalCode'
            placeholder='Enter postal code'
            value={shippingAddress.postalCode}
            required
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country' className='mb-4'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            name='country'
            placeholder='Enter country'
            value={shippingAddress.country}
            required
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
