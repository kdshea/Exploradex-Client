// import  Card  from "react-bootstrap/Card"
// import  Container  from "react-bootstrap/Container"
import Serhan from '../img/4db349_218f4014bcd97b058e8f89469dc0e5d7.webp'

const UserProfile = () => {
  return (
    <div>

      <img src={Serhan} alt='serhn' />


      <h1>Hello User Profile</h1>

     <h1>Name of User</h1>
     <h3>Mobile</h3>

     <h3>Work</h3>

     <h3>Email: </h3>

     <h3>About Me</h3>


     <h3>Counties I have visited: </h3>


     <div className="holiday-image">

      {/* probaly need to sort it out */}

      <img src="https://thumbs.dreamstime.com/b/beach-background-beautiful-beach-landscape-tropical-nature-scene-palm-trees-blue-sky-summer-holiday-vacation-concept-93725354.jpg" alt="nice" />



     </div>
     
    </div>


  )
}

export default UserProfile