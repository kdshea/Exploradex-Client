
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { userIsAuthenticated, getId } from '../helpers/auth'


const NavBar = () => {
  const navigate = useNavigate()
  const userId = getId()
  const handleLogOut = () => {
    window.localStorage.removeItem('local-user-Token')
    window.localStorage.removeItem('local-user-Id')
    navigate('/')
  }

  return (
    <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Navbar.Brand as={Link} to="/">🌍</Navbar.Brand>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/' >Home</Nav.Link> 
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/travel' >All Destinations</Nav.Link>
      </Nav.Item>
      { userIsAuthenticated()
        ?
        <>
          <Nav.Item>
            <Nav.Link as={Link} to={`/users/${userId}`} >User Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/travel/new' >Add Destination</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <span onClick={handleLogOut}>Logout</span>
          </Nav.Item>
        </>
        :
        <>
          <Nav.Item>
            <Nav.Link as={Link} to='/register'>Register</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
          </Nav.Item>
        </>      
      }      
    </Nav>
  );
}
  
  
export default NavBar;