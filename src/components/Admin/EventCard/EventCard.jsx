import React from "react";
import styles from "./EventCard.module.scss";

const EventCard = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <h2>Title</h2>
          <h4>Organiser</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam sequi voluptatem
            illum reprehenderit molestias enim rerum adipisci placeat cumque corporis
            nulla, voluptate velit veniam aut est minus. Id, hic iure!
          </p>
        </div>
      </div>
    </>
  );
};

export default EventCard;
