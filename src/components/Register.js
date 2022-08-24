import axios from 'axios'
import { useState } from 'react'
import  Container from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config.js'
import { setId, setToken } from '../helpers/auth'

const Register = () => {

  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    email: '',
	  userName: '',
	  password: '',
	  confirmPassword: ''
  })
  const [ loginData, setLoginData ] = useState({
    userName: '',
    password: '',
  })
  const [ errors, setErrors ] = useState('')
  
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value})
    if (event.target.name === 'userName' || event.target.name === 'password') {
      setLoginData({ ...loginData, [event.target.name]: event.target.value })
    }
    // setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`${API_URL}/register`, formData)
      console.log(data)
      autoLogin()
    } catch (error) {
      console.log(error)
      // setErrors({...errors, [event.target.name]: '', message: '' })
    }
  }

  const autoLogin = async (event) => {
    try {
    const { data } = await axios.post(`${API_URL}/login`, loginData)
    setToken(data.token)
    setId(data.userId)
    navigate(`/edit-profile/${data.userId}`)
    } catch (error) {
      // setErrors(error.response.data.messages)
      console.log(error)
    }
  }


  return (
  <main className='form-page'>
     <Container>
        <Row>
          <form onSubmit={handleSubmit}  className='form-register'>
            <h3 className='text-center'>Register</h3>
            {/* Username */}
            <label htmlFor="userName">UserName</label>
            <input onChange={handleChange} type="text" name="userName" placeholder="Username" value={formData.userName} />
          
            {/* Email */}
            <label htmlFor="email">Email</label>
            <input onChange={handleChange} type="email" name="email" placeholder='Email' value={formData.email} />

            {/* Password */}
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} type="password" name="password" placeholder='Password' value={formData.password} />

            {/* Password Confirmation */}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input onChange={handleChange} type="password" name="confirmPassword" placeholder='Confirm Password' value={formData.confirmPassword} />

            {/* Error Message */}
            { errors && <p className='text-danger'>{errors}</p>}

            {/* Submit */}
            <input type="submit" className='btn dark w-100' />
          </form>
        </Row>
      </Container>
</main>

  )
}

export default Register 