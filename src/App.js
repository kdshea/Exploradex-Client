
import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'

import NavBar from './components/NavBar'

// ! y
import Login from './components/Login'
import Register from './components/Register'
import UserProfile from './components/UserProfile'
import Footer from './components/Footer'
import Landing from './components/Landing'
import Destination from './components/Destination'
import AllDestination from './components/AllDestination'
import NewDestination from './components/NewDestination'

import ImageTest from './components/ImageTest'

function App() {



  return (
    <div className="App">
      <BrowserRouter>

      <NavBar /> 

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/users/:userId' element={<UserProfile />} />
          {/* userProfile page links works, need to see how to load individual page */}
          <Route path='/landing' element={<Landing />}  />
          <Route path='/travel/:travelId' element={<Destination />}  />
          <Route path='/travel' element={<AllDestination />}  />
          <Route path="/travel/new" element={<NewDestination />} />
          <Route path="/images" element={<ImageTest />} />    
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  )

}

export default App;
