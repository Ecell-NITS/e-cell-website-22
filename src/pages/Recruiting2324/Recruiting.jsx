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
    const [project, setProject] = useState("")

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

    //checking if all required fiels are filled
    const isFormValid = () => {
        return (
            name !== "" &&
            email !== "" &&
            whyecell !== "" &&
            mobileno !== "" &&
            branch !== "" &&
            scholarId !== "" && resume !== "" && project !== ""
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

        // Check if the scholarId is valid
        if (!/^221\d{4}$/.test(scholarId)) {
            alert("Invalid scholar id");
            return;
        }

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
                // const response = await axios.post("http://localhost:3000/verify-otp", {
                otp,
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
            console.log('Error verifying OTP:', error);
            alert('Wrong OTP. Please try again');
            return
        } finally {
            setVerifyotp(false)
        }

        // Check if the email matches the allowed domains i.e only institute emails are accepted
        const allowedDomains = [
            "cse.nits.ac.in",
            "civil.nits.ac.in",
            "me.nits.ac.in",
            "ece.nits.ac.in",
            "ee.nits.ac.in",
            "ei.nits.ac.in",
        ];
        const domain = email.split("@")[1];

        if (!allowedDomains.includes(domain)) {
            alert("Only nits insitute email accepted.");
            return;
        }

        //retrieve time in ist
        const timestamp = moment().tz("Asia/Kolkata").format();
        setSubmitting(true);
        axios

            .post(process.env.REACT_APP_RECRUITMENT_CREATE, {
                // .post('http://localhost:3000/createUser', {
                name,
                mobileno,
                whyecell,
                email,
                branch,
                scholarId,
                timestamp,
                poster,
                resume, project
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
                setPoster("")
                setProject("")
                setSubmitting(false);
                alert("User created 😍");
            });
    };

    const sendOTP = async () => {
        // Check if the email is empty i.e email mandatory
        if (email === "") {
            alert("Please enter your institute email id");
            return;
        }

        // Check if the email matches the allowed domains i.e only nits institute email are accepted
        const allowedDomains = [
            "cse.nits.ac.in",
            "civil.nits.ac.in",
            "me.nits.ac.in",
            "ece.nits.ac.in",
            "ee.nits.ac.in",
            "ei.nits.ac.in",
        ];
        const domain = email.split("@")[1];

        if (!allowedDomains.includes(domain)) {
            alert("Only NITS institute email is accepted.");
            return;
        }

        try {
            setOtpgoing(true); // Display "Sending OTP" message
            const response = await axios.post(
                process.env.REACT_APP_RECRUITMENT_SENDOTP,
                // "http://localhost:3000/send-otp",
                {
                    email,
                }
            );
            if (response.status === 200) {
                alert('OTP sent successfully! Please check your inbox as well as spam folder.');
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
                <h2>Lorem ipsum dolor sit amet consectetur. Malesuada mauris auctor nisl pellentesque facilisis ornare euismod sit. Fermentum velit cras sed nullam maecenas tincidunt gravida fringilla augue. Dignissim tellus scelerisque a sem penatibus lacus diam quis. Tempus dui enim neque pretium posuere blandit. Cras nullam vulputate eleifend vitae enim morbi adipiscing. Habitasse vestibulum eget sed sed risus sed sed. </h2>
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
                {otpgoing && <p className='statusmsgssubmt'>Sending otp...</p>}

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

                <h3 className='common-form-recuit'>Why do you want to join E-Cell?<span className='reqdinput'>*</span></h3>
                <input
                    type="text"
                    className='input-common-recruit'
                    placeholder="Why do you want to be a part of ecell?"
                    value={whyecell}
                    onChange={(event) => {
                        setWhyecell(event.target.value);
                    }}
                />


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

                <h3 className='common-form-recuit'>Task/Project Link (Upload in Google Drive in zip form or GitHub)<span className='reqdinput'>*</span></h3>
                <input
                    type="text"
                    placeholder="Your Project link"
                    className='input-common-recruit'
                    value={project}
                    onChange={(event) => {
                        setProject(event.target.value);
                    }}
                />

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