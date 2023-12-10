import React, { useState, useEffect } from "react";
import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="preloader">
      <img
        rel="preload"
        src="https://res.cloudinary.com/dt2zy7sny/image/upload/v1702107626/E-Cell-Logo-White_oqi3mh.png"
        className="logo"
      ></img>
      <div className="loader">
        <div className="loading-text">Loading</div>
        <div className="dot1"></div>
        <div className="dot2"></div>
        <div className="dot3"></div>
      </div>
    </div>
  );
};
export default Preloader;
