import React, { useEffect } from 'react';
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Alert,
  Container,
} from 'react-bootstrap';
import Axios from 'axios';

const CartPage = () => {
  const goTo = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    goTo('/login');
  }

  const totalPrice = user.cart
    .reduce((acc, item) => acc + item.qty * item.product.price, 0)
    .toFixed(2);

  const removeItem = async (index) => {
    console.log(index);
    const url = `${env.API_URL}/user/removeFromCart`;
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = { authorisation: `Bearer ${token}` };

    await Axios.post(url, { index }, { headers: headers })
      .then((res) => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(res.data));
        goTo(0);
      })
      .catch((e) => {
        console.log(e);
        window.alert(e);
      });
  };
  const handlePayment = () => {
    localStorage.setItem('totalPrice', totalPrice);
    goTo('/shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <Container>
          <h1>Shopping Cart</h1>
        </Container>
        {user.cart.length === 0 ? (
          <Alert variant='light'>
            <p>Your Cart is empty</p>
          </Alert>
        ) : (
          <ListGroup variant='flush' className='m-3'>
            {user.cart.map((item, index) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.product}`}
                      style={{ textDecoration: 'none' }}
                    >
                      {item.product.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.product.price}</Col>
                  <Col md={2}>
                    <Form.Control as='select' value={item.qty} disabled>
                      {[...Array(item.product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeItem(index)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({user.cart.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              £{totalPrice}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={user.cart.length === 0}
                onClick={handlePayment}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
