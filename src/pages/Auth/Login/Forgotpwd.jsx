import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarTeam from '../../../components/shared/Navbar/NavbarTeam';
import Footer from '../../../components/shared/Footer/Footer';
const Forgotpwd = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [otp, setOtp] = useState("")
    const [newpwd0, setNewpwd0] = useState("")
    const [confirmnewpwd0, setConfirmnewpwd0] = useState("")
    const [disable, setDisable] = useState(false)
    const [sendingotp, setSendingotp] = useState(false)
    const [showverify, setShowVerify] = useState(false)
    const [showsendotp, setShowsendotp] = useState(true)
    const [settingnewpwd, setSettingnewpwd] = useState(false)
    const [displayotpentered, setDisplayotpentered] = useState(false)
    const [disableverify, setDisableverify] = useState(false)
    const [disablepwdchanging, setDisablepwdchanging] = useState(false)
    useEffect(() => {
        document.title = 'Reset Password | ECELL NITS';
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handlelogin = (e) => {
        e.preventDefault()
        if (!email) {
            setMessage('Please fill your email.');
            return;
        }

        setDisable(true)
        setSendingotp(true)
        axios.post(`${import.meta.env.VITE_REACT_APP_APIMAIN}/forgotpwd`,
        // axios.post('http://localhost:2226/forgotpwd',
            
            { email })
            .then(response => {
                setMessage(`Email with the otp sent to ${email}.`)
                setEmail("")
                setDisable(false)
                setShowVerify(true)
                setShowsendotp(false)
                setSendingotp(false)
                setEmail(response.data.email)
            })
            .catch(error => {
                if (error.response && error.response.data.error === "No account with this email found.") {
                    setMessage(`No account with ${email} found.`)
                    setTimeout(() => {
                        setMessage("")
                    }, 5000)
                    setEmail("")
                    setDisable(false)
                    setShowVerify(false)
                    setShowsendotp(true)
                    setSendingotp(false)
                }
                else {
                    setMessage(error);
                    setDisable(false)
                    setShowVerify(false)
                    setShowsendotp(true)
                    setSendingotp(false)
                }
            }
            )
    }



    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        setDisableverify(true)
        try {
            
            // const response = await axios.post("http://localhost:2226/verifyotpresetpwd", {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_APIMAIN}/verifyotpresetpwd`, {
                otp, email
            });

            if (response.data.message === "OTP verified successfully") {
                setSettingnewpwd(true)
                setDisplayotpentered(true)
                setDisableverify(false)
            } else {
                setMessage('Wrong OTP. Please try again');
                setTimeout(() => {
                    setMessage("")
                }, 5000)
                setSettingnewpwd(false)
                setDisplayotpentered(false)
                setDisableverify(false)
                return;
            }
        } catch (error) {
            console.log('Error verifying OTP:', error);
            setMessage('Wrong OTP. Please try again');
            setTimeout(() => {
                setMessage("")
            }, 5000)
            setSettingnewpwd(false)
            setDisplayotpentered(false)
            setDisableverify(false)
            return
        } 
    }

    const handleFinalPwd = async (e) => {
        e.preventDefault()
        setDisablepwdchanging(true)
        try {
            // await axios.put("http://localhost:2226/changingpwd", { email, newpwd0, confirmnewpwd0 })
            await axios.put(`${import.meta.env.VITE_REACT_APP_APIMAIN}/changingpwd`, { email, newpwd0, confirmnewpwd0 })
                .then(() => {
                    setConfirmnewpwd0("")
                    setNewpwd0("")
                    alert(`Password for the ${email} successfully changed.`)
                    setDisablepwdchanging(false)
                    navigate("/login")
                })
        } catch (error) {
            if (error.response && error.response.data.error === "Password can't be empty.") {
                alert("Password can't be empty.")
                setDisablepwdchanging(false)
            }
            else if (error.response && error.response.data.error === "User not found") {
                setMessage("User not found")
                setDisablepwdchanging(false)
            } else if (error.response && error.response.data.error === "New Password should not be less than 8 characters") {
                alert("New Password should not be less than 8 characters")
                setDisablepwdchanging(false)
            } else if (error.response && error.response.data.error === "Passwords must match") {
                alert("Passwords must match")
                setDisablepwdchanging(false)
            } else {
                setMessage(error)
                setDisablepwdchanging(false)
            }
        }

    }
    return (
        <>
            <NavbarTeam />
            <div className='signuptopcont'>
                <div className="formcontsignup">
                    <h1 className='okwelcometoecell'>Forgot your Password?</h1>
                    <h4 className='enterdtlssignup'>No worries. Please enter your email.</h4>
                    <div className='formsignaccoutn'>
                        <div style={{ display: showsendotp ? "block" : "none" }}>
                            <div className="inputdicdignup">
                                <h3>Email</h3>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <button onClick={handlelogin} disabled={disable} style={{ opacity: disable ? 0.5 : 1, cursor: disable ? "not-allowed" : "pointer" }} className='btnsubmittodb' type="submit">
                                {sendingotp ? "Sending OTP..." : "Send OTP"}
                            </button>
                        </div>

                        {message && <p className='msgaftersignuplogin'>{message}</p>}

                        <div style={{ display: displayotpentered ? "none" : "initial" }} >
                            {showverify && (
                                <div style={{ display: "block" }}>
                                    <div className="inputdicdignup">
                                        <h3>OTP</h3>
                                        <input
                                            type="text"
                                            placeholder="Enter otp"
                                            value={otp}
                                            onChange={e => setOtp(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        onClick={handleVerifyOtp}
                                        disabled={disableverify}
                                        style={{
                                            opacity: disableverify ? 0.5 : 1,
                                            cursor: disableverify ? "not-allowed" : "pointer"
                                        }}
                                        className="btnsubmittodb"
                                        type="submit"
                                    >
                                        Verify Otp
                                    </button>
                                </div>
                            )}
                        </div>


                        {settingnewpwd && (
                            <div style={{ display: "block" }}>

                                <div className="inputdicdignup">
                                    <h3>New Password</h3>
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={newpwd0}
                                        onChange={e => setNewpwd0(e.target.value)}
                                    />
                                </div>
                                <div className="inputdicdignup">
                                    <h3>Confirm New Password</h3>
                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={confirmnewpwd0}
                                        onChange={e => setConfirmnewpwd0(e.target.value)}
                                    />
                                </div>
                                <button disabled={disablepwdchanging} style={{
                                    opacity: disablepwdchanging ? 0.5 : 1,
                                    cursor: disablepwdchanging ? "not-allowed" : "pointer"
                                }} onClick={handleFinalPwd} className="btnsubmittodb" type="submit">
                                    Change Password
                                </button>
                            </div>
                        )}

                    </div>
                </div>

                <div className="imgbgholdersignup">
                    <img src="https://res.cloudinary.com/dp92qug2f/image/upload/v1686499643/Photo_zxxmw5.svg" alt="" />
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Forgotpwd
