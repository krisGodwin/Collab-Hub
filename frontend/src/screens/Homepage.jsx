import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useEffect } from "react"

const Homepage = () => {

  const [isCreatorLoggedIn, setIsCreatorLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user')

    if(user === "CC"){
      setIsCreatorLoggedIn(true)
    }
  },[isCreatorLoggedIn])

  return (
    <>
        <Navbar isCreatorLoggedIn={isCreatorLoggedIn} />
        <h1>Welcome To CollabHub</h1>
    </>
  )
}

export default Homepage