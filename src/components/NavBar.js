import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';



// ! import helpers 
import { userIsAuthenticated } from '../helpers/auth'



const NavBar = () => {
  
  const navigate = useNavigate()


  // ! logout from the project
  const handleLogout = () => {
    window.localStorage.removeItem('local-user-Token')
    navigate('/login')
  }

  return (
    // <Navbar className='nav-bar' expand="sm">
    //   <Container as="section">

    //     <Navbar.Brand as={Link} to="/">Test</Navbar.Brand>    
            
    //     <Nav className="me-auto">

    //         <Nav.Link as={Link} to='/' >Home</Nav.Link>
    //         <Nav.Link as={Link} to='/Login' >Login</Nav.Link>
    //         <Nav.Link as={Link} to='/Register' >Register</Nav.Link>
    //         <Nav.Link as={Link} to='/Landing' >Landing</Nav.Link>
    //         <Nav.Link as={Link} to='/UserProfile/:userId' >UserProfile</Nav.Link>
    //         <Nav.Link as={Link} to='/travel/:travelId' >Destination</Nav.Link>
    //         <Nav.Link as={Link} to='/travel' >AllDestination</Nav.Link>
            
    //       </Nav>
        
    //     </Container>
    //   </Navbar>
    <Navbar expand="sm">
    <Container as="section">
      {/* Navbar brand */}
      {/* Wherever you use a href on a bootstrap component, replace it with an as={Link} and a to="/pathname" */}
      <Navbar.Brand as={Link} to="/">HOME</Navbar.Brand>
      {/* Navbar Toggle is our mobile burger icon - this is displayed at a breakpoint specified on the Navbar component above */}
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      {/* Navbar collapse is our menu wrapped in a collapsible container for mobile */}
      <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
        {/* Nav Link is an individual link inside a nav. Same as Nav Brand, to use Link add as={Link} and to="/pathname" */}
        <Nav.Link as={Link} to='/' >Home</Nav.Link>
         {/* <Nav.Link as={Link} to='/Login' >Login</Nav.Link> */}
         {/* <Nav.Link as={Link} to='/Register' >Register</Nav.Link> */}
        <Nav.Link as={Link} to='/Landing' >Landing</Nav.Link>
         {/* <Nav.Link as={Link} to='/UserProfile/:userId' >UserProfile</Nav.Link> */}
        {/* <Nav.Link as={Link} to='/travel/:travelId' >Destination</Nav.Link> */}
        <Nav.Link as={Link} to='/travel' >AllDestination</Nav.Link>
        { userIsAuthenticated()
          ?
          <>
            
            <Nav.Link as={Link} to='/UserProfile/:userId' >UserProfile</Nav.Link>
            <Nav.Link as={Link} to='/travel/new' >Add Destination</Nav.Link>
            {/* what will be the key import for adding a destination? input form? */}


            
            <span onClick={handleLogout}>Logout</span>
          </>
          :
          <>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </>
        }
      </Navbar.Collapse>
    </Container>
  </Navbar>
      
    
  );
}

export default NavBar;