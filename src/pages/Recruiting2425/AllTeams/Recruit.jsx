import { useEffect, useState } from "react";
import Footer from "../../../components/shared/Footer/Footer";
import NavbarTeam from "../../../components/shared/Navbar/NavbarTeam";
import styles from "./TechRecruit.module.scss";
import { toast } from "react-toastify";
import axios from "axios";

const Recruit = () => {
  const instructions = [
    "Only first year students of NITS are eligible to fill this form.",
    "Use ONLY your Institute email id.",
    "Check your Institute email inbox or SPAM folder for the otp.",
    "You can apply for multiple teams but you can only apply for a single team in single submission.",
    "You can only fill this form once for a team so please be attentive while filling the form.",
    "Keep checking your inbox for further instructions.",
    "Last date to fill the form is June 30th 2024 11:59pm.",
  ];

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [scholarId, setScholarId] = useState("");
  const [teams, setTeams] = useState([]);
  const [resumeUrl, setResumeUrl] = useState("");
  const [WhyEcell, setWhyEcell] = useState("");
  const [otp, setOtp] = useState("");

  const [sendingOtp, setSendingOtp] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);

  const availableteams = [
    {
      name: "Curation",
      id: 5,
    },
    {
      name: "Design",
      id: 6,
    },
    {
      name: "Event",
      id: 7,
    },
    {
      name: "Content",
      id: 8,
    },
    {
      name: "Publicity",
      id: 9,
    },
    {
      name: "Marketing",
      id: 10,
    },
    {
      name: "Collaboration",
      id: 11,
    },
  ];
  useEffect(() => {
    document.title = "Join Us | E-Cell NIT Silchar";
  });

  // Teams logic
  const handleTeam = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setTeams((prevTeams) => [...prevTeams, value]);
    } else {
      setTeams((prevTeams) => prevTeams.filter((team) => team !== value));
    }
  };
  // Form submit
  const hanleSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      number === "" ||
      email === "" ||
      scholarId === "" ||
      teams === null ||
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
    if (teams === null) {
      toast.error("Select atleast 1 team");
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
      teams,
      resumeUrl,
      WhyEcell,
      otp,
    };
    console.log(data);

    try {
      setSubmittingForm(true);
      axios
        .post(`${import.meta.env.VITE_REACT_APP_RECRUIT_API}/apply`, data)
        .then((response) => {
          toast.success(
            "Form submitted successfully in teams:",
            response.data.teams.map((team) => team.name)
          );
          e.target.reset();
        })
        .catch((error) => {
          console.error("Failed to submit form", error);
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Failed to submit form");
          }
        })
        .finally(() => {
          setSubmittingForm(false);
        });
    } catch (error) {
      console.error("Failed to submit form", error);
      toast.error("Failed to submit form");
      setSubmittingForm(false);
    }
  };

  // Send OTP
  const sendOtp = (e) => {
    e.preventDefault();
    if (email === "" || !email.includes("@") || !email.includes("nits.ac.in")) {
      toast.error("Invalid email id");
      return;
    }
    if (email.includes("_ug_23") === false) {
      toast.error(
        "This form is only for 2023-27 batch students. Please check the eligibility criteria."
      );
      return;
    }
    setSendingOtp(true);
    axios
      .post(`${import.meta.env.VITE_REACT_APP_RECRUIT_API}/apply/sendOtp`, {
        email,
      })
      .then((response) => {
        toast.success("OTP sent successfully");
      })
      .catch((error) => {
        console.error("Failed to send OTP", error);
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to send OTP");
        }
      })
      .finally(() => {
        setSendingOtp(false);
      });
  };
  return (
    <div className={styles.TechRecruit}>
      <NavbarTeam />
      <div className="topbgrecuit">
        <h1 className="titlerecuit">Recruitment</h1>
        <h1 className="titlerecuit-for">for</h1>
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
            recruitment of talented individuals for the academic year 2024-2025.
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
            src="https://drive.google.com/file/d/1F16vpTFBHGWX73xJGYxurRg36eXj0aZt/preview"
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
            <li>
              In case of any issue while filling the form please contact{" "}
              <a
                style={{ color: "black" }}
                href="https://api.whatsapp.com/send/?phone=%2B916295265705&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
              .
            </li>
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
              <button onClick={sendOtp} disabled={sendingOtp}>
                {sendingOtp ? "Sending OTP..." : "Send OTP"}
              </button>
              <input
                type="text"
                placeholder="Your OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <label htmlFor="scholarId">
              Scholar Id:<span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="scholarId"
              id="scholarId"
              placeholder="2311001"
              onChange={(e) => setScholarId(e.target.value)}
              required
            />
            <label htmlFor="teams">
              Teams:<span className={styles.required}>*</span>
            </label>
            <div className={styles.teams}>
              {availableteams.map((team) => (
                <div key={team.name} className={styles.teams_item}>
                  <input
                    type="checkbox"
                    name={team.name}
                    onChange={handleTeam}
                    value={team.name}
                  />{" "}
                  <label htmlFor="Event">{team.name}</label>
                </div>
              ))}
            </div>
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
            <label htmlFor="github">
              Why do you want join E-cell?:<span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="github"
              id="github"
              placeholder="Your reason to join E-cell"
              onChange={(e) => setWhyEcell(e.target.value)}
            />
            <button type="submit" disabled={submittingForm}>
              {submittingForm ? "Applying..." : "Apply"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recruit;
