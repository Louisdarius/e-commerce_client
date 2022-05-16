import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import env from 'react-dotenv';
import Axios from 'axios';
import {
  Row,
  Col,
  Table,
  Form,
  Button,
  Container,
  ListGroup,
  Badge,
  Alert,
} from 'react-bootstrap';

const ProfilePage = () => {
  const goTo = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    goTo('/login');
  }

  const token = JSON.parse(localStorage.getItem('token'));
  const headers = { authorisation: `Bearer ${token}` };

  const handleLogOut = async () => {
    const url = `${env.API_URL}/user/logout`;
    await Axios.post(url, {}, { headers: headers })
      .then((res) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        console.log(res.data);
        goTo(0);
        goTo('/');
      })
      .catch((e) => {
        console.log(e);
        window.alert(e);
      });
  };

  const confirmDelivered = async (index) => {
    const url = `${env.API_URL}/user/completeOrder`;
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

  return (
    <Container>
      <Row>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item disabled>
              {`${user.firstName} ${user.lastName}`}{' '}
              <Badge pill bg='info'>
                {user.coins} <i class='fa-solid fa-coins'></i>
              </Badge>
            </ListGroup.Item>

            <ListGroup.Item>
              {' '}
              <Link style={{ textDecoration: 'none' }} to='/userInfo'>
                View Details
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              {' '}
              <Link style={{ textDecoration: 'none' }} to='/topUp'>
                Top Up
              </Link>
            </ListGroup.Item>

            <ListGroup.Item>
              <Link style={{ textDecoration: 'none' }} to='/deleteAccount'>
                Delete Account
              </Link>{' '}
            </ListGroup.Item>

            <ListGroup.Item>
              {' '}
              <Button variant='warning' onClick={handleLogOut}>
                Log Out
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>TOTAL</th>
                <th>PAID AT</th>
                <th>DELIVERED</th>
                <th>VIEW ORDER</th>
              </tr>
            </thead>
            <tbody>
              {user.orders.length === 0 ? (
                <Alert variant='light'>
                  <p>You do not have any order yet</p>
                </Alert>
              ) : (
                user.orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{`£${order.totalPrice}`}</td>
                    <td>{order.paidAt.substring(0, 10)}</td>
                    <td>
                      {order.isDelivered ? (
                        <i class='fa-solid fa-circle-check fa-xl'></i>
                      ) : (
                        <Button
                          className='btn-sm'
                          variant='info'
                          onClick={() => {
                            confirmDelivered(index);
                          }}
                        >
                          Click to confirm
                        </Button>
                      )}
                    </td>

                    <td>
                      <Link style={{ textDecoration: 'none' }} to='/'>
                        <i class='fa-solid fa-eye fa-xl'></i>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
