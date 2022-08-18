import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <div>
      
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Travel Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/' >Home</Nav.Link>
            <Nav.Link as={Link} to='/Login' >Login</Nav.Link>
            <Nav.Link as={Link} to='/Register' >Register</Nav.Link>
            <Nav.Link as={Link} to='/Landing' >Landing</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
      <br />
    
     
    </div>
  );
}

export default NavBar;