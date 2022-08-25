import axios from "axios"
import { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate, useParams } from "react-router-dom"
import API_URL from '../config.js'
import { getToken } from "./auth"
import { Container } from "react-bootstrap"


const NewReview = () => {

const navigate = useNavigate()
const { destinationId } = useParams()
const [ review, setReview ] = useState(
{
reviewText: '',
rating: undefined,
activities: [''],
createdBy: '',
destinationId: '',
destinationName: '',
reviewImgUrl: [''],
})
const [ reviewImg, setReviewImg ] = useState('')
const [ errors, setErrors ] = useState(false)

useEffect(() => {
}, [reviewImg])

const handleChange = async (event) => {
  setReview({ ...review, [event.target.name]: event.target.value })
  setErrors({ ...errors, [event.target.name]: '', message: '' })
}

const uploadImage = async (event) => {
  event.preventDefault()
  const formData = new FormData()
  formData.append('file', reviewImg)
  formData.append('upload_preset', 'djssiss0') //? djssiss0 is the key + danedskby is the name 
  const { data } = await axios.post('https://api.cloudinary.com/v1_1/danedskby/image/upload', formData)
  // ! this is my (serhan miah) login for the cloudinary - for destination images
  setReviewImg(data.url)
  setReview({ ...review, reviewImgUrl: [ data.url ]})
}

const handleSubmit = async (event) => {
  event.preventDefault()
  try {
    const { data } = await axios.post(`${API_URL}/travel/${destinationId}`, review, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
    })
    console.log(data)
    navigate(`/travel/${destinationId}`)
  } catch (error) {
    console.log(error)
    setErrors(error)
  }
}

  return (

    
    
    <Container as='main'>
      <Form className="review-form" onSubmit={handleSubmit}>
      <h1>Add review</h1>
      
      <Form.Group>
        <Form.Label htmlFor="reviewText" >Review Text</Form.Label>
        <textarea name="reviewText" placeholder="Review text" value={review.reviewText} onChange={handleChange} ></textarea>
      </Form.Group>

      <Form.Group>
        <Form.Label>Rating</Form.Label>
        <Form.Control type="number" name="rating" placeholder="From 0 to 5" value={review.rating} onChange={handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Activities</Form.Label>
        <textarea name="activities" placeholder="Activities" value={review.activities} onChange={handleChange} ></textarea>
      </Form.Group>

      <Form.Group className="upload-image-destinaion mb-3"  >
      <Form.Label>Image</Form.Label>
      { reviewImg ? 
              <img className='w-100' src={reviewImg} alt={'User Uploaded Destination'} />
              :
              <></>
              }
        <input type="file" id="image" className="input" onChange={(event) => {
          setReviewImg(event.target.files[0])
        }} /> 
        <Button onClick={uploadImage}>Upload image</Button>
    </Form.Group> 

      <Button variant="primary" type="submit">
        Submit
      </Button>
      
      {/* { errors && <p className='text-danger'>{errors}</p>} */}
    </Form>

    </Container>
  )




  
}

export default NewReview