import React, { useState } from 'react';
import FormContainer from '../../components/FormContainer';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const goTo = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    goTo('/login');
  }
  const [paymentMethod, setPaymentMethod] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod !== '') {
      localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
      goTo('/placeOrder');
    }
  };
  return (
    <FormContainer>
      {/* <CheckoutSteps step1 step2 step3 /> */}
      <h1 className='m-4'>Payment Method</h1>
      <Form className='m-4'>
        <Form.Group>
          <Form.Label as='legend' className='mb-4'>
            Select Method
          </Form.Label>
          <Col>
            <Form.Check
              className='mb-2'
              type='radio'
              label='Crypto Currency'
              id='cryptoCurrency'
              name='paymentMethod'
              value='CryptoCurrency'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              className='mb-3'
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' onClick={handleSubmit}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
