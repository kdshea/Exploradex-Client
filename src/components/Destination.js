import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../config.js'

import Container  from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

// import Serhan from '../img/4db349_218f4014bcd97b058e8f89469dc0e5d7.webp'

const Destination = () => {
  // const navigate = useNavigate() // function to move across pages.


  // ! id
  const { travelId } = useParams()
  console.log(travelId)

  const [ destination, setDestination ] = useState(null) 
  const [ errors, setErrors ] = useState(false)

  // ! useEffect for the single Destination 
  // ! Execution now loads individual page of the destination 
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/travel/${travelId}`)
        console.log(travelId);
        setDestination(data)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [travelId])

  
  // ! add reviews to the page 
  const addReview = async () => {
    try {
      await axios.post(`${API_URL}/travel/${travelId}`, {
        headers: {
          Authorization: `Bearer ` //post needs to authenticate the bearer
        },
      } )
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <Container as="main">
    <Row>
      { destination ? 
        // If bread is truthy, then our API call was successful as data has been added to the bread state
        <>
        <h1>{destination.name}</h1>
          <Col md="6">
            <img className='w-100' src={destination.imgUrl[0]} alt={destination.name} />
          </Col>
          <Col md="6">
            {/* Description */}
            <h2><span>🍽</span> Description</h2>
            <p>{destination.description}</p>
            <hr />
            {/* Origin */}
            <h2><span>🌍</span> Origin</h2>
            <p>{destination.country}</p>
            <hr />
            {/* Added by */}
            <h2><span>👤</span>{destination.userName}</h2>
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


export default Destination