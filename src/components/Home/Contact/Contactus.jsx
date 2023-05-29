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
          <h3 className='common-form-recuit ewrtyh'>Name<span className='reqdinput'>*</span></h3>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              placeholder="John Doe"
              // className="textwriting"
              className='input-common-recruit'
            />
          </div>

          <div className="childform">
          <h3 className='common-form-recuit ewrtyh'>Email<span className='reqdinput'>*</span></h3>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
              className='input-common-recruit'
              placeholder="john@doe.com"
            />
          </div>
          <div className="childform">
          <h3 className='common-form-recuit ewrtyh'>Message<span className='reqdinput'>*</span></h3>
            <textarea
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              required
              placeholder="Lorem Ipsum...."
              className='input-common-recruit'
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
