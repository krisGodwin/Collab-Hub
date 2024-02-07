import React from 'react'
import Navbar from '../components/Navbar'
import "../css/homepage.css"
import Zoom from 'react-reveal/Zoom';

const Homepage = () => {


  return (
    <>
        <Navbar />
          <div className='home-div'>
            <div className="initial-content">
              <Zoom>
              <h1>Collab Hub</h1>
              <p>An AI-driven tool to enhance collaborations between influencers an sponsors</p>
              </Zoom>
            </div>
            <Zoom>
              <p>Markup that will be revealed on scroll</p>
            </Zoom>
          </div>
    </>
  )
}

export default Homepage