// ? this is a template for the user to add recent destination - looks okay.


import axios from "axios";
import { useState } from "react";

import { Container } from "react-bootstrap";


const NewDestination = () => {

  const [ newTravel, setNewTravel ] = useState({
    name: '',
    country: '',
    description: '',
    rating: '',
    review: '',
  })

  const [ errors, setErrors ] = useState({
    name: '',
    country: '',
    description: '',
    rating: '',
    review: '',
    // ! not sure about the error section 
  })


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:3000/travel', newTravel, {
        headers: {
          Authorization: `Bearer Token`  //! need to work on this part         
        }
      
      })
      setNewTravel(data)
    } catch (error) {
      console.log(error);
    }
  } 


  return (
    <main className="form-page">
    <Container>

      <h1>Hello add new destination</h1>
      {/* <BreadForm
        errors={errors}
        setErrors={setErrors}
        // formData={formData}
        // setFormData={setFormData}
        handleSubmit={handleSubmit}
        title="Add destination"
      /> */}
    </Container>
  </main>
  )
}



export default NewDestination