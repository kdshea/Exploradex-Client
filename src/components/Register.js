import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Register = () => {

  const [ user, setUser ] = useState({
    // ! user register section 
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
  })
  
  const [ errors, setErrors ] = useState(null)
  
  

  // ! what to add! so the user register and it goes to the data base 
  useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await axios.post('', data)
        // ! this might need some work
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()

  }, [])

  const onClick = (event) => {
    
    setUser({ ...user, [event.target.value]: event.target.name  })

  }
  
  return (
  
    <div>

      <form className="register-Form">
      <label htmlFor="email">Email</label>
      <input type='text' placeholder='Enter Email' name='email' required />

      <label htmlFor="userName">Username</label>
      <input type='text' placeholder='Enter userName' name='userName' required />

      <label htmlFor="password"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="password" required />

      <label htmlFor="confirmPassword"><b>confirm Password</b></label>
      <input type="confirmPassword" placeholder="Confirm Password" name="confirmPassword" required />

      <input type="button" value="Register" onclick={onClick} />
      <input type="button" value="Sign in" onclick={onClick} />

    </form>
  </div>

  )
}

export default Register 