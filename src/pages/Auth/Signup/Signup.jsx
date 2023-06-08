import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
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

        // Send a POST request to the backend API
        axios.post('http://localhost:2226/signup', { name, email, password })
            .then(response => {
                console.log(response.data); // Handle the response from the server
                setName("")
                setEmail("")
                setPassword("")
                setMessage("Signup completed! You will be redirected to login page after 5 seconds.")
                setTimeout(() => {
                    setMessage("")
                    navigate('/login');
                }, 5000)
            })
            .catch(error => {
                setName("")
                setEmail("")
                setPassword("")
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

            });
    }

    useEffect(() => {
        document.title = "Signup | ECELL NITS"
    }, [])

    return (
        <>
            <h1>Sign up</h1>
            <form onSubmit={formhandlesubmit}>
                <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Sign up</button>
            </form>
            {message && <p>{message}</p>}
        </>
    )
}

export default Signup