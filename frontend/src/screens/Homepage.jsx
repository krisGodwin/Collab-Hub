import React from 'react'
import Navbar from '../components/Navbar'
import "../css/homepage.css"

const Homepage = () => {


  return (
    <>
        <Navbar />
          <div className='home-div'>
            <div className="initial-content">
              <h1>Collab Hub</h1>
              <p>An AI-driven tool to enhance collaborations between influencers an sponsors</p>
            </div>
              <p>Markup that will be revealed on scroll</p>
          </div>
    </>
  )
}

export default Homepage