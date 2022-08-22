
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'

import NavBar from './components/NavBar'

// ! y
import Login from './components/Login'
import Register from './components/Register'
import UserProfile from './components/UserProfile'
// import Footer from './components/Footer'
import Landing from './components/Landing'
import Destination from './components/Destination'
import AllDestination from './components/AllDestination'
import NewDestination from './components/NewDestination'

function App() {



  return (
    <div className="App">
      <BrowserRouter>

      <NavBar /> 

        <Routes>

          <Route path='/' element={<Home />} />

          <Route path='/Login' element={<Login />} />

          <Route path='/Register' element={<Register />} />

          <Route path='/UserProfile/' element={<UserProfile />} />
          {/* userProfile page links works, need to see how to load individual page */}
          <Route path='/Landing' element={<Landing />}  />

          <Route path='/travel/:travelId' element={<Destination />}  />

          <Route path='/travel' element={<AllDestination />}  />

          <Route path="/travel/new" element={<NewDestination />} />


        </Routes>

        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  )

}

export default App;
