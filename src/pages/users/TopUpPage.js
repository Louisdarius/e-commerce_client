import React, { useState } from 'react';
import FormContainer from '../../components/FormContainer';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import env from 'react-dotenv';
import Axios from 'axios';

const TopUpPage = () => {
  const goTo = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    goTo('/login');
  }
  const [amount, setAmount] = useState(0);

  const handleTopUp = async (e) => {
    e.preventDefault();
    const url = `${env.API_URL}/user/topUp`;
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = { authorisation: `Bearer ${token}` };

    await Axios.post(url, { amount }, { headers: headers })
      .then((res) => {
        console.log(res.data);
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

  return (
    <FormContainer>
      <Form className='m-4'>
        <Form.Group>
          <Form.Label as='legend' className='mb-4'>
            Select an amount to top up
          </Form.Label>
          <Col>
            <Form.Check
              className='mb-3'
              type='radio'
              label='200'
              id='200'
              name='paymentMethod'
              value='200'
              onChange={(e) => setAmount(e.target.value)}
            ></Form.Check>
            <Form.Check
              className='mb-3'
              type='radio'
              label='500'
              id='500'
              name='paymentMethod'
              value='500'
              onChange={(e) => setAmount(e.target.value)}
            ></Form.Check>
            <Form.Check
              className='mb-3'
              type='radio'
              label='1000'
              id='1000'
              name='paymentMethod'
              value='1000'
              onChange={(e) => setAmount(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button
          type='submit'
          variant='primary'
          onClick={handleTopUp}
          disabled={amount == 0}
        >
          Top Up
        </Button>
      </Form>
    </FormContainer>
  );
};

export default TopUpPage;
