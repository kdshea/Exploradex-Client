import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getToken } from '../helpers/auth'

const NewDestination = () => {

  const navigate = useNavigate()

  const [ newTravel, setNewTravel ] = useState({
    name: '',
    country: '',
    description: '',
    createdBy: '',
  })

  const [ errors, setErrors ] = useState({
    name: '',
    country: '',
    description: '',
  })


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:3000/travel', newTravel, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      
      })
      console.log(data)

      navigate('/travel')
    } catch (error) {
      // setErrors(error)
      console.log(error);
      // setErrors(error.data.message)
    }
    
  } 

  const handleChange = (event) => {
    setNewTravel({ ...newTravel, [event.target.name]: event.target.value })
    // setErrors({ ...errors, [event.target.name]: '', message: '' })
  }



  return (
   <main>
 
    <form onSubmit={handleSubmit}>
      <h1>Add Destination</h1>

      <label htmlFor="name">Name</label>

      <input type="text" name="name" placeholder="name of destination" value={newTravel.name} onChange={handleChange} />
      

      <label htmlFor="origin">country</label>
      <input type="text" name="country" placeholder="Origin" value={newTravel.country} onChange={handleChange} />

      <label htmlFor="description">Description</label>

      <textarea name="description" placeholder="description" value={newTravel.description} onChange={handleChange} ></textarea>

      

      <input type="url" name="url" id="url" placeholder="https://image.com" pattern="https://.*" size="30"
       required />

      {/* add the image as a url input */}
      {/* <label htmlFor="imgUrl">Select image:</label>
      <input type="file" id="img" name="imgUrl" accept="image/*" value={newTravel.imgUrl} onChange={handleChange}/> */}
     <input type="submit"/> 
  
    </form>

    </main>

  )
}



export default NewDestination