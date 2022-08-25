import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import API_URL from '../config.js'
import { getToken } from "./auth"


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
  console.log('upload image data', data.url)
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
    <main>
      <form className="review-form" onSubmit={handleSubmit}>
      <h1>Add review</h1>
        <label htmlFor="reviewText">Review Text</label>
        <textarea name="reviewText" placeholder="Review text" value={review.reviewText} onChange={handleChange} ></textarea>

        <label htmlFor="rating">rating</label>
        <input type="number" name="rating" placeholder="From 0 to 5" value={review.ratin} onChange={handleChange} />

        <label htmlFor="activities">activities</label>
        <textarea name="activities" placeholder="Activities" value={review.activities} onChange={handleChange} ></textarea>


        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" className="input" onChange={(event) => {
          setReviewImg(event.target.files[0])
        }} />
        <button onClick={uploadImage}> Upload image</button>

        <input type="submit"/> 
      </form>
    </main>
  )
}

export default NewReview