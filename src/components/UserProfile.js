import axios from 'axios'
import { useEffect, useState } from 'react'
import Serhan from '../img/4db349_218f4014bcd97b058e8f89469dc0e5d7.webp'
import API_URL from '../config.js'
import { useParams } from 'react-router-dom'
import { getToken } from '../helpers/auth.js'

import Container from 'react-bootstrap/Container'
import  Card  from "react-bootstrap/Card"
import { Link } from 'react-router-dom'
import Row  from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'
import Spinner from './Spinner.js'
// import Button from 'react-bootstrap/Button'

const UserProfile = () => {
  const { userId } = useParams()
  console.log('user id', userId)

  const [ errors, setErrors ] = useState(false)
  const [ userProfile, setUserProfile ] = useState({
    _id: '',
    email: '',
    userName: '',
    reviews: [],
  })

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log('data', data)
        setUserProfile(data)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
    }
    getUser()
  }, [userId])

  return (
<Container>
    <Row>
      { userProfile ? 
        <>
          <h1>Name: { userProfile.displayName? userProfile.displayName : userProfile.userName}</h1>
          <Col md="6">
            <img className='w-100' src={Serhan} alt={userProfile.userName} />
          </Col>
          <Col md="6">
            <h2>Profile</h2>
            <p><span>👤</span> {userProfile.userName}</p>
            <p><span>📧</span> {userProfile.email}</p>
            <hr />
            <h2>About Me</h2>
            <p>{userProfile.aboutMeText}</p>
            <hr />
            <h2>Reviews</h2>    
            <Container className='text-center'>
              <Row>
                { userProfile.reviews.length > 0
                  ?
                  userProfile.reviews.map(review => {
                    const { _id: reviewId, reviewText, destination: destinationId, rating } = review
                    console.log('review', review)
                    return (
                      <Col key={reviewId} md="6" lg="4" className='mb-4'>
                        <Link to={`/travel/${destinationId}`}>
                          <Card>
                            {/* <Card.Img variant='top' src={image}></Card.Img> */}
                            <Card.Body>
                              <Card.Title className='text-center mb-0'>Rating: {rating}</Card.Title>
                              <p>{reviewText}</p>
                              {/* Edit / Delete buttons - I will work on these next
                                <div className="buttons mb-4">
                                  <Button variant="danger" onClick={deleteReview}>Delete Review</Button>
                                  <Link to={`/bread/${bread._id}/edit`} className='btn btn-primary'>Edit Review</Link>
                                </div> */}
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    )
                  })
                  :
                  <>
                    { errors ? <h2>Something went wrong. Please try again later</h2> : <p>Add your first review</p>}
                  </>
                }
              </Row>
            </Container>
            <hr />
            {/* Edit / Delete buttons for user profile*/}
            {/* { userIsOwner(destination) &&
              <div className="buttons mb-4">
                <Button variant="danger" onClick={deleteBread}>Delete bread</Button>
                <Link to={`/bread/${bread._id}/edit`} className='btn btn-primary'>Edit Profile</Link>
              </div>
            } */}
            <Link to="/travel" className='btn dark'>Back to all Destination</Link>
          </Col>
        </>
        :
        <h2 className="text-center">
        { errors ? 'Something went wrong. Please try again later' : <Spinner />}
      </h2>
      }
    </Row>
  </Container>
  )
}

export default UserProfile