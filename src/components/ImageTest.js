import axios from 'axios'
import { useEffect, useState } from 'react'
import API_URL from '../config.js'


const ImageTest = () => {

const [ destinationData, setDestinationData ] = useState([])
const [ errors, setErrors ] = useState(false)

useEffect(() => {
  // ! need to see if this works now!
  const getData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/travel`)
      console.log(data)
      setDestinationData(data)
    } catch (error) {
      console.log(error)
      setErrors(error)
    }
  } 
  getData()
}, [])


return (
  // ! might be better to do this in Cards but I will leave this to you Chris.
  
<div>
  <h1 className='text-center mb-4'>Images</h1>
    { destinationData.map(item => {
        return (
          <div key={item._id}>
            <h2>{item.name}</h2>
            {item.imgUrl.map((url, index) => {
              return (
                <div key={index}>
                  <p>
                    <br/>
                    <br/>
                    <br/>
                    {url}
                  </p>
                  <img src={url} alt={item.name}/> 
                </div>
              )
              })}
          </div>
      )
      })}
</div>
)}


export default ImageTest
