import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarTeam from '../../../components/shared/Navbar/NavbarTeam';
import Footer from '../../../components/shared/Footer/Footer';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loggingin, setLoggingin] = useState(false)
    const [disablelogin, setDisablelogin] = useState(false)
    useEffect(() => {
        document.title = 'Login | ECELL NITS';
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);


    const handlelogin = (e) => {

        e.preventDefault()
        if (!email || !password) {
            setMessage('Please fill all required fields');
            return;
        }

        setDisablelogin(true)
        setLoggingin(true)
        // axios.post('http://localhost:2226/login', 
        axios.post(process.env.REACT_APP_LOGIN,
            { email, password })
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                // setMessage(response.data.message);
                // setMessage(`Welcome, ${email}`);

                navigate('/dashboard')
                // setTimeout(() => {
                //     navigate('/dashboard')
                // },3000)
                setLoggingin(false)
                setDisablelogin(false)
            })
            .catch(error => {
                if (error.response) {
                    setMessage(error.response.data.error);
                    setTimeout(() => {
                        setMessage("")
                    }, 5000)
                    setEmail("")
                    setPassword("")
                } else {
                    setMessage('Login failed. Please try again.');
                }
                setLoggingin(false)
                setDisablelogin(false)
            });
    }

    const HandleSignupMove = () => {
        navigate("/signup")
    }

    const handleForgetPwd = () => {
        navigate("/forgot password")
    }
    
    return (
        <>
            <NavbarTeam />
            <div className='signuptopcont'>
                <div className="formcontsignup">
                    <h1 className='okwelcometoecell'>Welcome back</h1>
                    <h4 className='enterdtlssignup'>Please enter your details.</h4>
                    <form onSubmit={handlelogin} className='formsignaccoutn'>
                        <div className="inputdicdignup">
                            <h3>Email</h3>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="inputdicdignup">
                            <h3>Password</h3>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                              
                        </div>
                     
                        <div className="inputdicdignup" id='fogtpwd'>
                            <span style={{cursor:"pointer"}} onClick={handleForgetPwd}>Forgot Password</span>
                        </div>

                        <button className='btnsubmittodb' type="submit" disabled={disablelogin} style={{ opacity: disablelogin ? 0.5 : 1, cursor: disablelogin ? "not-allowed" : "pointer" }}>
                            {loggingin ? "Signing in" : "Sign in"}
                        </button>
                        {message && <p className='msgaftersignuplogin'>{message}</p>}
                        <div className="bottomredirectlogin">
                            <h4 className='logexistingaccount'>Don’t have an account?</h4>
                            <button onClick={HandleSignupMove} disabled={disablelogin} style={{ cursor: disablelogin ? "not-allowed" : "pointer" }}>Sign Up</button>
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

export default Login
