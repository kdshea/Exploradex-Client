import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import API_URL from '../config.js'
import { getToken } from "./auth";


const Review = () => {

const { destinationId } = useParams()

const [ review, setReview ] = useState(null)



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
  }
}
const handleChange = async (event) => {
  setReview({ ...review, [event.target.nmae]: event.target.value })
  
}


  return (
  <div>
  <h1>Add Review</h1>

  <form className="add-review" onSubmit={handleSubmit}>
  <div className="pinfo">Your Review</div>
  
  <div className="form-group">
    <div className="input-group">
    <div className="pinfo">Rate destination.</div>
    <select className="form-control" id="rate">
        <option value="1star">1</option>
        <option value="2stars">2</option>
        <option value="3stars">3</option>
        <option value="4stars">4</option>
        <option value="5stars">5</option>
      </select>
      </div>
    </div>

  <div className="form-group">
    <div className="col-md-4 inputGroupContainer">
    <div className="pinfo">Write your review.</div>
    <textarea className="form-control" id="review" rows="7"></textarea>
      </div>
    </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}


export default Review