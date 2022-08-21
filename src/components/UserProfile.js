// import  Card  from "react-bootstrap/Card"
// import  Container  from "react-bootstrap/Container"

import axios from 'axios'
import { useEffect, useState } from 'react'
import Serhan from '../img/4db349_218f4014bcd97b058e8f89469dc0e5d7.webp'
// import API_URL from '../config.js'




const UserProfile = () => {

  const [ userProfile, setUserProfile ] = useState({
    email: '',
    userName: '',
    role: '',
    createdAt: '',
    reviews: '',
    id: '', // not sure id is needed
// ! this will call all the information from the data user I hope 
  })



  // ! need to fetch the data of the user profile.
  useEffect(() => {
    const getUser = async () => {
      try {
        // ? need to check the method of the user. 
        const { data } = await axios.get('')
        setUserProfile(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])




  return (

    <div class="container mt-5">
    
    <div class="row d-flex justify-content-center">
        
        <div class="col-md-7">
            
            <div class="card p-3 py-4">
                
                <div class="img-div">
                    <img src={Serhan} width="100"  className="rounded-circle" alt='serhan' />
                </div>
                
                <div class="text-center mt-3">
                    <span class="bg-secondary p-1 px-4 rounded text-white">Pro</span>
                    <h5 class="mt-2 mb-0">Serhan Miah</h5>
                    <span>Designer</span>
                    

                    <div class="px-4 mt-1">
                        <p class="fonts">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod maxime odio dignissimos eius enim omnis tempore, placeat voluptatum. Nihil ad possimus eveniet dolorum rem vero nam eum repellendus pariatur earum! </p>
                    
                    </div>
                    
                     <ul class="social-list">
                        <li><i class="fa fa-facebook"></i></li>
                        <li><i class="fa fa-dribbble"></i></li>
                        <li><i class="fa fa-instagram"></i></li>
                        <li><i class="fa fa-linkedin"></i></li>
                        <li><i class="fa fa-google"></i></li>
                    </ul>
                    
                    <div className='reviews-done'>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, minima eum quo placeat excepturi, necessitatibus rerum culpa est possimus similique maiores? Inventore beatae, sit repellendus id fuga ipsa quaerat magni.</p>
                        <br />

                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio magnam molestiae placeat reiciendis tempora expedita optio, dicta sit quod doloremque nihil fugiat iure aliquam error voluptatum inventore alias debitis quos.</p>
                        
                    </div>
                    
                    
                </div>
                
               
                
                
            </div>
            
        </div>
        
    </div>
    
</div>

  )
}

export default UserProfile