import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loggingin, setLoggingin] = useState(false)
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
            })
            .catch(error => {
                if (error.response) {
                    setMessage(error.response.data.error);
                } else {
                    setMessage('Login failed. Please try again.');
                }
                setLoggingin(false)
            });
    }

    const HandleSignupMove = () => {
        navigate("/signup")
    }

    return (
        <div><h1>Login</h1>

            <form onSubmit={handlelogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">
                    {loggingin ? "Logging in..." : "Log in"}
                </button>
            </form>

            {message && <p>{message}</p>}
            <button onClick={HandleSignupMove}>Go to Signup</button>
        </div>
    )
}

export default Login
