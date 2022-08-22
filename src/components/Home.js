
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
    <div className="view">
      <h1>Landing Page</h1>
      {buttons.map((button, index) => (
        <Link key={index} to={button.path}>
          <button>{button.label}</button>
        </Link>
      ))}
    </div>
  )



  }

  


export default Home