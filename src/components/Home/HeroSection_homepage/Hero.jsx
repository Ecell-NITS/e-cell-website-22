import React from 'react'
import './Hero.css';
import Typed from "react-typed";
import Navbar from '../../shared/Navbar/Navbar';
const Hero = () => {
  return (
    <>
      <div className="hero-top">
        <Navbar />
        <div className="hero-top-main">
          <h1 style={{ userSelect: 'none' }}>E-CELL</h1>
          <h2 style={{ userSelect: 'none' }}>Entrepreneurship Cell NIT SILCHAR</h2>
        </div>

        <Typed
          className="typewriter-hero" style={{ userSelect: 'none' }}
          strings={[
            "Welcome to Entrepreneurship Cell!", //more relevant text can be added
            "For The NITS by the NITS!",
            "We help startups to achieve their dream.",
            "This is ECELL NITS!",
          ]}
          typeSpeed={50}
          backSpeed={20}
          loop
        />
      </div>

      
    </>
  )
}

export default Hero