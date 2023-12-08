import React, { useState, useEffect } from "react";
import ecell from "../../assets/E-Cell-Logo-White.png";
import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={ecell} className="logo"></img>
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
