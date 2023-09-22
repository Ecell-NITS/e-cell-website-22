import React, { useState, useEffect } from "react";
import NavbarTeam from "../../components/shared/Navbar/NavbarTeam";
import axios from "axios";
import Footer from "../../components/shared/Footer/Footer";
import { toast } from "react-toastify";
const Techsubmission = () => {
  useEffect(() => {
    document.title = "Phase 1 Project Submission | Techincal Team Recuitment 2023-24";
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scholarId, setScholarId] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [otpgoing, setOtpgoing] = useState(false);
  const [stopotp, setStopotp] = useState(false);
  const [otp, setOtp] = useState("");
  const [techteam, setTechteam] = useState("");
  const [project, setProject] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailVerification, setEmailVerification] = useState(false);
  const [scholarIdVerification, setScholarIdVerification] = useState(false);
  const [verifyotp, setVerifyotp] = useState(false);
  const [stopsubmit, setStopsubmit] = useState(false);

  //checking if all required fiels are filled
  const isFormValid = () => {
    return (
      name !== "" &&
      email !== "" &&
      mobileno !== "" &&
      scholarId !== "" &&
      project !== "" &&
      techteam !== "" &&
      otp !== ""
    );
  };

  /* sending otp function */
  const sendOTP = async () => {
    if (email === "") {
      toast.error("Please enter your institute email id", {
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

    const emailRegex = /^.+22@(cse|civil|mech|ece|ee|ei)\.nits\.ac\.in$/;
    if (!emailRegex.test(email)) {
      toast.error("Only first year's INSTITUTE email id are accepted.", {
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

    try {
      setOtpgoing(true); // Display "Sending OTP" message
      setStopotp(true);
      const response = await axios.post(
        // import.meta.env.VITE_REACT_APP_RECRUITMENT_SENDOTP,
        // "http://localhost:4689/send-otp",
        `${import.meta.env.VITE_REACT_APP_PROJECTSUBMISSION_API}/send-otp`,
        {
          email,
        }
      );
      if (response.status === 200) {
        toast.success(
          "OTP sent successfully! Please check your inbox as well as SPAM folder.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }
    } catch (error) {
      console.log("Error sending OTP:", error);
      toast.error("An error occurred while sending the OTP", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setOtpgoing(false);
      setStopotp(false);
    }
  };

  /* Submit btn onClick function*/
  const submitbtn = async () => {
    if (!isFormValid()) {
      toast.error("Please fill all the required fields.", {
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

    // Check if the scholarId is valid
    if (
      !/^221[1-6][01]\d{2}$/.test(scholarId) ||
      (scholarId[3] === "1" && parseInt(scholarId.slice(-3)) > 157) ||
      (scholarId[3] === "2" && parseInt(scholarId.slice(-3)) > 167) ||
      (scholarId[3] === "3" && parseInt(scholarId.slice(-3)) > 167) ||
      (scholarId[3] === "4" && parseInt(scholarId.slice(-3)) > 166) ||
      (scholarId[3] === "5" && parseInt(scholarId.slice(-3)) > 84) ||
      (scholarId[3] === "6" && parseInt(scholarId.slice(-3)) > 160)
    ) {
      toast.error("Invalid scholar id", {
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

    /* Checking if email belongs to first year students od nits*/
    const emailRegex = /^.+22@(cse|civil|mech|ece|ee|ei)\.nits\.ac\.in$/;

    if (!emailRegex.test(email)) {
      toast.error("Only first year's INSTITUTE email id are accepted.", {
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

    // Check if the email is unique on the server
    try {
      setEmailVerification(true); // Display "Verifying email" message
      setStopsubmit(true);
      // const response = await axios.post(import.meta.env.VITE_REACT_APP_RECRUITMENT_CHECKEMAIL, {
      // const response = await axios.post("http://localhost:4689/check-email", {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_PROJECTSUBMISSION_API}/check-email`,
        {
          email: email,
        }
      );

      if (!response.data.unique) {
        toast.error("Email already exist", {
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
    } catch (error) {
      console.log("Error checking email uniqueness:", error);
      toast.error("An error occurred while checking email uniqueness", {
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
    } finally {
      setEmailVerification(false);
      setStopsubmit(false);
    }

    // check if scholar id is unique
    try {
      setScholarIdVerification(true);
      setStopsubmit(true);
      // const response = await axios.post(import.meta.env.VITE_REACT_APP_RECRUITMENT_CHECKSCHOLARID, {
      // const response = await axios.post("http://localhost:4689/check-scholarid", {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_PROJECTSUBMISSION_API}/check-scholarid`,
        {
          scholarId: scholarId,
        }
      );

      if (!response.data.unique) {
        toast.error("Scholar Id already exist", {
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
    } catch (error) {
      console.log("Error checking scholar id uniqueness:", error);
      toast.error("An error occurred while checking scholar id uniqueness", {
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
    } finally {
      setScholarIdVerification(false);
      setStopsubmit(false);
    }

    try {
      setVerifyotp(true);
      setStopsubmit(true);
      // const response = await axios.post(import.meta.env.VITE_REACT_APP_RECRUITMENT_VERIFYOTP, {
      // const response = await axios.post("http://localhost:4689/verify-otp", {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_PROJECTSUBMISSION_API}/verify-otp`,
        {
          otp,
          email,
        }
      );

      if (response.data.message === "OTP verified successfully") {
        console.log("OTP verified");
      } else {
        toast.error("Wrong OTP. Please try again", {
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
    } catch (error) {
      console.log("Error verifying OTP:", error);
      toast.error("Wrong OTP. Please try again", {
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
    } finally {
      setVerifyotp(false);
      setStopsubmit(false);
    }

    setSubmitting(true);
    setStopsubmit(true);
    axios
      // .post(import.meta.env.VITE_REACT_APP_RECRUITMENT_CREATE, {
      .post(`${import.meta.env.VITE_REACT_APP_PROJECTSUBMISSION_API}/submitform`, {
        // .post('http://localhost:4689/submitform', {
        name,
        mobileno,
        email,
        scholarId,
        project,
        techteam,
      })
      .then((response) => {
        setName("");
        setMobileno("");
        setEmail("");
        setScholarId("");
        setOtp("");
        setTechteam("");
        setProject("");
        setSubmitting(false);
        setStopsubmit(false);
        toast.success("Form successfully submitted.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <>
      <NavbarTeam />

      <div className="topbgrecuit">
        <h1 className="titlerecuit">Phase 1</h1>
        <h1 className="titlerecuit-for">Project</h1>
        <h1 className="titlerecuit-tenure">Submission</h1>
      </div>

      <div className="importantinstructionsrecuit">
        <h2>Important instructions. Please read thoroughly before filling the form.</h2>
        <ul>
          <li>Use ONLY your Institute email id.</li>
          <li>Check your Institute email inbox or SPAM folder for the otp.</li>
          <li>
            You can only fill this form once so please be attentive while filling the
            form.
          </li>

          <li>
            In case of any issue while filling the form please contact{" "}
            <a
              style={{ color: "black" }}
              href="https://api.whatsapp.com/send/?phone=%2B919431875819&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </li>

          <li>
            Last date to fill the project submission form is June{" "}
            <span style={{ color: "red" }}>23rd</span> 2023 11:59pm.
          </li>
          <li>
            For Web D & Flutter domain: You have to provide only{" "}
            <span style={{ color: "red" }}>Public Github link</span> of the project.
          </li>
          <li>
            For UI/UX domain: You have to submit the{" "}
            <span style={{ color: "red" }}>figma file link</span>, not the prototype link.
          </li>
        </ul>
      </div>

      <div className="recruitingmain">
        <h3 className="common-form-recuit">
          Name<span className="reqdinput">*</span>
        </h3>
        <input
          type="text"
          placeholder="Your name"
          className="input-common-recruit"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <h3 className="common-form-recuit">
          Scholar ID<span className="reqdinput">*</span>
        </h3>
        <input
          type="text"
          className="input-common-recruit"
          placeholder="Your Scholar id"
          value={scholarId}
          onChange={(event) => {
            setScholarId(event.target.value);
          }}
        />

        <h3 className="common-form-recuit">
          WhatsApp Number<span className="reqdinput">*</span>
        </h3>
        <input
          type="text"
          placeholder="Your Whatsapp number"
          className="input-common-recruit"
          value={mobileno}
          onChange={(event) => {
            setMobileno(event.target.value);
          }}
        />

        <h3 className="common-form-recuit">
          Email ID<span className="reqdinput">*</span>
        </h3>
        <input
          type="email"
          placeholder="Your Institute email"
          className="input-common-recruit"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <div>
          <button
            onClick={sendOTP}
            className="btnotpsend"
            disabled={stopotp || stopsubmit}
            style={{
              opacity: stopotp || stopsubmit ? 0.5 : 1,
              cursor: stopotp || stopsubmit ? "not-allowed" : "pointer",
            }}
          >
            Send OTP to Institute email
          </button>
        </div>
        {otpgoing && <p className="statusmsgssubmt">Sending otp</p>}

        <h3 className="common-form-recuit">
          OTP<span className="reqdinput">*</span>
        </h3>
        <input
          type="text"
          className="input-common-recruit"
          placeholder="Enter OTP"
          value={otp}
          onChange={(event) => {
            setOtp(event.target.value);
          }}
        />

        <h3 className="common-form-recuit">
          Which domain in technical team of ECELL you had applied for?
          <span className="reqdinput">*</span>
        </h3>
        <div className="radioinptholder">
          <label className="radioinpt">
            <input
              type="radio"
              name="techteam"
              value="Web Development"
              checked={techteam === "Web Development"}
              onChange={(event) => {
                setTechteam(event.target.value);
              }}
            />
            Web Development
          </label>

          <label className="radioinpt">
            <input
              type="radio"
              name="techteam"
              value="UI/UX"
              checked={techteam === "UI/UX"}
              onChange={(event) => {
                setTechteam(event.target.value);
              }}
            />
            UI/UX
          </label>

          <label className="radioinpt">
            <input
              type="radio"
              name="techteam"
              value="Flutter"
              checked={techteam === "Flutter"}
              onChange={(event) => {
                setTechteam(event.target.value);
              }}
            />
            Flutter
          </label>
        </div>

        <h3 className="common-form-recuit">
          Github/Figma Project link<span className="reqdinput">*</span>
        </h3>
        <input
          type="text"
          className="input-common-recruit"
          placeholder="Your github repo should be public"
          value={project}
          onChange={(event) => {
            setProject(event.target.value);
          }}
        />

        <button
          onClick={submitbtn}
          className="submtformrecuit"
          disabled={stopotp || stopsubmit}
          style={{
            opacity: stopotp || stopsubmit ? 0.5 : 1,
            cursor: stopotp || stopsubmit ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Submitting..." : "Submit"}{" "}
        </button>

        {emailVerification && <p className="statusmsgssubmt">Verifying email...</p>}
        {scholarIdVerification && (
          <p className="statusmsgssubmt">Verifying Scholar Id...</p>
        )}
        {verifyotp && <p className="statusmsgssubmt">Verifying otp...</p>}
      </div>
      <Footer />
    </>
  );
};

export default Techsubmission;
