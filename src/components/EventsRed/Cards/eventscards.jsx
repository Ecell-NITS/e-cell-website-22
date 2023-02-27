import React from "react";
import eventcard from "../../../assets/events_red/eventcard.png";
import "./eventscard.css";

const eventscards = (props) => {
  return (
      <div className="eventscardscontent">
        <div class="card eventcard" style={{ width: "100%" }}>
          <img src={eventcard} class="card-img-top cardimage" alt="..." />
          <div class="card-body">
            <p class="card-text">
              <p className="cardhead">EVENT NAME</p>
              <p className="carddate">Sunday, Feb 05 3:00 PM</p>
              <p className="cardlocation">Location</p>
            </p>
          </div>
        </div>
      </div>
  );
};

export default eventscards;
