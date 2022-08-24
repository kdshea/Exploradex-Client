import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { userIsAuthenticated, getId } from '../helpers/auth'


const NavBar = () => {
  const navigate = useNavigate()

  console.log(getId)
  getId()

  const handleLogout = () => {
    window.localStorage.removeItem('local-user-Token')
    navigate('/login')
  }


  return (
    <Navbar expand="sm">
    <Container as="section">
      <Navbar.Brand as={Link} to="/">HOME</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
        <Nav.Link as={Link} to='/' >Home</Nav.Link>        
        <Nav.Link as={Link} to='/travel' >All Destinations</Nav.Link>
        { userIsAuthenticated()
          ?
          <>
            <Nav.Link as={Link} to='/users/:userId' >User Profile</Nav.Link>
            <Nav.Link as={Link} to='/travel/new' >Add Destination</Nav.Link>
            <span onClick={handleLogout}>Logout</span>
          </>
          :
          <>
            <Nav.Link as={Link} to='/register'>Register</Nav.Link>
            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
          </>
        }
      </Navbar.Collapse>
    </Container>
  </Navbar>
      
  );
}

export default NavBar;