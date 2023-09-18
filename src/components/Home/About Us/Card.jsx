// import { render } from "@testing-library/react";
import React from "react";
import "./Card.css";

export default function Card(props) {
  return (
    <div className="about_card_">
      <div className="image_style">
        <img src={props.image} alt="cardimage" className="image_style" />
      </div>
      <div className="motto_card_text">{props.dialogue}</div>
    </div>
  );
}
