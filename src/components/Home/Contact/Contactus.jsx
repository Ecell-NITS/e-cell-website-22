import React, { useState } from "react";
import "./Contactus.css";
import axios from "axios";
import { FaTelegramPlane } from "react-icons/fa";

const Contactus = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  const isFormValid = () => {
    return email !== "" && name !== "" && message !== "";
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /* button onclick function */
  const submitform = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      alert("Please fill all the required fields");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a correct email.");
      return;
    }

    if (/[\d!@#$%^&*(),.?":{}|<>]/.test(name)) {
      alert("Name should only contain alphabetic characters");
      return;
    }
    setSubmitting(true);
    axios
      .post(process.env.REACT_APP_AXIOSPOST_POST_SENDEMAIL, {
      // .post('http://localhost:3001/sendquery', {
        email,
        name,
        message
      })
      .then((response) => {
        setEmail("");
        setName("");
        setMessage("");
        setSubmitting(false);
        alert("Contact Us form submitted.");
      });
  }

  return (
    <>
      <div className="collab">
        <h1 style={{ userSelect: "none" }}>
          Contact Us <FaTelegramPlane />
        </h1>
      </div>
      <h2 className="contactpromo">Have any query? Feel free to contact us.</h2>
      <div className="formcontact">
        <form className="forminclass">
          <div className="childform">
            <label htmlFor="name" className="labeltitle">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              placeholder="John Doe"
              className="textwriting"
            />
          </div>

          <div className="childform">
            <label htmlFor="email" className="labeltitle">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
              className="textwriting"
              placeholder="john@doe.com"
            />
          </div>
          <div className="childform">
            <label htmlFor="message" className="labeltitle">
              Message
            </label>
            <textarea
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              required
              placeholder="Lorem Ipsum...."
              className="textwriting"
            ></textarea>
          </div>


          <button onClick={submitform}>
            {submitting ? "Submitting..." : "Submit"}{" "}
          </button>
        </form>
      </div>
    </>
  );
};

export default Contactus;
