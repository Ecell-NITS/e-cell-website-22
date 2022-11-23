import React from "react";
import "./ItemCard.css";
import sir from './sir.jpg';

const ItemCard = (props) => {
  return (
    <div className="Item">
      <div className="frame">
        <div className="rectangle">
          <p className="description">"{props.desc}"</p>

          <span className="name">{props.name}</span>
          <span className="designation">{props.designation}.</span>
          <div className="triangle"></div>
        </div>
      </div>
      <div className="ellipse">
        <img src={sir} alt="" />
      </div>
    </div>
  );
};

export default ItemCard;
