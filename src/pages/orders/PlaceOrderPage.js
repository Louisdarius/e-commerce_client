import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Axios from 'axios';
import env from 'react-dotenv';

const PlaceOrderPage = () => {
  const goTo = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    goTo('/login');
  }
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
  const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'));
  const totalPrice = JSON.parse(localStorage.getItem('totalPrice'));

  const handlePlaceOrder = async () => {
    const url = `${env.API_URL}/user/placeOrder`;
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = { authorisation: `Bearer ${token}` };

    if (user.coins < totalPrice) {
      window.alert(
        'You do not have enough coins please top up before proceeding'
      );
      goTo('/topUp');
    } else {
      await Axios.post(
        url,
        { shippingAddress, paymentMethod, totalPrice },
        { headers: headers }
      )
        .then((res) => {
          localStorage.removeItem('user');
          localStorage.removeItem('shippingAddress');
          localStorage.removeItem('paymentMethod');
          localStorage.removeItem('totalPrice');
          localStorage.setItem('user', JSON.stringify(res.data));
          goTo(0);
          goTo('/profile');
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address}, {shippingAddress.city}{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {user.cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ListGroup variant='flush'>
                  {user.cart.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x £{item.product.price} = £
                          {item.qty * item.product.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
                <p>Available coins: {user.coins}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>£{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>£0.00</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>£0.00</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>£{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={user.cart.length === 0}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>{' '}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
