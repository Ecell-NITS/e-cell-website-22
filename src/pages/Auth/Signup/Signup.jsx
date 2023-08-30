import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'
import NavbarTeam from '../../../components/shared/Navbar/NavbarTeam';
import Footer from '../../../components/shared/Footer/Footer';
const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [confirmpwd, setConfirmpwd] = useState("")
    const [signingup, setSigningup] = useState(false)
    const [verifyotp, setVerifyotp] = useState(false)
    const [otp, setOtp] = useState('');
    const [otpgoing, setOtpgoing] = useState(false)
    const [disablebtn, setDisablebtn] = useState(false)
    const [disablesendotp, setDisablesendotp] = useState(false)

    const [userimg, setUserimg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const [bio, setBio] = useState("Author")

    useEffect(() => {
        document.title = "Signup | E-Cell NIT Silchar"
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate])

    const isSignUpFormFilled = () => {
        return (
            name !== "" &&
            email !== "" &&
            password !== "" && otp !== "" && confirmpwd !== "" && bio !== "" && userimg !== ""
        );
    };

    const formhandlesubmit = async (e) => {
        e.preventDefault()

        console.log("isSignUpFormFilled:", isSignUpFormFilled());
        if (!isSignUpFormFilled()) {
            alert("Please fill all the required signup form fields");
            return;
        }

        if (confirmpwd !== password) {
            setMessage("! Passwords are not same.")
            setTimeout(() => {
                setMessage("")
            }, 5000)
            return
        }
        setDisablebtn(true)
        try {

            setVerifyotp(true)
            // const response = await axios.post(import.meta.env.VITE_REACT_APP_RECRUITMENT_VERIFYOTP, {
            // const response = await axios.post("http://localhost:2226/verify-otp", {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_APIMAIN}/verify-otp`, {
                otp, email
            });

            if (response.data.message === "OTP verified successfully") {


                console.log('OTP verified');
            } else {

                alert('Wrong OTP. Please try again');
                return;
            }
        } catch (error) {
            console.log('Error verifying OTP:', error);
            alert('Wrong OTP. Please try again');
            return
        } finally {
            setVerifyotp(false)
            setDisablebtn(false)
        }
        setDisablebtn(true)
        setSigningup(true)
        // axios.post('http://localhost:2226/signup', 
        axios.post(import.meta.env.VITE_REACT_APP_SIGNUP,
            { name, email, password, bio, userimg })
            .then(response => {
                console.log(response.data);
                setName("")
                setEmail("")
                setPassword("")
                setConfirmpwd("")
                setOtp("")
                setMessage(`Signup completed! You will be redirected to login page after 5 seconds.`)
                setTimeout(() => {
                    setMessage("")
                    navigate('/login');
                }, 5000)
                setSigningup(false)
                setDisablebtn(false)
            })
            .catch(error => {
                setName("")
                setEmail("")
                setPassword("")
                setConfirmpwd("")
                setOtp("")
                if (error.response && error.response.data.error === 'Email already exists') {
                    setMessage('Email already exists');
                } else if (error.response && error.response.data.error === 'Password should not be less than 8 characters') {
                    setMessage('Password cannot be less than 8 characters');
                }
                else {
                    setMessage('Signup failed. Please try again.');
                }
                setTimeout(() => {
                    setMessage("")
                }, 5000)
                setSigningup(false)
                setDisablebtn(false)
            });
    }


    const hangleGoToLogin = () => {
        navigate("/login")
    }

    const sendOTP = async (e) => {
        e.preventDefault()
        if (email === "") {
            alert("Please enter your email id");
            return;
        }

        try {
            setDisablesendotp(true)
            setOtpgoing(true);
            const response = await axios.post(
                // "http://localhost:2226/send-otp",
                `${import.meta.env.VITE_REACT_APP_APIMAIN}/send-otp`,
                {
                    email,
                }
            );
            if (response.status === 200) {
                alert('OTP sent successfully! Please check your inbox as well as SPAM folder.');
            }
        } catch (error) {
            console.log('Error sending OTP:', error);
            alert('An error occurred while sending the OTP');
        } finally {
            setOtpgoing(false);
            setDisablesendotp(false)
        }
    };

    return (
        <>
            <NavbarTeam />
            <div className='signuptopcont'>
                <div className="formcontsignup">
                    <h1 className='okwelcometoecell'>Welcome to E-Cell, NITS</h1>
                    <h4 className='enterdtlssignup'>Please enter your details.</h4>
                    <form className='formsignaccoutn'>
                        <div className="inputdicdignup">
                            <h3>Name</h3>
                            <input type="text" placeholder='Enter your Name' value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="inputdicdignup">
                            <h3>Email</h3>
                            <input type="email" placeholder='Enter your Email' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div style={{ display: "none" }}>
                            <div className="inputdicdignup">
                                <h3>Bio</h3>
                                <input type="text" placeholder='Enter your Bio' value={bio} onChange={e => setBio(e.target.value)} />
                            </div>

                            <div className="inputdicdignup">
                                <h3>Profile pic</h3>
                                <input type="text" placeholder='Enter your Profile img link' value={userimg} onChange={e => setUserimg(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <button onClick={sendOTP} disabled={disablesendotp || disablebtn} style={{ opacity: disablesendotp || disablebtn ? 0.5 : 1, cursor: disablesendotp || disablebtn ? "not-allowed" : "pointer" }} className='btnotpsend' id='newotpsending'>Send OTP</button>
                        </div>

                        {otpgoing && <p className='statusmsgssubmt'>Sending otp...Please be patient it might take 10 seconds.</p>}

                        <div className="inputdicdignup">
                            <h3>OTP</h3>
                            <input type="text" placeholder='Enter OTP' value={otp} onChange={e => setOtp(e.target.value)} />
                        </div>

                        <div className="inputdicdignup">
                            <h3>Password</h3>
                            <input type="password" placeholder='Enter Password' value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="inputdicdignup">
                            <h3>Confirm Password</h3>
                            <input type="password" placeholder='Confirm password' value={confirmpwd} onChange={e => setConfirmpwd(e.target.value)} />
                        </div>

                        <button type="submit" className='btnsubmittodb' onClick={formhandlesubmit} disabled={disablebtn || disablesendotp} style={{ opacity: disablebtn || disablesendotp ? 0.5 : 1, cursor: disablebtn || disablesendotp ? "not-allowed" : "pointer" }}>
                            {signingup ? "Creating account" : "Sign up"}
                        </button>

                        <div className="statusmeshs">
                            {message && <p className='msgaftersignuplogin'>{message}</p>}
                            {verifyotp && <p className='statusmsgssubmt'>Verifying otp...</p>}
                        </div>
                        <div className="bottomredirectlogin">
                            <h4 className='logexistingaccount'>Already have an account?</h4>
                            <button onClick={hangleGoToLogin} disabled={disablebtn || disablesendotp} style={{ cursor: disablebtn || disablesendotp ? "not-allowed" : "pointer" }}>Sign In</button>
                        </div>

                    </form>
                </div>

                <div className="imgbgholdersignup">
                    <img src="https://res.cloudinary.com/dp92qug2f/image/upload/v1686499643/Photo_zxxmw5.svg" alt="" />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Signup
