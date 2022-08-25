import axios from 'axios'
import { useEffect, useState } from 'react'
import API_URL from '../config.js'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getToken } from '../helpers/auth.js'
import Container from 'react-bootstrap/Container'
import  Card  from "react-bootstrap/Card"
import Row  from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'
import Spinner from './Spinner.js'
import Button from 'react-bootstrap/Button'

const UserProfile = () => {
  const navigate = useNavigate()
  const { userId } = useParams()
  const [ errors, setErrors ] = useState(false)
  const [ reviewsRemoved, setReviewsRemoved ] = useState(0)
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
        setUserProfile(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getUser()
  }, [userId, reviewsRemoved])

  const deleteReview = async (event, destinationId, reviewId) => {
    event.preventDefault()
    try {
      const { data } = await axios.delete(`${API_URL}/travel/${destinationId}/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      setReviewsRemoved(reviewsRemoved + 1)
    } catch (error) {
      setErrors(error.message)
      console.log(error.message)
    }
  }

  return (
<Container className='user-profilePage'>
    <Row>
      { userProfile ? 
        <>
          <h1>Name: { userProfile.displayName? userProfile.displayName : userProfile.userName}</h1>
          <Col md="6">
            <img className='w-100' src={userProfile.profileImg} alt={userProfile.userName} />
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
                    const { reviewId, reviewText, destinationId, destinationName, rating, reviewImgUrl, activities } = review
                    return (
                      <Col key={reviewId} md="6" lg="4" className='mb-4'>
                        <Card>
                          <Card.Img variant='top' src={reviewImgUrl[0] ? reviewImgUrl[0] : 'https://sei65-destinations.s3.eu-west-1.amazonaws.com/users/default-image.jpg' }></Card.Img>
                          <Card.Body>
                            <Link to={`/travel/${destinationId}`}>
                              <Card.Title className='text-center mb-0'>{destinationName}</Card.Title>
                            </Link>
                            <p>Rating: {rating}</p>
                            <p>Activities: {activities.join(', ')}</p>
                            <p>{reviewText}</p>
                            <div className="buttons mb-4">
                              <Button variant="danger" onClick={event => deleteReview(event, destinationId, reviewId)}>Delete Review</Button>
                              <Link to={`/edit-review/${destinationId}/${reviewId}`} className='btn btn-primary'>Edit Review</Link>
                            </div>   
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  })
                  :
                  <>
                    { errors ? <h2>Something went wrong. Please try again later</h2> : <p>No reviews yet</p>}
                  </>
                }
              </Row>
            </Container>
            <hr />
              <div className="buttons mb-4">
                {/* <Button variant="danger" onClick={deleteUser}>Delete User</Button> */}
                <Link to={`/edit-profile/${userId}`} className='btn btn-primary'>Edit Profile</Link>
              </div>
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