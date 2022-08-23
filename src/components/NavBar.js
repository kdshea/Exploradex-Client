import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <Navbar className="test" expand="sm">
        <Container as="section">
          <Navbar.Brand as={Link} to="/">Travel Logo</Navbar.Brand>        
          <Nav className="justify-content-end">
              
              <Nav.Link as={Link} to='/Login' >Login</Nav.Link>
              <Nav.Link as={Link} to='/Register' >Register</Nav.Link>
              <Nav.Link as={Link} to='/Landing' >Landing</Nav.Link>
              <Nav.Link as={Link} to='/UserProfile' >UserProfile</Nav.Link>
              <Nav.Link as={Link} to='/travel/:travelId' >Destination</Nav.Link>
              <Nav.Link as={Link} to='/travel' >AllDestination</Nav.Link>
              <Nav.Link as={Link} to='/images' >ImageTest</Nav.Link>
              
            </Nav>
          
          </Container>
        </Navbar>
      
    
  );
}

export default NavBar;