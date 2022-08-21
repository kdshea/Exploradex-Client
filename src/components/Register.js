import axios from 'axios'
import { useEffect, useState } from 'react'
import  Container from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config.js'

const Register = () => {

  const navigate = useNavigate()

  // ! State
  const [ formData, setFormData ] = useState({
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  
  const [ errors, setErrors ] = useState(null)
  
  


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value})
    setErrors('')
  }


  // ! handleSumbit
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // const { data } = await axios.post('https://sei65-destinations.herokuapp.com/register', formData)
      const { data } = await axios.post(`{${API_URL}/register`, formData)
      setFormData(data)

      navigate('/login')
      
    } catch (error) {
      console.log(error)
      setErrors(error.data.message)
      // ! double check the error message location might not be the same
    }
  }
  
  return (

  // ! bootStrap below 
  <main className='form-page'>
     <Container>
        <Row>
          <form className='form-register'>
            <h3 className='text-center'>Register</h3>
            {/* Username */}
            <label htmlFor="username">Username</label>
            <input onChange={handleChange} type="text" name="username" placeholder="Username" value={formData.username} />
            {/* Email */}
            <label htmlFor="email">Email</label>
            <input onChange={handleChange} type="email" name="email" placeholder='Email' value={formData.email} />
            {/* Password */}
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} type="password" name="password" placeholder='Password' value={formData.password} />
            {/* Password Confirmation */}
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <input onChange={handleChange} type="password" name="passwordConfirmation" placeholder='Confirm Password' value={formData.passwordConfirmation} />
            {/* Error Message */}
            { errors && <p className='text-danger'>{errors}</p>}
            {/* Submit */}
            <input onSubmit={handleSubmit} type="submit" value="Register" className='btn dark w-100' />
          </form>
        </Row>
      </Container>
</main>

  )
}

export default Register 