import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.title = "Login | ECELL NITS"
    })

    const handlelogin = (e) => {
        e.preventDefault()
        if (!email || !password) {
            setMessage('Please fill all required fields');
            return;
        }

        axios.post('http://localhost:2226/login', { email, password })
        .then(response => {
          setMessage(response.data.message);
      
        })
        .catch(error => {
          if (error.response) {
            setMessage(error.response.data.error);
          } else {
            setMessage('Login failed. Please try again.');
          }
        });
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
                <button type="submit">Log in</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    )
}

export default Login