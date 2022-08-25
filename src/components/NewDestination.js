import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API_URL from '../config.js'
import { getToken } from '../helpers/auth'

const NewDestination = () => {

  const navigate = useNavigate()
  const [ imageSelect, setImageSelected ] = useState('')
  const [ newTravel, setNewTravel ] = useState(
    {
    name: '',
    country: '',
    description: '',
    rating: undefined,
    reviews: [], 
    createdBy: '',
    imgUrl:[],
  }
  )
  const [ errors, setErrors ] = useState(false)

  const handleChange = (event) => {
    setNewTravel({ ...newTravel, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
    
  }

  const uploadImage = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', imageSelect)
    formData.append('upload_preset', 'djssiss0') //? djssiss0 is the key + danedskby is the name 
    const { data } = await axios.post('https://api.cloudinary.com/v1_1/danedskby/image/upload', formData)
    // ! this is my (serhan miah) login for the cloudinary - for destination images
    console.log('upload image data', data.url)
    setNewTravel({ ...newTravel, imgUrl: [ data.url ]})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`${API_URL}/travel`, newTravel, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      console.log(data)
      navigate('/travel')
    } catch (error) {
      setErrors(error.message)
      console.log(error.message)
    }
  } 

  return (
   <main>
      <form className="form-addDestination" onSubmit={handleSubmit}>
        <h1>Add Destination</h1>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" placeholder="Name of Destination" value={newTravel.name} onChange={handleChange} />

        <label htmlFor="country">Country</label>
        <input type="text" name="country" placeholder="Country" value={newTravel.country} onChange={handleChange} />

        <label htmlFor="description">Description</label>
        <textarea name="description" placeholder="Description" value={newTravel.description} onChange={handleChange} ></textarea>

        <label htmlFor="rating">Rating</label>
        <input type="number" name="rating" placeholder="From 0 to 5" value={newTravel.rating} onChange={handleChange} />

        {/* upload image that connects to the cloudinary */}
        <label htmlFor="image">Upload Image</label>
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