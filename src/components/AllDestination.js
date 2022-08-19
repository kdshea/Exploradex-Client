import axios from 'axios'
import { useEffect, useState } from 'react'

const AllDestination = () => {

const [ destinationData, setDestinationData ] = useState([])

useEffect(() => {
  // ! need to see if this works now!
  const getData = async () => {
    try {
      const { data } = await axios.get('')
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
    <div>
    <h1>Hello all Destination</h1>

    <h1>all images of the destination</h1>
    </div>
  )
}


export default AllDestination