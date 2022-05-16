import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Card
      style={{ width: '18rem', height: '400px' }}
      className='my-3 p-3 rounded'
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          variant='top'
          src={product.image}
          style={({ width: '600' }, { height: '400' })}
        />
      </Link>
      <Card.Body>
        <Link style={{ textDecoration: 'none' }} to={`/product/${product._id}`}>
          <Card.Title as='div'>
            {' '}
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h5'> {`£${product.price}`}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
