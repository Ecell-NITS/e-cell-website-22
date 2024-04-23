import React from "react";
import styles from "./EventCard.module.scss";

const EventCard = ({ event }) => {
  const { eventName, organizers, eventDetails } = event;

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>{eventName}</h2>
        <h4>Organiser: {organizers}</h4>
        <p>{eventDetails}</p>
      </div>
    </div>
  );
};
export default EventCard;
