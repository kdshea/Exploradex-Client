
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NavBar from './components/NavBar'
import Register from './components/Register'
import UserProfile from './components/UserProfile'
// import Footer from './components/Footer'
import Landing from './components/Landing'
import Destination from './components/Destination'

function App() {



  return (
    <div className="App">
      <BrowserRouter>

      <NavBar /> 

        <Routes>

          <Route path='/' element={<Home />} />

          <Route path='/Login' element={<Login />} />

          <Route path='/Register' element={<Register />} />

          <Route path='/UserProfile' element={<UserProfile />} />

          <Route path='/Landing' element={<Landing />}  />

          <Route path='/Destination' element={<Destination />}  />

        </Routes>

        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  )

}

export default App;
