import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config.js'
import { useParams } from 'react-router-dom'
import { getToken } from './auth.js'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import Row  from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'
import Spinner from '../components/Spinner.js'

const EditProfile = () => {

  const { userId } = useParams()
  const navigate = useNavigate()
  const [ imageSelect, setImageSelected ] = useState('')
  const [ errors, setErrors ] = useState(false)
  const [ userProfile, setUserProfile ] = useState({
    displayName: '',
    email: '',
    userName: '',
    aboutMeText: '',
    profileImg: '',
  })
  const [ updatedUserProfile, setUpdatedUserProfile ] = useState(({
    displayName: '',
    email: '',
    userName: '',
    aboutMeText: '',
    profileImg: '',
  }))
  const [ newProfileImg, setNewProfileImg ] = useState('')

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log('user profile', data)
        setUserProfile(data)
        setUpdatedUserProfile(data)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
    }
    getUser()
  }, [userId, newProfileImg])

  const handleChange = (event) => {
    setUpdatedUserProfile({ ...updatedUserProfile, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  const uploadImage = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', imageSelect)
    formData.append('upload_preset', 'djssiss0') //? djssiss0 is the key + danedskby is the name 
    const { data } = await axios.post('https://api.cloudinary.com/v1_1/danedskby/image/upload', formData)
    // ! this is my (serhan miah) login for the cloudinary - for destination images
    console.log('upload image data', data.url)
    setNewProfileImg(data.url)
    setUpdatedUserProfile({ ...updatedUserProfile, profileImg: data.url })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log('updated profile', updatedUserProfile)
      const { data } = await axios.put(`${API_URL}/users/${userId}`, updatedUserProfile, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })

    } catch (error) {
      console.log(error)
      setErrors(error)
    }
  } 

  return (
<Container>
    <Row>
      { userProfile.email ? 
        <>
          <form onSubmit={handleSubmit}>
            <h1>Name: { userProfile.displayName? userProfile.displayName : userProfile.userName}</h1>
        <input type="text" name="displayName" placeholder="Edit display name" value={updatedUserProfile.displayName} onChange={handleChange} />
            <Col md="6">
              <img className='w-100' src={userProfile.profileImg} alt={userProfile.userName} />
            </Col>
            <Col md="6">
              <h2>Profile</h2>
              <p><span>📧</span> {userProfile.email}</p>
              <input type="text" name="email" placeholder="Edit email" value={updatedUserProfile.email} onChange={handleChange} />
              <hr />
              <h2>About Me</h2>
              <p>{userProfile.aboutMeText}</p>
              <textarea name="aboutMeText" placeholder="Edit About Me" value={updatedUserProfile.aboutMeText} onChange={handleChange} ></textarea>
              <hr />
              {/* upload image that connects to the cloudinary */}
              <label htmlFor="image">Upload Image</label>
              { newProfileImg ? 
              <img className='w-100' src={newProfileImg} alt={'User Uploaded Profile'} />
              :
              <></>
              }
              <input type="file" id="image" className="input" onChange={(event) => {
                setImageSelected(event.target.files[0])
              }} />
              <button onClick={uploadImage}>Upload a profile image</button>
              <hr />
              <input type="submit"/> 
              <hr />
              <Link to={`/users/${userId}`} className='btn dark'>Cancel</Link>
            </Col>
          </form>
        </>
        :
        <h2 className="text-center">
          { errors ? 'Something went wrong. Please try again later' : <Spinner />}
        </h2>
      }
    </Row>
  </Container>
  )
}

export default EditProfile