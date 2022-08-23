
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

const Home = () => {


  const buttons = [
    {
      label: "Go to dashboard",
      path: "/",
    },
    {
      label: "Go to Login",
      path: "/login",
    },
  ];

  return (
    <>
      <main className="hero text-center">
      <div className="hero-container">
          <h1 className='display-3'>Welcome to our Travel Library</h1>
          <p className='lead'>To add a destination please Register below</p>
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