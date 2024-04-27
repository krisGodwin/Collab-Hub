<<<<<<< HEAD
<<<<<<< HEAD
// Import React and any other necessary dependencies
import React from 'react';
import Navbar from '../components/Navbar';
import '../css/homepage.css'; // Import the CSS file
=======
import React from 'react'
import Navbar from '../components/Navbar'
import "../css/homepage.css"
import Zoom from 'react-reveal/Zoom';
>>>>>>> temp

// HeroSection Component
const HeroSection = ({ title, subtitle }) => {
  return (
    <div className="hero-section">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {/* Additional content for HeroSection */}
    </div>
  );
};

// FeaturedCreators Component
const FeaturedCreators = () => {
  return (
    <div className="featured-creators">
      <h2>Featured Creators</h2>
      <ul>
        <li>Creator 1</li>

        <li>Creator 2</li>
        <li>Creator 3</li>
      </ul>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 CollabHub. All rights reserved.</p>
    </footer>
  );
};

// Homepage Component
=======
import React from 'react'
import Navbar from '../components/Navbar'
import "../css/homepage.css"

>>>>>>> chat
const Homepage = () => {


  return (
    <>
<<<<<<< HEAD
<<<<<<< HEAD
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        title="Welcome to CollabHub"
        subtitle="Connecting content creators with brands"
      />

      {/* Featured Creators Section */}
      <FeaturedCreators />

      {/* Footer */}
      <Footer />
=======
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
>>>>>>> temp
    </>
  );
}

export default Homepage;
=======
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
>>>>>>> chat
