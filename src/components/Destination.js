import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../config.js'

import Container  from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { getToken } from "../helpers/auth.js"


const Destination = () => {

  const { destinationId, reviewId } = useParams()
 

  const [ destination, setDestination ] = useState(null) 

  const [ review, setReviews ] = useState([])
  
  const [ errors, setErrors ] = useState(false)

  // ! useEffect for the single Destination 
  // ! Execution now loads individual page of the destination 
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/travel/${destinationId}`)
        // console.log(destinationId);
        setDestination(data)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [destinationId])

  // ! add reviews to the page 

  const submitReview = async (event) => {
    try {
      const { data } = await axios.post(`${API_URL}/travel/${destinationId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}` //post needs to authenticate the bearer
        },
      } )
      setReviews(data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Container as="main">
    <Row>
      { destination ? 
        <>
        <h1>{destination.name}</h1>
          <Col md="6">
            <img className='w-100' src={destination.imgUrl[0]} alt={destination.name} />
          </Col>
          <Col md="6">
            <h2><span>🍽</span> Description</h2>
            <p>{destination.description}</p>
            <hr />
            <h2><span>🌍</span> Origin</h2>
            <p>{destination.country}</p>
            <hr />
            <h2><span>👤</span>{destination.userName}</h2>
            <hr />

            {/* <p>{destination.reviews[0].reviewText}</p> */}

          
            <Link to="/travel" className='btn dark'>Back to all Destination</Link>
          </Col>
        </>
        :

        <h2 className="text-center">
          {/* { errors ? 'Something went wrong. Please try again later' : <Spinner />} */}
        </h2>
      }
    </Row>

    <button>Add a review</button>



  </Container>

  )
}


export default Destination