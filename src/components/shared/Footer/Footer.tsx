import React, { useState } from "react";
import "./Footer.css";
// import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
// import * as Yup from "yup";
// import Label from "./Label";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { MdSend } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import Ip from "../User/Ip";
import db from "./Firebase";
import firebase from "firebase/compat/app";
import "firebase/firestore";

const Footer = () => {
  const [input, setInput] = useState("");
  const inputHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(e.target.value);
  };
  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (input) {
      console.log(input);

      db.collection("emails").add({
        email: input,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
      alert(
        "Congratulations! You have successfully subscribed to our Newsletter! 🎉"
      );
    }
  };
  // interface FormValues {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  // }

  // const submitForm = async (
  //   values: FormValues,
  //   formik: FormikHelpers<FormValues>
  // ) => {
  //   console.log(values);
  //   const { firstName, lastName, email } = values;
  //   try {
  //     const payload = {
  //       merge_fields: {
  //         FNAME: firstName,
  //         LNAME: lastName,
  //       },
  //       email_address: email,
  //     };

  //     await axios.post("/.netlify/functions/add-email-subscriber", payload);
  //     alert(
  //       "Congratulations! You have successfully subscribed to our newsletter."
  //     );
  //     formik.resetForm();
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // const signUpSchema = Yup.object().shape({
  //   firstName: Yup.string()
  //     .min(3, "Too Short bruhh!")
  //     .max(20, "Too long bruhh!")
  //     .required("Required!"),

  //   lastName: Yup.string()
  //     .min(3, "Too Short bruhh!")
  //     .max(20, "Too long bruhh!"),

  //   email: Yup.string().email("Invalid email!").required("Required!"),
  // });

  return (
    <div className="footer-section">
      <div className="fcontainer">
        <div className="container1">
          <Link to="/">
            <img
              className="img-foot-centr"
              src="https://res.cloudinary.com/dp92qug2f/image/upload/v1678341670/Ecell%20website/E-Cell-Logo-White_qhkb0q.webp"
              alt="logo"
            />
          </Link>
        </div>

        <div className="container2">
          <h2 className="h2">Organisation</h2>
          <ul className="no-bullets">
            <li>
              <BiUserCircle className="f_icon" />
              <span className="i-text"> Entrepreneur</span>
            </li>
            <a
              href="https://www.google.com/maps/place/Startup+Centre,+NIT+Silchar/@24.7579056,92.7889985,19z/data=!4m15!1m8!3m7!1s0x374e491f73d2d93d:0x40b0c4ddd14239f4!2sStartup+Centre,+NIT+Silchar!8m2!3d24.7577034!4d92.7895376!10e5!16s%2Fg%2F11h1klwlpg!3m5!1s0x374e491f73d2d93d:0x40b0c4ddd14239f4!8m2!3d24.7577034!4d92.7895376!16s%2Fg%2F11h1klwlpg"
              target={"_blank"}
              rel="noreferrer"
            >
              {" "}
              <li>
                <MdLocationOn className="f_icon" />
                <span className="i-text">
                  {" "}
                  NIT Silchar, Silchar, Assam, India-788010{" "}
                </span>
              </li>
            </a>
            <a href="mailto:ecell@nits.ac.in">
              {" "}
              <li>
                <FiMail className="f_icon" />
                <span className="i-text">ecell@nits.ac.in</span>
              </li>
            </a>
            <a href="tel:+91 6263 943 064">
              {" "}
              <li>
                <BsFillTelephoneFill className="f_icon" />
                <span className="i-text">+91 6263 943 064</span>
              </li>
            </a>
          </ul>
        </div>

        <div className="container3">
          <h2 className="h2">
            <span className="s_head">Social</span>
          </h2>
          <a
            href="https://www.facebook.com/ecell.nit.silchar?mibextid=ZbWKwL"
            className="footer_social_Logo"
            target={"_blank"}
            rel="noreferrer"
          >
            <FaFacebook />
            <span className="i-text">Facebook</span>
          </a>
          <a
            href="https://www.linkedin.com/company/ecell-nit-silchar/"
            className="footer_social_Logo"
            id="link_ln"
            target={"_blank"}
            rel="noreferrer"
          >
            <FaLinkedin />
            <span className="i-text">Linkedln</span>
          </a>
          <a
            href="https://instagram.com/ecell.nitsilchar?igshid=YmMyMTA2M2Y="
            className="footer_social_Logo"
            target={"_blank"}
            rel="noreferrer"
          >
            <FaInstagram className="foot_insta" />
            <span className="i-text">Instagram</span>
          </a>
        </div>

        <div className="container4">
          <h2 className="h2" id="h">
            Subscribe
          </h2>
          <p className="p1" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            Keep yourself updated. Subscribe to our newsletter
          </p>

          <form onSubmit={submitHandler} className="newsletterform00">
            <div className="fill">
              <input
                type="email"
                required
                onChange={inputHandler}
                placeholder="Your Email"
                value={input}
                className="inputtakingnewsletter"
              />
              <button type="submit" className="btnnewsformletter">
                {" "}
                <MdSend className="send" />
              </button>{" "}
            </div>
          </form>

          {/* <form onSubmit={submitHandler} className="newsletterform00">
            <label htmlFor="email">Email<span style={{color:'red'}}>*</span></label>
            <input type="email" required onChange={inputHandler} placeholder="john@doe.com" value={input} />
            <button type="submit">Subscribe</button>
          </form> */}
        </div>
        <div className="container5">
          <p className="p2">All Rights Reserved @E-Cell, NIT Silchar </p>
          <div className="p2 mnjkl">
            Current user :{" "}
            <div className="ipdtls">
              <Ip />
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
