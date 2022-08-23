import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config.js'


import { setToken } from '../helpers/auth'

const Login = () => {
  // ! react function for navigation 
  const navigate = useNavigate() 


  const [ loginData, setLoginData ] = useState({
    userName: '',
    password: '',
  })

  const [ errors, setErrors ] = useState()

  

    // ! handleChange 
    const handleChange = (event) => {
      setLoginData({ ...loginData, [event.target.name]: event.target.value  })
    }
  

    const onSubmit = async (event) => {
      event.preventDefault()
      try {
  
      // const res = await axios.post('https://sei65-destinations.herokuapp.com/login', data)
      const { data } = await axios.post(`${API_URL}/login`, loginData)

      // ! login works that is good

      setToken(data.token)
      console.log('token', data.token)
      console.log('id', data.id)

      // const { token } = res.data

      // localStorage.setItem('token', token)
      
      // axios.defaults.headers.common['Authorization'] = token
      
      // console.log(res.data);
      navigate(`/users/${data.id}`)
        
      } catch (error) {
        setErrors(error.response.data.messages)
        console.log(error)
      }
      
    }
  

  return  ( 
    <div className='form-main'>

      <h1>Login Page</h1>

      {errors && <div className='error'>{errors}</div>}

      <form onSubmit={onSubmit} className='form-wrapper'>

          {/* ! inputs need text name placeholder value  */}
          <input type='text' name='userName' placeholder='Username' onChange={handleChange} value={loginData.userName} />
          {/* Password input section  */}
          <input type='password' name='password' placeholder='Password' onChange={handleChange} value={loginData.password} />
          <button type='submit'>Login</button>
      </form>

  </div>
  )
}

export default Login