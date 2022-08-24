
import { Link } from "react-router-dom"
// import Container from "react-bootstrap/Container"

const Home = () => {


  const buttons = [
    {
      label: "Register",
      path: "/register",
    },
    {
      label: "Login",
      path: "/login",
    },
  ];

  return (
    <>
      <main className="hero text-center">
      <div className="hero-container">
          <h1 className='display-3'>Welcome to our Travel Library</h1>
          <Link to='/travel'>
              <button>Explore</button>
            </Link>
          <p className='lead'>To add destinations and reviews, please register below</p>
          {buttons.map((button, index) => (
            <Link key={index} to={button.path}>
              <button>{button.label}</button>
            </Link>
          ))}
          
        </div>
      </main>
    </>
    
  )



  }

  


export default Home