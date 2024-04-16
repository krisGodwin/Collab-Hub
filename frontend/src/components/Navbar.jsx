import React from 'react'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import '../css/navbar.css'


const Navbar = () => {

  
  const [loggedIn, setLoggedIn] = useState(false)

  const [isCreatorLoggedIn, setIsCreatorLoggedIn] = useState(false);

  const [postexist, setPostExist] = useState(false)

 useEffect(() => {
  const user = localStorage.getItem('user');
  const userisCC = localStorage.getItem('user')
  const postexists = localStorage.getItem('post')

  if(userisCC === "CC"){
    setIsCreatorLoggedIn(true)
  }

  if (user !== null) {
    setLoggedIn(true);
  }

  if (postexists === "true"){
    setPostExist(true)
  } else {
    setPostExist(false)
  }
}, [loggedIn, isCreatorLoggedIn, postexist]);



  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate('/login')
  }

  const goSearchPage = () => {
    navigate('/search')
  }

  const goHomePage = () => {
    navigate('/')
  }

  const goProfilePage = () => {
    navigate('/profile')
  }

  // // const goPostPage = () => {
  //   navigate('/post')
  // }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("post")
    localStorage.removeItem("user_id")
    goLoginPage()
  }


  return (
    <div  className="navbar" >
        <div className="logo">
            <img src="./logo.png" alt=""></img>
            <h2>CollabHub</h2> 
        </div> 
        <div className="links">
            <ul>
                <li onClick={goHomePage}>Homepage</li>
                <li onClick={goLoginPage} className={loggedIn ? 'disabled' : ''}>Login</li>
                {/* <li onClick={goPostPage} className={isCreatorLoggedIn ? 'disabled' : ''}>Post</li> */}
                <li onClick={goSearchPage}>Search</li>
                <li onClick={goProfilePage} className={postexist || !loggedIn ? 'disabled' : ''}>Profile</li>
                <li onClick={logout} className={loggedIn ? '' : 'disabled'}>Logout</li>
            </ul>
        </div>
        <div  className="message">

        </div>
    </div>
  )
}

export default Navbar