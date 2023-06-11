import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [confirmpwd, setConfirmpwd] = useState("")
    const [signingup, setSigningup] = useState(false)
    


    useEffect(() => {
        document.title = "Signup | ECELL NITS"
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate])

   

    const isSignUpFormFilled = () => {
        return (
            name !== "" &&
            email !== "" &&
            password !== ""
        );
    };

    const formhandlesubmit = (e) => {
        e.preventDefault()

        if (!isSignUpFormFilled()) {
            alert("Please fill all the required signup form fields");
            return;
        }

        if (confirmpwd !== password) {
            setMessage("Passwords are not same.")
            return
        }

        setSigningup(true)
        // axios.post('http://localhost:2226/signup', 
        axios.post(process.env.REACT_APP_SIGNUP,
            { name, email, password })
            .then(response => {
                console.log(response.data);
                setName("")
                setEmail("")
                setPassword("")
                setConfirmpwd("")
                setMessage(`Signup completed! You will be redirected to login page after 5 seconds.`)
                setTimeout(() => {
                    setMessage("")
                    navigate('/login');
                }, 5000)
                setSigningup(false)
            })
            .catch(error => {
                setName("")
                setEmail("")
                setPassword("")
                setConfirmpwd("")
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
            });
    }


    return (
        <>
            <h1>Sign up</h1>
            <form onSubmit={formhandlesubmit}>
                <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />

                <input type="password" placeholder='Confirm password' value={confirmpwd} onChange={e => setConfirmpwd(e.target.value)} />
                <button type="submit">
                    {signingup ? "Creating account" : "Sign up"}
                </button>
            </form>
            {message && <p>{message}</p>}
        </>
    )
}

export default Signup