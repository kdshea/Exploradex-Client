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
    <div className='destination-page'>
      <Container className="destination-container" as="main">
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
                <Link to="/travel" className='btn dark'>Back to all Destination</Link>
              </Col>
            </>
            :
            
            <h2 className="text-center">          
            </h2>
          }
        </Row>
      </Container>

    </div>

  )


}


export default Destination