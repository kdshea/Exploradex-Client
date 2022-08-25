
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../config.js'
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import Spinner from './Spinner.js'
import Card  from "react-bootstrap/Card"
import { getToken } from "../helpers/auth.js"
import Button  from "react-bootstrap/Button"
import Carousel  from "react-bootstrap/Carousel";


const Destination = () => {
  const navigate = useNavigate()
  const { destinationId } = useParams()
  const [ destination, setDestination ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const [ reviewsRemoved, setReviewsRemoved ] = useState(0)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/travel/${destinationId}`)
        setDestination(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getData()
  }, [destinationId, reviewsRemoved])

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

  const CarouselImages = () => {
  
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={destination.imgUrl[0]}
            alt={destination.name}
          />        
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={destination.imgUrl[1]}
            alt={destination.name}
          />        
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={destination.imgUrl[2]}
            alt={destination.name}
          />        
        </Carousel.Item>
      </Carousel>
    );
  }


  
  return (
    <div className='destination-page'>
      <Container as="main">
        { destination ? 
          
          <div className="kitchen-sink">
            <h1>{destination.name}</h1>
            <Card border="dark" className="destination-card bg-transparent">
              <CarouselImages />
              <Card.Body className="bg-transparent">
                <Card.Title>{destination.name} - {destination.country}</Card.Title>
                <Card.Text>
                  {destination.description}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush ">
                <ListGroup.Item>Country: {destination.country}</ListGroup.Item>
                <ListGroup.Item>Rating: {destination.rating}</ListGroup.Item>
                <ListGroup.Item>Activites: {destination.activities}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
       
              <Container as='section' className='review-card'>
                  <h3>reviews</h3>
                  { destination.reviews.length > 0
                    ?
                    destination.reviews.map(review => {
                      console.log(destination)
                      const { reviewId, reviewText, rating, displayName, reviewImgUrl, activities } = review
                      return (                       
                        <Card key={reviewId} className="re-card">
                            <Card.Img variant='top' src={reviewImgUrl[0] ? reviewImgUrl[0] : 'https://sei65-destinations.s3.eu-west-1.amazonaws.com/users/default-image.jpg' }></Card.Img>
                            <Card.Body>
                          <Card.Title className='text-center mb-0'>{/*{reviewText}*/}</Card.Title>        
                              <Card.Text>
                                {reviewText}
                              </Card.Text>  
                                <ListGroup className="list-group-flush">
                                  <ListGroup.Item><span>👤</span> {displayName}</ListGroup.Item>
                                  <ListGroup.Item>Rating: {rating}</ListGroup.Item>
                                  <ListGroup.Item>Activites: {activities.join(', ')}</ListGroup.Item>
                                </ListGroup>                    
                              <div className="buttons mb-4">
                                <Button variant="danger" onClick={event => deleteReview(event, destinationId, reviewId)}>Delete Review</Button>
                                <Link to={`/edit-review/${destinationId}/${reviewId}`} className='btn btn-primary'>Edit Review</Link>
                              </div>                          
                            </Card.Body>
                          </Card>          
                        )
                    })
                    :
                    <>
                      { errors ? <h2>Something went wrong. Please try again later</h2> : <p>Add your first review</p>}
                    </>
                  }
              </Container>            
              <Link to="/travel" className='btn dark'>Back to all Destination</Link>
          </div>
          :
          <h2 className="text-center">
            { errors ? 'Something went wrong. Please try again later' : <Spinner />}
          </h2>
        }
    
      <Link to={`/review/${destinationId}`}>
      <button>Add a review</button>
      </Link>
      
      </Container>
    </div>

  )
}


export default Destination