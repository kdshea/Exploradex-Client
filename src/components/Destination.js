import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Destination = () => {
  // const navigate = useNavigate() // function to move across pages.


  // ! id
  const { destinationId } = useParams()

  const [ destination, setDestination ] = useState(null) 
  const [ errors, setErrors ] = useState(false)

  // ! useEffect for the single Destination 
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${destinationId}`)
        setDestination(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [destinationId])

  
  return (
    <div>
    <h1>Destination</h1>

    <h2>Hello welcome to:</h2>

    <h1>User Profile</h1>

    <h2>Countries</h2>
    <h2>Description</h2>

    <h2>Activies: </h2>
    </div>
  )


}


export default Destination