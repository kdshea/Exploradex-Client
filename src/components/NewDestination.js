import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getToken } from '../helpers/auth'

const NewDestination = () => {

  const navigate = useNavigate()
  const [ imageSelect, setImageSelected ] = useState('')
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

  const handleChange = (event) => {
    setNewTravel({ ...newTravel, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  const uploadImage = async (event) => {
    const formData = new FormData()
    formData.append('file', imageSelect)
    formData.append('upload_preset', 'djssiss0') //? djssiss0 is the key + danedskby is the name 
    const { data } = await axios.post('https://api.cloudinary.com/v1_1/danedskby/image/upload', formData)
    // ! this is my (serhan miah) login for the cloudinary - for destination images
    console.log('upload image data', data)
  }

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
      console.log(error);
      setErrors(error.data.message)
    }
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
        {/* upload image that connects to the cloudinary */}
        <label htmlFor="image"> Upload Image</label>
        <input type="file" id="image" className="input" onChange={(event) => {
          setImageSelected(event.target.files[0])
        }} />
        <button onClick={uploadImage}> Upload image</button>
        <input type="submit"/> 
      </form>
    </main>
  )
}



export default NewDestination