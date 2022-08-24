import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import API_URL from '../config.js'
import { getToken } from "./auth";


const Review = () => {

const { destinationId } = useParams()

const [ review, setReview ] = useState(null)
// reviewText: { type: String, required: true },
// rating: { type: Number },
// activities: [{ type: String, required: true }],
// createdBy: { type: mongoose.Schema.ObjectId, ref: 'user', required: true },
// destinationId: { type: mongoose.Schema.ObjectId, ref: 'destination', required: true },
// destinationName: String,
// reviewImgUrl: [{ type: String }],

const [ reviewImg, setReviewImg ] = useState('')

const [ errors, setErrors ] = useState(null)

const handleSubmit = async (event) => {
  event.preventDefault()
  try {
    const { data } = await axios.post(`${API_URL}/travel/${destinationId}`, review, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
    })
    console.log(data);
    setReview(data)
  } catch (error) {
    console.log(error);
    setErrors(error)
  }
}
const handleChange = async (event) => {
  setReview({ ...review, [event.target.name]: event.target.value })
  // setErrors({ ...errors, [event.target.name]: '', message: '' })

}

const uploadImage = async (event) => {
  const formData = new FormData()
  formData.append('file', reviewImg)
  formData.append('upload_preset', 'djssiss0') //? djssiss0 is the key + danedskby is the name 
  const { data } = await axios.post('https://api.cloudinary.com/v1_1/danedskby/image/upload', formData)
  // ! this is my (serhan miah) login for the cloudinary - for destination images
  console.log('upload image data', data.url)
  setReview({ ...review, imgUrl: [ data.url ]})
}


  return (
    <main>
      <form onSubmit={handleSubmit}>
      <h1>Add review</h1>
        <label htmlFor="reviewText">Review Text</label>
        <input type="text" name="reviewText" placeholder="reviewText" onChange={handleChange} />

        <label htmlFor="rating">rating</label>
        <input type="text" name="rating" placeholder="From 0 to 5" value={review} onChange={handleChange} />

        <label htmlFor="activities">activities</label>
        <textarea name="activities" placeholder="activities" value={review} onChange={handleChange} ></textarea>


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


export default Review