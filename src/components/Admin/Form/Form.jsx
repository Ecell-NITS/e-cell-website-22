import React, { useState, useMemo, useEffect } from "react";
import styles from "./Form.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ContactForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    moduleName: "",
    eventName: "",
    organizers: "",
    venue: "",
    eventDetails: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const OnChangeHandler = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      axios
        .post(`${import.meta.env.VITE_REACT_APP_APIMAIN}/events/add`, formData, config)
        .then((res) => {
          console.log("Event added successfully:", res.data);
          toast.success("Event Added Successfully");
          setFormData({
            moduleName: "",
            eventName: "",
            organizers: "",
            venue: "",
            eventDetails: "",
          });
        });
    } catch (error) {
      console.error("Failed to add event", error);
      toast.error("Failed to add event!");
    }
  };

  const isButtonEnabled = useMemo(() => {
    return (
      formData.moduleName.length > 0 &&
      formData.eventName.length > 0 &&
      formData.organizers.length > 0 &&
      formData.venue.length > 0 &&
      formData.eventDetails.length > 0
    );
  }, [formData]);

  return (
    <>
      <div className={styles.bro} id="addevents">
        <div className={` ${styles.container} `}>
          <form onSubmit={handleSubmit}>
            <div className={styles.box}>
              <label htmlFor="moduleName">Module Name:</label>
              <input name="moduleName" autoComplete="off" onChange={OnChangeHandler} />
            </div>
            <div className={styles.box}>
              <label htmlFor="eventName">Event Name:</label>
              <input name="eventName" autoComplete="off" onChange={OnChangeHandler} />
            </div>
            <div className={styles.box}>
              <label htmlFor="organizers">Organizers:</label>
              <input name="organizers" autoComplete="off" onChange={OnChangeHandler} />
            </div>
            <div className={styles.box}>
              <label htmlFor="venue">Venue:</label>
              <input name="venue" autoComplete="off" onChange={OnChangeHandler} />
            </div>
            <div className={styles.box}>
              <label htmlFor="eventDetails">Event Details:</label>
              <textarea
                name="eventDetails"
                autoComplete="off"
                onChange={OnChangeHandler}
              />
            </div>
            <div className={styles.sub}>
              <button
                disabled={!isButtonEnabled}
                style={{
                  cursor: !isButtonEnabled ? "not-allowed" : "pointer",
                  opacity: !isButtonEnabled ? "0.5" : "1",
                }}
                type="submit"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
