import axios from 'axios'
import { useEffect, useState } from 'react'
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
        setUserProfile(data)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
    }
    getUser()
  }, [userId])

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
                    const { _id: reviewId, reviewText, destination: destinationId, rating } = review
                    const activities = review.activities.join(', ')
                    return (
                      <Col key={reviewId} md="6" lg="4" className='mb-4'>
                        <Link to={`/travel/${review.destinationId}`}>
                          <Card>
                            <Card.Img variant='top' src={review.reviewImgUrl[0] ? review.reviewImgUrl[0] : 'https://sei65-destinations.s3.eu-west-1.amazonaws.com/users/default-image.jpg' }></Card.Img>
                            <Card.Body>
                              <Card.Title className='text-center mb-0'>{review.destinationName}</Card.Title>
                              <p>Rating: {rating}</p>
                              <p>Activities: {activities}</p>
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