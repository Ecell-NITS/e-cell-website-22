import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../../../components/Admin/Page-title/title";
import EventCard from "../../../../components/Admin/EventCard/EventCard";
import styles from "./Events.module.scss";
import { Link } from "react-router-dom";

const EventsAdmin = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/events/fetch`, config)
      .then((response) => {
        setEvents(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to retrieve events", error);
      });
  }, []);

  return (
    <div className="EventsAdmin">
      <div className={styles.container}>
        <Title title="Events" />
        <Link className={styles.btn} to={"/admin/add-events"}>
          <h3>Add Event </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="27"
            viewBox="0 0 26 27"
            fill="none"
          >
            <line
              y1="-3.5"
              x2="25.7582"
              y2="-3.5"
              transform="matrix(0.00832272 -0.999965 0.999961 0.00881173 15.6133 26.416)"
              stroke="white"
              strokeWidth="7"
            />
            <line
              y1="-3.5"
              x2="25.002"
              y2="-3.5"
              transform="matrix(0.999937 0.0112493 -0.010625 0.999943 0 16.4766)"
              stroke="white"
              strokeWidth="7"
            />
          </svg>
        </Link>
      </div>
      <div className={styles.card}>
        {events.map((item) => (
          <EventCard key={item._id} event={item} />
        ))}
      </div>
    </div>
  );
};

export default EventsAdmin;
