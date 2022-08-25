import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API_URL from '../config.js'
import { getToken } from '../helpers/auth'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// import { Input } from "react-bootstrap/Input"

const NewDestination = () => {

  const navigate = useNavigate()
  const [ imageSelect, setImageSelected ] = useState('')
  const [ errors, setErrors ] = useState(false)
  const [ newImgUrl, setNewImgUrl ] = useState('')
  const [ newTravel, setNewTravel ] = useState('')

  useEffect(() => {
  }, [newImgUrl])

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
    setNewImgUrl(data.url)
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
  <div className="add-destinationForm">

<Form onSubmit={handleSubmit}>
  <h1>Add Destination</h1>
  
    {/* user Name */}
    <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Name of Destination" value={newTravel.name} onChange={handleChange} /> 
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control type="text" name="country" placeholder="Country" value={newTravel.country} onChange={handleChange} />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <textarea name="description" placeholder="Description" value={newTravel.description} onChange={handleChange} ></textarea>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRating">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="number" name="rating" placeholder="From 0 to 5" value={newTravel.rating} onChange={handleChange} /> 
      </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicImage">
      <Form.Label>Image</Form.Label>
      { newImgUrl ? 
              <img className='w-100' src={newImgUrl} alt={'User Uploaded Destination'} />
              :
              <></>
              }
        <input type="file" id="image" className="input" onChange={(event) => {
          setImageSelected(event.target.files[0])
        }} /> 
        <Button onClick={uploadImage}>Upload image</Button>
    </Form.Group> 

      <Button variant="primary" type="submit">
        Submit
      </Button>
      {/* { errors && <p className='text-danger'>{errors}</p>} */}
    </Form>
    </div>
  )
}



export default NewDestination