// import { render } from "@testing-library/react";
import React from "react";
import "./Card.css"

export default function Card(props) {
  return (
    <div className="card">
      <div className="image_style">
      <img src={props.image} alt="" srcset="" className="image_style" />
      </div>
      <div className="text">
        {props.dialogue}
      </div>
    </div>
  );
}
