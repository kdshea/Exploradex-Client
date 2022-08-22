// import  Card  from "react-bootstrap/Card"
// import  Container  from "react-bootstrap/Container"

import axios from 'axios'
import { useEffect, useState } from 'react'
import Serhan from '../img/4db349_218f4014bcd97b058e8f89469dc0e5d7.webp'
import API_URL from '../config.js'
import { useParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import Row  from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'





const UserProfile = () => {
  
  const { userId } = useParams()

  const [ userProfile, setUserProfile ] = useState({
    email: '',
    userName: '',
    role: '',
    createdAt: '',
    reviews: '',
    id: '', // not sure id is needed
// ! this will call all the information from the data user I hope 
  })



  // ! need to fetch the data of the user profile.
  useEffect(() => {
    const getUser = async () => {
      try {
        // ? need to check the method of the user. 
        const { data } = await axios.get(`${API_URL}/UserProfile/${userId}`)
        setUserProfile(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [userId])




  return (
<Container>
    <Row>
      { userProfile ? 
        // If bread is truthy, then our API call was successful as data has been added to the bread state
        <>
          <h1>{userProfile.name}</h1>
          <Col md="6">
            <img className='w-100' src={Serhan} alt={userProfile.name} />
          </Col>
          <Col md="6">
            {/* Description */}
            <h2><span>🍽</span> Description</h2>
            <p>{userProfile.userName} - {userProfile.email}</p>
            <hr />
            {/* Origin */}
            <h2><span>🌍</span> Origin</h2>
            <p>{userProfile.country}</p>
            <hr />
            {/* Added by */}
            <h2><span>👤</span> Added by</h2>
            {/* <p>{bread.addedBy.username}</p> */}
            <hr />
            {/* Edit / Delete buttons */}
            {/* { userIsOwner(destination) &&
              <div className="buttons mb-4">
                <Button variant="danger" onClick={deleteBread}>Delete bread</Button>
                <Link to={`/bread/${bread._id}/edit`} className='btn btn-primary'>Edit bread</Link>
              </div>
            } */}
            {/* Link back to all breads */}
            <Link to="/travel" className='btn dark'>Back to all Destination</Link>
          </Col>
        </>
        :
        // If bread is falsey, we are either still waiting for a response or there's been an error
        // TO check whether there has been an error, we check the truthy value of errors state
        <h2 className="text-center">
          {/* { errors ? 'Something went wrong. Please try again later' : <Spinner />} */}
        </h2>
      }
    </Row>
  </Container>
  )
}

export default UserProfile