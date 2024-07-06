import { useEffect, useState } from "react";
import styles from "./Submission.module.scss";
import { toast } from "react-toastify";
import axios from "axios";
import NavbarTeam from "../../components/shared/Navbar/NavbarTeam";
import Footer from "../../components/shared/Footer/Footer";

const TechRecruit = () => {
  const instructions = [
    "Use the email id you used during application.",
    "Check your Institute email inbox or SPAM folder for the otp.",
    "You can only fill this form once so please be attentive while filling the form.",
    "Keep checking your inbox for further instructions.",
    "Last date to submit the project is July 12th 2024 11:59pm.",
    "No late submissions will be entertained.",
  ];

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [scholarId, setScholarId] = useState("");
  const [domain, setDomain] = useState("");
  const [otp, setOtp] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [liveUrl, setWebDemoUrl] = useState("");
  const [videoUrl, setFlutterDemoUrl] = useState("");

  const [sendingOtp, setSendingOtp] = useState(false);
  const [checking, setChecking] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);

  useEffect(() => {
    document.title = "Project Submission | Tech Team | E-Cell NIT Silchar";
  });
  // Form submit
  const hanleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Invalid email id");
      return;
    }
    if (!email.includes("nits.ac.in")) {
      toast.error("Use only your Institute email id");
      return;
    }
    if (email.includes("_ug_23") === false) {
      toast.error(
        "This form is only for 2023-27 batch students. Please check the eligibility criteria."
      );
      return;
    }
    if (githubUrl === "") {
      toast.error("Github project link is required");
      return;
    }
    if (liveUrl === "" && domain === "Web") {
      toast.error("Live demo link is required for web domain");
      return;
    }
    if (videoUrl === "" && domain === "Flutter") {
      toast.error("Demo video link is required for Flutter domain");
      return;
    }
    const data = {
      name,
      number,
      email,
      scholarId,
      domain,
      githubUrl,
      liveUrl,
      videoUrl,
      resumeUrl,
    };
    try {
      setSubmittingForm(true);
      axios
        .post(`${import.meta.env.VITE_REACT_APP_RECRUIT_API}/submit`, data)
        .then((res) => {
          toast.success("Project submitted successfully");
          e.target.reset();
          console.log(res);
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
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to submit form");
        console.error("Failed to submit form", error);
      }
    } finally {
      setSubmittingForm(false);
    }
  };

  // Send OTP
  const sendOtp = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Invalid email id");
      return;
    }
    if (!email.includes("nits.ac.in")) {
      toast.error("Use only your Institute email id");
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
      .post(`${import.meta.env.VITE_REACT_APP_TECH_RECRUIT_API}/apply/sendOtp`, {
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
  const checkApplication = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Invalid email id");
      return;
    }
    if (!email.includes("nits.ac.in")) {
      toast.error("Use only your Institute email id");
      return;
    }
    const data = {
      email,
      otp,
    };
    console.log(data);
    try {
      setChecking(true);
      axios
        .post(
          `${import.meta.env.VITE_REACT_APP_RECRUIT_API}/submit/checkApplication`,
          data
        )
        .then((res) => {
          console.log(res);
          toast.success("Application found");
          setName(res.data.name);
          setNumber(res.data.number);
          setScholarId(res.data.scholarId);
          setDomain(res.data.domain);
          setResumeUrl(res.data.resumeUrl);
        })
        .catch((error) => {
          console.error("Failed to check application", error);
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error(error.response.data.message);
          }
        })
        .finally(() => {
          setChecking(false);
        });
    } catch (error) {
      console.error("Failed to check application", error);
    }
  };
  return (
    <div className={styles.TechRecruit}>
      <NavbarTeam />
      <div className="topbgrecuit">
        <h1 className="titlerecuit">Submission</h1>
        <h1 className="titlerecuit-for">of Project</h1>
        <h1 className="titlerecuit-tenure">
          for <span className="tenure-recuit">Tech Team</span>
        </h1>
      </div>

      <div className={styles.techContainer}>
        <div>
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
            <div className={styles.email}>
              <label htmlFor="email">
                Email:<span className={styles.required}>*</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                name="email"
                id="email"
                placeholder="johnd_ug_23@mech.nits.ac.in"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                autoComplete="off"
                type="text"
                placeholder="Your OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
              <div className={styles.btn_container}>
                <button onClick={sendOtp}>
                  {sendingOtp ? "Sending OTP..." : "Send OTP"}
                </button>
                <button onClick={checkApplication}>
                  {checking ? "Searching..." : "Check Application"}
                </button>
              </div>
            </div>
            <label htmlFor="name">
              Name:<span className={styles.required}>*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              value={name}
              required
              disabled
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="phone">
              Phone Number:<span className={styles.required}>*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              name="phone"
              id="phone"
              placeholder="999999999"
              value={number}
              disabled
              onChange={(e) => setNumber(e.target.value)}
              required
            />

            <label htmlFor="scholarId">
              Scholar Id:<span className={styles.required}>*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              name="scholarId"
              id="scholarId"
              placeholder="2311001"
              value={scholarId}
              onChange={(e) => setScholarId(e.target.value)}
              required
              disabled
            />
            <label htmlFor="domain">
              Domain:<span className={styles.required}>*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              name="doamin"
              id="domain"
              placeholder="Web"
              value={domain}
              required
              disabled
            />

            <label htmlFor="github">
              Github Project Link:<span className={styles.required}>*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              name="github"
              id="github"
              placeholder="https://github.com/ruler45/ecell-project"
              onChange={(e) => setGithubUrl(e.target.value)}
            />
            <label htmlFor="demo_web">Live Demo Link (Required for web domain):</label>
            <input
              autoComplete="off"
              type="text"
              name="demo_web"
              id="demo_web"
              placeholder="https://demolink.com"
              onChange={(e) => setWebDemoUrl(e.target.value)}
            />
            <label htmlFor="demo_flutter">
              Demo video Link for Flutter domain (Optional):
            </label>
            <small>
              Upload the video on gdrive and paste the publicaly accessible link here
            </small>
            <input
              autoComplete="off"
              type="text"
              name="demo_flutter"
              id="demo_flutter"
              placeholder="https://demolink.com"
              onChange={(e) => setFlutterDemoUrl(e.target.value)}
            />
            <small>
              Note: Make sure your project is public and you have added a README.md file
              with instructions to run the project.
            </small>
            <button type="submit">
              {submittingForm ? "Submitting..." : "Submit Project"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TechRecruit;
