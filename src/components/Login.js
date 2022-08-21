import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config.js'

const Login = () => {
  // ! react function for navigation 
  let navigate = useNavigate() 

  const [ data, setData ] = useState({
    userName: '',
    password: '',
  })

  const [ errors, setErrors ] = useState()

  

    // ! handleChange 
    const handleChange = (event) => {
      setData({ ...data, [event.target.name]: event.target.value  })
    }
  

    const onSubmit = async (event) => {
      event.preventDefault()
      try {
  
      // const res = await axios.post('https://sei65-destinations.herokuapp.com/login', data)
      const res = await axios.post(`${API_URL}/login`, data)

      // ! login works that is good

      const { token } = res.data

      localStorage.setItem('token', token)
      
      axios.defaults.headers.common['Authorization'] = token
      
      console.log(res.data);
      navigate('/')
        
      } catch (error) {
        setErrors(error.response.data.message)
        console.log(error)
      }
    }
  

  return  ( 
    <div className='form-main'>

      <h1>Login Page</h1>

      {errors && <div className='error'>{errors}</div>}

      <form onSubmit={onSubmit} className='form-wrapper'>

          {/* ! inputs need text name placeholder value  */}
          <input type='text' name='userName' placeholder='userName' onChange={handleChange} value={data.userName} />
          {/* Password input section  */}
          <input type='password' name='password' placeholder='password' onChange={handleChange} value={data.password} />
          <button type='submit'>Login</button>
      </form>

  </div>
  )
}

export default Login