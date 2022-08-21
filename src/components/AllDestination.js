import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Serhan from '../img/4db349_218f4014bcd97b058e8f89469dc0e5d7.webp'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';
import API_URL from '../config.js'


const AllDestination = () => {

const [ destinationData, setDestinationData ] = useState([])
const [ errors, setErrors ] = useState(false)

useEffect(() => {
  // ! need to see if this works now!
  const getData = async () => {
    try {
      // const { data } = await axios.get('https://sei65-destinations.herokuapp.com/travel')
      const { data } = await axios.get(`${API_URL}/travel`)
      console.log(data)
      setDestinationData(data)
    } catch (error) {
      console.log(error)
    }
  } 
  getData()
}, [])

// ! onClick => functionality so that it will go to the component. 

// const onClick = (event) => {



// }


  return (
    // ! might be better to do this in Cards but I will leave this to you Chris.
    
    <Container as="main" className='destination-index'>
    <h1 className='text-center mb-4'>destination</h1>
    <Row className='destination-row'>
      { destinationData.map(item => {
          console.log(item)
          return (
            <Col key={item._id} md="5" lg="4" className='mb-4'>
                <Card>
                  <Card.Img variant='top' src={Serhan}></Card.Img>
                  <Card.Body className='bg-light'>
                    <Card.Title className='text-center mb-0'>{item.name} - {item.country}</Card.Title>
                  </Card.Body>
                </Card>
             
            </Col>
          )
        })
      }
    </Row>
  </Container>
  )
}


export default AllDestination