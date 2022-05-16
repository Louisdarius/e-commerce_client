import React, { useEffect, useState } from 'react';
import Product from '../../components/Product';
import { Row, Col, Container } from 'react-bootstrap';
import Axios from 'axios';
import env from 'react-dotenv';
// import { getAllProducts } from '../../actions/ProductActions';

const ProductsListPage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    await Axios.get(`${env.API_URL}/product/getAllProducts`)
      .then((res) => setProducts(res.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => getProducts(), []);

  // const products = [
  //   {
  //     _id: '362846',
  //     image:
  //       'https://asset1.ee.co.uk/medias/iphone-12-5g-64gb-purple-desktop-detail-2-Format-976?context=bWFzdGVyfHJvb3R8MzcyODkxfGltYWdlL3BuZ3xzeXMtbWFzdGVyL3Jvb3QvaDRmL2g5ZC85NjQ2MDQ1MTM0ODc4L2lwaG9uZS0xMi01Zy02NGdiLXB1cnBsZS1kZXNrdG9wLWRldGFpbC0yX0Zvcm1hdC05NzZ8MjFiMjI2ZDMzMzNlZjQ3ODBjZmY2NjI5NzU4MDc3YmFmMGM5MzE0NWRjNmU0NTc1MzA5OTg2NGU2NTBmYjA1YQ',
  //     name: 'Iphone',
  //     brand: 'Apple',
  //     category: 'Technology',
  //     description: 'Iphone 13 is the best iphone in the market',
  //     price: 1200,
  //     countInStock: 34,
  //   },

  //   {
  //     _id: '492750',
  //     image: 'https://miro.medium.com/max/1400/1*x3PryP3omK_6tiZ7wI4cgw.png',
  //     name: 'MacBook Pro',
  //     brand: 'Apple',
  //     category: 'Technology',
  //     description: 'MacBook Pro has the latest feature',
  //     price: 3700,
  //     countInStock: 12,
  //   },

  //   {
  //     _id: '962759',
  //     image:
  //       'https://media.4rgos.it/s/Argos/8175061_R_SET?$Main768$&w=620&h=620',
  //     name: 'American fridge-freezer',
  //     brand: 'Samsung',
  //     category: 'Appliance',
  //     description: 'This fridge is huge',
  //     price: 2500,
  //     countInStock: 5,
  //   },

  //   {
  //     _id: '376072',
  //     image:
  //       'https://images.squarespace-cdn.com/content/v1/5008676d84aeae82b8acdd8c/1518534847762-4B8NY160ES4E1JYA34S8/homepodwhite-800x709.jpg',
  //     name: 'MacSparky',
  //     brand: 'Apple',
  //     category: 'Technology',
  //     description: 'The newest smart speaker on the market',
  //     price: 300,
  //     countInStock: 56,
  //   },

  //   {
  //     _id: '8564953498459065',
  //     image:
  //       'https://asset1.ee.co.uk/medias/iphone-12-5g-64gb-purple-desktop-detail-2-Format-976?context=bWFzdGVyfHJvb3R8MzcyODkxfGltYWdlL3BuZ3xzeXMtbWFzdGVyL3Jvb3QvaDRmL2g5ZC85NjQ2MDQ1MTM0ODc4L2lwaG9uZS0xMi01Zy02NGdiLXB1cnBsZS1kZXNrdG9wLWRldGFpbC0yX0Zvcm1hdC05NzZ8MjFiMjI2ZDMzMzNlZjQ3ODBjZmY2NjI5NzU4MDc3YmFmMGM5MzE0NWRjNmU0NTc1MzA5OTg2NGU2NTBmYjA1YQ',
  //     name: 'Iphone',
  //     brand: '',
  //     category: 'Technology',
  //     description: 'Iphone 13 is the best iphone in the market',
  //     price: 1200,
  //     countInStock: 34,
  //   },
  // ];
  return (
    <Row className='my-3 p-3'>
      {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductsListPage;

{
  /* <Container>
  <Row>
    <Col>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Col>
  </Row>
</Container>; */
}
