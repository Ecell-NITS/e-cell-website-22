import React from "react";
import "./ItemCard.css";
import dirsir from '../../../assets/sir.jpg'

const ItemCard = (props) => {
  return (
    <div className="Item">
      <div className="frame">
        <div className="rectangle">
          <p className="description_pillars">"{props.desc}"</p>

          <span className="name_pillars">{props.name}</span>
          <span className="designation_pillars">{props.designation}.</span>
          <div className="triangle"></div>
        </div>
      </div>
      <div className="ellipse">
        <img src={dirsir} alt="" />
      </div>
    </div>
  );
};

export default ItemCard;
