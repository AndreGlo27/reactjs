import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Header() {
    let history = useHistory();
  return (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand as={Link} to='/'>Unilapp</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link as={Link} to='/'>Home</Nav.Link>
    <Nav.Link as={Link} to='/Profile'>Profile</Nav.Link>
    <Nav.Link as={Link} to='/Universities'>Search</Nav.Link>
    </Nav>
    <Form inline >
    <Button variant="outline-info" 
    onClick={() => {
        localStorage.clear();
        history.push("/login");
      }}>Logout</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
  );
}

export default Header;
