import React from "react";
import eventcard from "../../../assets/events_red/eventcard.png";
import "./eventscard.css";

const eventscards = (props) => {
  return (
      <div className="eventscardscontent">
        <div className="card eventcard" style={{ width: "100%" }}>
          <img src={eventcard} className="card-img-top cardimage" alt="..." />
          <div className="card-body">
            <div className="card-text">
              <p className="cardhead">{props.name}</p>
              <p className="carddate">{props.date}</p>
              <p className="cardlocation">Location</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default eventscards;
