import { useState } from "react";
import Footer from "../../../components/shared/Footer/Footer";
import NavbarTeam from "../../../components/shared/Navbar/NavbarTeam";
import styles from "./TechRecruit.module.scss";
import { toast } from "react-toastify";
import axios from "axios";

const TechRecruit = () => {
  const instructions = [
    "Only first year students of NITS are eligible to fill this form.",
    "Use ONLY your Institute email id.",
    "Check your Institute email inbox or SPAM folder for the otp.",
    "You can only fill this form once so please be attentive while filling the form.",
    "Keep checking your inbox for further instructions.",
    "Last date to fill the form is June 25th 2023 11:59pm.",
  ];

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [scholarId, setScholarId] = useState("");
  const [domain, setDomain] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [otp, setOtp] = useState("");

  const hanleSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      number === "" ||
      email === "" ||
      scholarId === "" ||
      domain === "" ||
      resumeUrl === "" ||
      otp === ""
    ) {
      toast.error("All fields are required");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Invalid email id");
      return;
    }
    if (!email.includes("nits.ac.in")) {
      toast.error("Use only your Institute email id");
      return;
    }
    if (number.length !== 10) {
      toast.error("Invalid phone number");
      return;
    }
    if (scholarId.length !== 7) {
      toast.error("Invalid scholar id");
      return;
    }
    if (domain === "Choose a domain") {
      toast.error("Choose a domain");
      return;
    }
    if (otp.length !== 6) {
      toast.error("Invalid OTP");
      return;
    }
    if (scholarId.startsWith("23") === false || email.includes("_ug_23") === false) {
      toast.error(
        "This form is only for 2024-27 batch students. Please check the eligibility criteria."
      );
      return;
    }

    const data = {
      name,
      number,
      email,
      scholarId,
      domain,
      resumeUrl,
      githubUrl,
      otp,
    };

    try {
      axios
        .post(`${import.meta.env.VITE_REACT_APP_TECH_RECRUIT_API}/apply`, data)
        .then((response) => {
          console.log("Form submitted successfully", response);
          toast.success("Form submitted successfully");
        })
        .catch((error) => {
          console.error("Failed to submit form", error);
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Failed to submit form");
          }
        });
    } catch (error) {
      console.error("Failed to submit form", error);
      toast.error("Failed to submit form");
    }
  };
  const sendOtp = (e) => {
    e.preventDefault();
    if (email === "" || !email.includes("@") || !email.includes("nits.ac.in")) {
      toast.error("Invalid email id");
      return;
    }
    if (email.includes("_ug_22") === false) {
      toast.error(
        "This form is only for 2024-27 batch students. Please check the eligibility criteria."
      );
      return;
    }
    axios
      .post(`${import.meta.env.VITE_REACT_APP_TECH_RECRUIT_API}/apply/sendOtp`, {
        email,
      })
      .then((response) => {
        console.log("OTP sent successfully", response);
        toast.success("OTP sent successfully");
      })
      .catch((error) => {
        console.error("Failed to send OTP", error);
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to send OTP");
        }
      });
  };
  return (
    <div className={styles.TechRecruit}>
      <NavbarTeam />
      <div className="topbgrecuit">
        <h1 className="titlerecuit">Recruitment</h1>
        <h1 className="titlerecuit-for">for Tech Team</h1>
        <h1 className="titlerecuit-tenure">
          2024-25 <span className="tenure-recuit">Tenure</span>
        </h1>
      </div>

      <div className={styles.techContainer}>
        <div>
          <p>
            Are you passionate about the entrepreneurial world and are looking for a
            platform to learn as well as showcase your knowledge? Look no further. The
            Entrepreneurship Cell (E-Cell) of NIT Silchar is thrilled to announce
            recruitment of talented individuals for the academic year 2023-2024.
          </p>
          <p>
            At E-Cell, we believe in empowering aspiring individuals to become exceptional
            communicators and influencers in the entrepreneurial ecosystem. As a part of
            our team, you will have the opportunity to engage with a diverse audience,
            promote entrepreneurship, and contribute to our vision of fostering innovation
            and creativity.
          </p>
          <iframe
            title="E-Cell Recruitment flyer"
            id="embedflyerad"
            src="https://drive.google.com/file/d/19YB9kfH2zjien5bIHzwV4qbkcNXrhtdM/preview"
          ></iframe>
          <div className="importantinstructionsrecuit">
            <h2>
              Important instructions. Please read thoroughly before filling the form.
            </h2>
          </div>
          <ul>
            {instructions.map((instruction, index) => {
              return <li key={index}>{instruction}</li>;
            })}
          </ul>
        </div>

        <div className={styles.techForm}>
          <form onSubmit={hanleSubmit}>
            <label htmlFor="name">
              Name:<span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="phone">
              Phone Number:<span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="999999999"
              onChange={(e) => setNumber(e.target.value)}
              required
            />
            <div className={styles.email}>
              <label htmlFor="email">
                Email:<span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="johnd_ug_23@mech.nits.ac.in"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button onClick={sendOtp}>Send Otp</button>
              <input
                type="text"
                placeholder="Your OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <label htmlFor="scholarId">
              ScholarId:<span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="scholarId"
              id="scholarId"
              placeholder="2311001"
              onChange={(e) => setScholarId(e.target.value)}
              required
            />
            <label htmlFor="domain">
              Domain:<span className={styles.required}>*</span>
            </label>
            <select name="domain" id="domain" onChange={(e) => setDomain(e.target.value)}>
              <option>Choose a domain</option>
              <option value="UI">UI/UX</option>
              <option value="Web">Web Development</option>
              <option value="Flutter">Flutter Development</option>
            </select>
            <label htmlFor="resume">
              Resume Link(Upload your resume on google drive and put the shareable link
              here ):<span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="resume"
              id="resume"
              placeholder="https://drive.google.com/something-something-something"
              onChange={(e) => setResumeUrl(e.target.value)}
              required
            />
            <label htmlFor="github">Github Profile Link:</label>
            <input
              type="text"
              name="github"
              id="github"
              placeholder="https://github.com/ruler45"
              onChange={(e) => setGithubUrl(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TechRecruit;
