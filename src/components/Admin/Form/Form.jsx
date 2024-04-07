import React from "react";
import { useState, useMemo } from "react";
// import toast from 'react-toastify';
import styles from "./Form.module.scss";
// import { Toaster } from 'react-toastify';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    module: "",
    eventName: "",
    organizers: "",
    venue: "",
    eventDetails: "",
  });

  // const [formError, setFormError] = useState({});

  const OnChangeHandler = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("bro");
  };

  const isButtonEnabled = useMemo(() => {
    return (
      formData.module.length > 0 &&
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
          <form>
            <div className={styles.box}>
              <label htmlFor="module">Module Name:</label>
              <input name="module" autoComplete="off" onChange={OnChangeHandler} />
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
                onClick={handleSubmit}
                type="submit"
              >
                {" "}
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
