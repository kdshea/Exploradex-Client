// import axios from 'axios'
import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [ data, setData ] = useState({
    userName: '',
    password: '',
  })

  const [ errors, setErrors ] = useState()

  // let navigate = useNavigate()

  // ! handleChange 
  // const handleChange = (event) => {
  //   setData({ ...data, [event.target.name]: event.target.value  })
  // }

  // const onSubmit = async (event) => {
  //   event.preventDefault()
  //   try {

  //   const res = await axios.post('http://localhost:4000/login', data)
  //   const { token } = res.data
  //   localStorage.setItem('token', token)
  //   axios.defaults.headers.common['Aithorization'] = token
    
  //   console.log(res.data);
  //   navigate('/Home')
      
  //   } catch (error) {
  //     setErrors(error.response.data.message)
  //     console.log(error)
  //   }
  // }

  return  ( 
    <div>

      <h1>Login Page</h1>

      {errors && <div className='error'>{errors}</div>}

      <form  className='flex-column'>

          {/* ! inputs need text name placeholder value  */}
          <input type='text' name='userName' placeHolder='userName' value={data.userName} />
          {/* Password input section  */}
          <input type='password' name='password' placeHolder='password' value={data.password} />
          <button type='submit'>Login</button>
      </form>

  </div>
  )
}

export default Login