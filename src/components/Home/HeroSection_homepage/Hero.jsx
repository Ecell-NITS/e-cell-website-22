import React from "react";
import "./Hero.css";
import Typed from "react-typed";
import Navbar from "../../shared/Navbar/Navbar";
const Hero = () => {
  return (
    <>
      <div className="hero-top">
        <Navbar />
        <div className="hero-top-main">
          <h1 style={{ userSelect: "none" }}>E-CELL</h1>
          <h2 style={{ userSelect: "none" }}>Entrepreneurship Cell NIT SILCHAR</h2>
        </div>

        <Typed
          className="typewriter-hero"
          style={{ userSelect: "none" }}
          strings={[
            "E-Cell, NITS welcomes you with open arms.", //more relevant text can be added
            "Take a tour of the lands of entrepreneurship!",
            "Curated with love for you by the family of entrepreneurship enthusiasts in NITS.",
            "The path to a successful business career is now easier and less messier.",
          ]}
          typeSpeed={50}
          backSpeed={20}
          loop
        />
      </div>
    </>
  );
};

export default Hero;
