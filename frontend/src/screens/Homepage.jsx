// Import React and any other necessary dependencies
import React from 'react';
import Navbar from '../components/Navbar';
import '../css/homepage.css'; // Import the CSS file

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
const Homepage = () => {
  return (
    <>
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
    </>
  );
}

export default Homepage;
