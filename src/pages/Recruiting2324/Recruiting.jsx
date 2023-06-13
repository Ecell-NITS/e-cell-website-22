import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from "moment-timezone";
import './Recruiting.css'
import NavbarTeam from '../../components/shared/Navbar/NavbarTeam';
import Footer from '../../components/shared/Footer/Footer';

const Recruiting = () => {
    const [name, setName] = useState("");
    const [mobileno, setMobileno] = useState("")
    const [whyecell, setWhyecell] = useState("");
    const [branch, setBranch] = useState("");
    const [team, setTeam] = useState("")
    const [techteam, setTechteam] = useState("");
    const [email, setEmail] = useState("");
    const [scholarId, setScholarId] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [emailVerification, setEmailVerification] = useState(false);
    const [scholarIdVerification, setScholarIdVerification] = useState(false);
    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(0);
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [otpVerification, setOtpVerification] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpgoing, setOtpgoing] = useState(false)
    const [verifyotp, setVerifyotp] = useState(false)
    const [poster, setPoster] = useState("")
    const [resume, setResume] = useState("")
    // const [project, setProject] = useState("")

    useEffect(() => {
        generateCaptchaNumbers();
    }, []);

    useEffect(() => {
        document.title = "Recruitment ECELL | NITS";
    }, []);

    const generateCaptchaNumbers = () => {
        const first = Math.floor(Math.random() * 20);
        const second = Math.floor(Math.random() * 20);
        setFirstNumber(first);
        setSecondNumber(second);
    };

    /* for multiple checkbox team selection */
    const handleTeamSelection = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setTeam((prevTeam) => [...prevTeam, value]);
        } else {
            setTeam((prevTeam) => prevTeam.filter((team) => team !== value));
        }
    };

    //checking if all required fiels are filled
    const isFormValid = () => {
        return (
            name !== "" &&
            email !== "" &&
            whyecell !== "" &&
            mobileno !== "" &&
            branch !== "" &&
            scholarId !== "" && resume !== "" && techteam !== ""
            // team.length > 0
            // poster !== ""
        );
    };

    const generateRandomNumbers = () => {
        const min = 1;
        const max = 10;
        const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
        const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
        setFirstNumber(num1);
        setSecondNumber(num2);
    };

    useEffect(() => {
        generateRandomNumbers();
    }, []);

    const createUser = async () => {

        // Check if all inputs are filled
        if (!isFormValid()) {
            alert("Please fill all the required fields");
            return;
        }

        if (!/^\d+$/.test(mobileno)) {
            alert("Mobile number should only contain numeric characters");
            return;
        }

        // Check if the math captcha is filled
        if (captchaAnswer === "") {
            alert("Please fill the captcha");
            return;
        }

        // Check if the math captcha answer is correct
        const actualAnswer = firstNumber + secondNumber;
        if (parseInt(captchaAnswer) !== actualAnswer) {
            alert("Captcha verification failed. Please try again.");
            return;
        }

        // Check if the OTP is filled
        if (otp === "") {
            alert("Please enter the OTP");
            return;
        }

        // Check if the name contains numeric or symbols
        if (/[\d!@#$%^&*(),.?":{}|<>]/.test(name)) {
            alert("Name should only contain alphabetic characters");
            return;
        }

        // // Check if the scholarId is valid
        // if (!/^221[1-6][01]\d{2}$/.test(scholarId) || (scholarId[3] === '1' && parseInt(scholarId.slice(-3)) > 157) || (scholarId[3] === '2' && parseInt(scholarId.slice(-3)) > 167) || (scholarId[3] === '3' && parseInt(scholarId.slice(-3)) > 167) || (scholarId[3] === '4' && parseInt(scholarId.slice(-3)) > 166) || (scholarId[3] === '5' && parseInt(scholarId.slice(-3)) > 84) || (scholarId[3] === '6' && parseInt(scholarId.slice(-3)) > 160)) {
        //     alert("Invalid scholar id");
        //     return;
        // }


        // Check if the email contains uppercase letters
        if (/[A-Z]/.test(email)) {
            alert("Email should be in lowercase");
            return;
        }

        // Check if the email contains symbols
        if (/[!#$%^&*(),?":{}|<>]/.test(email)) {
            alert("Email should not contain symbols");
            return;
        }

        // Check if the email contains symbols before the @ symbol
        const atIndex = email.indexOf("@");
        if (/[!@#$%^&*(),.?":{}|<>]/.test(email.slice(0, atIndex))) {
            alert("Email should not contain symbols before @ symbol");
            return;
        }

        // Check if the email is unique on the server i.e user already registered or not
        try {
            setEmailVerification(true); // Display "Verifying email" message
            const response = await axios.post(process.env.REACT_APP_RECRUITMENT_CHECKEMAIL, {
                // const response = await axios.post("http://localhost:3000/check-email", {
                email: email
            });
            setEmailVerification(false);
            if (!response.data.unique) {
                alert("Email already exist");
                return;
            }
        } catch (error) {
            console.log("Error checking email uniqueness:", error);
            alert("An error occurred while checking email uniqueness");
            return;
        }

        // check if scholar id is unique i.e user already registered or not
        try {
            setScholarIdVerification(true);
            const response = await axios.post(process.env.REACT_APP_RECRUITMENT_CHECKSCHOLARID, {
                // const response = await axios.post("http://localhost:3000/check-scholarid", {
                scholarId: scholarId
            });
            setScholarIdVerification(false);
            if (!response.data.unique) {
                alert("Scholar Id already exist");
                return;
            }
        } catch (error) {
            console.log("Error checking scholar id uniqueness:", error);
            alert("An error occurred while checking scholar id uniqueness");
            return;
        }

        //verifying otp if correct or not
        try {
            setVerifyotp(true)
            const response = await axios.post(process.env.REACT_APP_RECRUITMENT_VERIFYOTP, {
                // const response = await axios.post("http://localhost:8000/verify-otp", {
                otp,
            }, {
                withCredentials: true,
            });

            if (response.data.message === "OTP verified successfully") {
                // OTP verified successfully, proceed with form submission

                console.log('OTP verified');
            } else {
                // Wrong OTP entered
                alert('Wrong OTP. Please try again');
                return;
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.message === "No OTP found. Please generate a new OTP") {
                alert("No OTP found. Please generate a new OTP");
            }
            else {
                console.log('Error verifying OTP:', error);
                alert('Wrong OTP. Please try again');
            }
            return
        } finally {
            setVerifyotp(false)
        }

        // Check if the email matches the allowed domains i.e only institute emails are accepted
        // const emailRegex = /^.+22@(cse|civil|mech|ece|ee|ei)\.nits\.ac\.in$/;

        // if (!emailRegex.test(email)) {
        //     alert("Only first year's INSTITUTE email id are accepted.");
        //     return;
        // }

        //retrieve time in ist
        const timestamp = moment().tz("Asia/Kolkata").format();
        setSubmitting(true);
        axios

            .post(process.env.REACT_APP_RECRUITMENT_CREATE, {
                // .post('http://localhost:3001/createUser', {
                name,
                mobileno,
                whyecell,
                email,
                branch,
                scholarId,
                timestamp,
                // poster,
                resume, techteam
            })
            .then((response) => {
                setName("");
                setMobileno("");
                setWhyecell("");
                setEmail("");
                setBranch("");
                setScholarId("");
                setResume("")
                setCaptchaAnswer("");
                generateRandomNumbers()
                setOtp("")
                // setPoster("")
                // setProject("")
                // setTeam([]);
                setTechteam("")
                setSubmitting(false);
                alert("Form successfully submitted😍");
            });
    };

    const sendOTP = async () => {
        // Check if the email is empty i.e email mandatory
        if (email === "") {
            alert("Please enter your institute email id");
            return;
        }

        // Check if the email matches the allowed domains i.e only nits first years institute email are accepted
        // const emailRegex = /^.+22@(cse|civil|mech|ece|ee|ei)\.nits\.ac\.in$/;

        // if (!emailRegex.test(email)) {
        //     alert("Only first year's INSTITUTE email id are accepted.");
        //     return;
        // }

        try {
            setOtpgoing(true); // Display "Sending OTP" message
            const response = await axios.post(
                process.env.REACT_APP_RECRUITMENT_SENDOTP,
                // "http://localhost:8000/send-otp",
                {
                    email,
                }, {
                withCredentials: true,
            }
            );
            if (response.status === 200) {
                alert('OTP sent successfully! Please check your inbox as well as SPAM folder.');
                setOtpSent(true);
            }
        } catch (error) {
            console.log('Error sending OTP:', error);
            alert('An error occurred while sending the OTP');
        } finally {
            setOtpgoing(false);
        }
    };
    return (

        <>
            <NavbarTeam />
            <div className="topbgrecuit">
                <h1 className='titlerecuit'>Recruitment</h1>
                <h1 className='titlerecuit-for'>for</h1>
                <h1 className='titlerecuit-tenure'>2023-24 <span className='tenure-recuit'>Tenure</span></h1>
            </div>

            <div className="toprecuitcontent">
                <h2>Are you passionate about the entrepreneurial world and are looking for a platform to learn as well as showcase your knowledge? Look no further. The Entrepreneurship Cell (E-Cell) of NIT Silchar is thrilled to announce recruitment of talented individuals for the academic year 2023-2024.<br /><br />At E-Cell, we believe in empowering aspiring individuals to become exceptional communicators and influencers in the entrepreneurial ecosystem. As a part of our team, you will have the opportunity to engage with a diverse audience, promote entrepreneurship, and contribute to our vision of fostering innovation and creativity. </h2>
            </div>

            <div className="importantinstructionsrecuit">
                <h2>Important instructions. Please read thoroughly before filling the form.</h2>
                <ul>
                    <li>Only first year students of NITS are eligible to fill this form.</li>
                    <li>Use ONLY your Institute email id.</li>
                    <li>Check your Institute email inbox or SPAM folder for the otp.</li>
                    <li>It might take 10 seconds to send the otp, so please be patient.</li>
                    <li>You can only fill this form once so please be attentive while filling the form.</li>
                    <li>Give Google drive link of the resume and make sure it is <span style={{ color: "red" }}>accessible by anyone on the internet</span>. You can find a sample resume <a href="https://drive.google.com/file/d/1owqrOT6OxY1MKTh-tVp7hV31OohZcv-H/view?usp=drive_link" target='_blank' rel="noreferrer">here</a>.</li>
                    <li>In case of any issue while filling the form please contact <a style={{ color: "black" }} href="https://api.whatsapp.com/send/?phone=%2B919431875819&text&type=phone_number&app_absent=0" target='_blank' rel="noreferrer">here</a>.</li>
                    <li>Keep checking your inbox for further instructions.</li>
                    <li>Last date to fill the form is June <span style={{ color: "red" }}>13th</span> 2023 11:59pm.</li>
                </ul>
            </div>
            <div className='recruitingmain'>
                <h3 className='common-form-recuit'>Name<span className='reqdinput'>*</span></h3>
                <input
                    type="text"
                    placeholder="John Doe"
                    className='input-common-recruit'
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <h3 className='common-form-recuit'>Scholar ID<span className='reqdinput'>*</span></h3>
                <input
                    type="text"
                    className='input-common-recruit'
                    placeholder="Your Scholar id"
                    value={scholarId}
                    onChange={(event) => {
                        setScholarId(event.target.value);
                    }}
                />

                <h3 className='common-form-recuit'>Branch<span className='reqdinput'>*</span></h3>
                <div className='radioinptholder'>
                    <label className='radioinpt'>
                        <input
                            type="radio"
                            name="branch"
                            value="Civil"
                            checked={branch === "Civil"}
                            onChange={(event) => {
                                setBranch(event.target.value);
                            }}
                        />
                        Civil
                    </label>
                    <label className='radioinpt'>
                        <input
                            type="radio"
                            name="branch"
                            value="CSE"
                            checked={branch === "CSE"}
                            onChange={(event) => {
                                setBranch(event.target.value);
                            }}
                        />
                        CSE
                    </label>
                    <label className='radioinpt'>
                        <input
                            type="radio"
                            name="branch"
                            value="EE"
                            checked={branch === "EE"}
                            onChange={(event) => {
                                setBranch(event.target.value);
                            }}
                        />
                        EE
                    </label>

                    <label className='radioinpt'>
                        <input
                            type="radio"
                            name="branch"
                            value="ECE"
                            checked={branch === "ECE"}
                            onChange={(event) => {
                                setBranch(event.target.value);
                            }}
                        />
                        ECE
                    </label>

                    <label className='radioinpt'>
                        <input
                            type="radio"
                            name="branch"
                            value="EI"
                            checked={branch === "EI"}
                            onChange={(event) => {
                                setBranch(event.target.value);
                            }}
                        />
                        EI
                    </label>
                    <label className='radioinpt'>
                        <input
                            type="radio"
                            name="branch"
                            value="ME"
                            checked={branch === "ME"}
                            onChange={(event) => {
                                setBranch(event.target.value);
                            }}
                        />
                        ME
                    </label>
                </div>

                <h3 className='common-form-recuit'>WhatsApp Number<span className='reqdinput'>*</span></h3>
                <input
                    type="text"
                    placeholder="955698xxxx"
                    className='input-common-recruit'
                    value={mobileno}
                    onChange={(event) => {
                        setMobileno(event.target.value);
                    }}
                />

                <h3 className='common-form-recuit'>Email ID<span className='reqdinput'>*</span></h3>
                <input
                    type="email"
                    placeholder="Your Institute email"
                    className='input-common-recruit'
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />

                <div>
                    <button onClick={sendOTP} className='btnotpsend'>Send OTP to Institute email</button>
                </div>
                {otpgoing && <p className='statusmsgssubmt'>Sending otp...Please be patient it might take 10 seconds.</p>}

                <h3 className='common-form-recuit'>OTP<span className='reqdinput'>*</span></h3>
                <input
                    type="text"
                    className='input-common-recruit'
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(event) => {
                        setOtp(event.target.value);
                    }}
                />


                <h3 className='common-form-recuit'>Which domain in technical team of ECELL you want to apply for?<span className='reqdinput'>*</span></h3>
                <div className='radioinptholder'>
                    <label className='radioinpt'>
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

                    <label className='radioinpt'>
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

                    <label className='radioinpt'>
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



                {/* for checkbox multiple team selection */}
                {/* <h3 className='common-form-recuit'>Which team you want to apply for?<span className='reqdinput'>*</span></h3>
                <div className='radioinptholder'>
                    <label className='radioinpt'>
                        <input type="checkbox" name="team" value="UI" checked={team.includes("UI")}
                            onChange={handleTeamSelection} />
                        UI
                    </label>

                    <label className='radioinpt'>
                        <input type="checkbox" name='team' value="UX" checked={team.includes("UX")}
                            onChange={handleTeamSelection} />
                        UX
                    </label>
                </div> */}


                <h3 className='common-form-recuit'>Why do you want to join E-Cell?<span className='reqdinput'>*</span></h3>
                {/* <input
                    type="text"
                    className='input-common-recruit'
                    placeholder="Why do you want to be a part of ecell?"
                    value={whyecell}
                    onChange={(event) => {
                        setWhyecell(event.target.value);
                    }}
                /> */}

                <textarea typeof='text' rows="3" className='input-common-recruit'
                    placeholder="Why do you want to be a part of ecell?"
                    value={whyecell}
                    onChange={(event) => {
                        setWhyecell(event.target.value);
                    }}></textarea>


                <h3 className='common-form-recuit'>Resume Link (Upload in Google Drive)<span className='reqdinput'>*</span></h3>
                <input
                    type="text"
                    className='input-common-recruit'
                    placeholder="Your resume"
                    value={resume}
                    onChange={(event) => {
                        setResume(event.target.value);
                    }}
                />

                {/* <h3 className='common-form-recuit'>Task/Project Link (Upload in Google Drive in zip form or GitHub)<span className='reqdinput'>*</span></h3>
                <input
                    type="text"
                    placeholder="Your Project link"
                    className='input-common-recruit'
                    value={project}
                    onChange={(event) => {
                        setProject(event.target.value);
                    }}
                /> */}

                {/* <p>If you're applying for deisgn team then provide links of best 3 posters</p>
                <input type="text" placeholder='poster links only for candidate applying for design team'
                    value={poster}
                    onChange={(event) => {
                        setPoster(event.target.value);
                    }}
                /> */}

                <h3 className='common-form-recuit'>Prove you're not an robot<span className='reqdinput'>*</span></h3>
                <span className='robottxt'>{firstNumber} + {secondNumber} = </span>
                <span>
                    <input
                        type="text"
                        required
                        className=' robotinptt'
                        placeholder="Enter the answer"
                        value={captchaAnswer}
                        onChange={(event) => {
                            setCaptchaAnswer(event.target.value);
                        }}
                    />
                </span>

                <button onClick={createUser} className='submtformrecuit' >
                    {submitting ? "Submitting..." : "Submit"}{" "}
                </button>

                {emailVerification && <p className='statusmsgssubmt'>Verifying email...</p>}
                {scholarIdVerification && <p className='statusmsgssubmt'>Verifying Scholar Id...</p>}
                {verifyotp && <p className='statusmsgssubmt'>Verifying otp...</p>}
            </div>
            <Footer />
        </>
    )
}

export default Recruiting
