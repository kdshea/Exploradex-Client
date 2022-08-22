import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <Navbar expand="sm">
      <Container as="section">
        <Navbar.Brand as={Link} to="/">Test</Navbar.Brand>        
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Nav.Link as={Link} to='/Login' >Login</Nav.Link>
            <Nav.Link as={Link} to='/Register' >Register</Nav.Link>
            <Nav.Link as={Link} to='/Landing' >Landing</Nav.Link>
            <Nav.Link as={Link} to='/UserProfile' >UserProfile</Nav.Link>
            <Nav.Link as={Link} to='/Destination' >Destination</Nav.Link>
            <Nav.Link as={Link} to='/AllDestination' >AllDestination</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;