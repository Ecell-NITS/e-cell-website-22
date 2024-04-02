import React, { useState } from "react";
import "./Contactus.css";
import axios from "axios";
import { FaTelegramPlane } from "react-icons/fa";
import "../../../pages/Recruiting2324/Recruiting.css";
import { toast } from "react-toastify";
const Contactus = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [disable, setDisable] = useState(false);
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
      toast.error("Please fill all the required fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a correct email.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (/[\d!@#$%^&*(),.?":{}|<>]/.test(name)) {
      toast.error("Name should only contain alphabetic characters", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setSubmitting(true);
    setDisable(true);
    axios
      .post(`${import.meta.env.VITE_REACT_APP_APIMAIN}/sendquery`, {
        email,
        name,
        message,
      })
      .then((response) => {
        setEmail("");
        setName("");
        setMessage("");
        setSubmitting(false);
        setDisable(false);
        toast.success("Contact Us form submitted.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error(error);
        setSubmitting(false);
        setDisable(false);
      });
  };

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
            <h3 className="common-form-recuit ewrtyh">
              Name<span className="reqdinput">*</span>
            </h3>
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
              className="input-common-recruit"
            />
          </div>

          <div className="childform">
            <h3 className="common-form-recuit ewrtyh">
              Email<span className="reqdinput">*</span>
            </h3>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
              className="input-common-recruit"
              placeholder="john@doe.com"
            />
          </div>
          <div className="childform">
            <h3 className="common-form-recuit ewrtyh">
              Message<span className="reqdinput">*</span>
            </h3>
            <textarea
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              required
              placeholder="Lorem Ipsum...."
              className="input-common-recruit"
            ></textarea>
          </div>

          <button
            disabled={disable}
            style={{
              opacity: disable ? 0.5 : 1,
              cursor: disable ? "not-allowed" : "pointer",
            }}
            onClick={submitform}
          >
            {submitting ? "Submitting..." : "Submit"}{" "}
          </button>
        </form>
      </div>
    </>
  );
};

export default Contactus;
