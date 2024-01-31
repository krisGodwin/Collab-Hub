import React from 'react'
import { useNavigate } from "react-router-dom"
import '../css/navbar.css'


const Navbar = () => {

  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate('/login')
  }

  const goSearchPage = () => {
    navigate('/search')
  }

  const goHomePage = () => {
    navigate('/homepage')
  }

  const goProfilePage = () => {
    navigate('/profile')
  }


  return (
    <div className="navbar" >
      <div className="logo">
        <img src="./logo.png" alt=""></img>
        <h2>CollabHub</h2>
      </div>
      <div className="links">
        <ul>
          <li onClick={goHomePage}>Homepage</li>
          <li onClick={goLoginPage}>Login</li>
          <li onClick={goSearchPage}>Search</li>
          <li onClick={goProfilePage}>Profile</li>
        </ul>
      </div>
      <div className="message">

      </div>
    </div>
  )
}

export default Navbar