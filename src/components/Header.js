import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown,Row, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { SignUserOut } from '../actions/UserActions';
import { retrieveUser } from '../actions/LocalStorageActions';
import env from 'react-dotenv';
import Axios from 'axios';

const Header = () => {
  const coins = 5
  const goTo = useNavigate();
  // const user = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState({});

  const handleLogOut = async () => {
    // SignUserOut();
    const url = `${env.API_URL}/user/logout`;
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = { authorisation: `Bearer ${token}` };
    await Axios.post(url, {}, { headers: headers })
      .then((res) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        console.log(res.data);
        goTo(0);
        goTo('/');
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => setUser(JSON.parse(localStorage.getItem('user'))), []);
  return (
    <Navbar
      bg='dark'
      variant='dark'
      expand='lg'
      collapseOnSelect
      className='mb-5'
    >
      {' '}
      <Container>
        <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>
          <Navbar.Brand>Crypto Exchange</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='justify-content-end'>
            <Nav.Item>
              <Nav.Link>
                {' '}
                <Link
                  to='/cart'
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                     <i className='fas fa-shopping-cart'></i> Cart 
                </Link>
              </Nav.Link>
            </Nav.Item>

            {user ? (
              <NavDropdown
                title={`${user.firstName} ${user.lastName} `} 
          
              >
                <NavDropdown.Item>
                  {' '}
                  <Link
                    to='/profile'
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                   Profile{' '} 
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleLogOut}
                  style={{ color: 'white' }}
                >
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Item>
                <Nav.Link>
                  {' '}
                  <Link
                    to='/login'
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    <i className='fas fa-user'></i> Login
                  </Link>
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
