import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import env from 'react-dotenv';
import Axios from 'axios';
// import { addToCart } from '../../actions/CartActions';
const ProductPage = () => {
  const goTo = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);

  const addToCart = async () => {
    const url = `${env.API_URL}/user/addToCart`;
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = { authorisation: `Bearer ${token}` };

    await Axios.post(url, { id, qty }, { headers: headers })
      .then((res) => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(res.data));
        console.log(res.data);
        goTo(0);
        goTo('/cart');
      })
      .catch((e) => {
        console.log(e);
        window.alert(e);
      });
  };

  const fetchProduct = async () => {
    await Axios.get(`${env.API_URL}/product/getAProduct/${id}`)
      .then((res) => setProduct(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => fetchProduct(), []);

  return (
    <>
      <Container>
        <Link className='btn btn-light my-3' to='/'>
          <i class='fa-solid fa-arrow-left'></i> Go back
        </Link>
        <h1>Product page</h1>
      </Container>

      <Row className='my-3 p-3'>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              {' '}
              <strong>Price: £</strong>
              {product.price}
            </ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>£{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToCart}
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
