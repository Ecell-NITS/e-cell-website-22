import React, { useState, useEffect } from 'react'
import NavbarTeam from '../../components/shared/Navbar/NavbarTeam'
import Footer from '../../components/shared/Footer/Footer'
import axios from 'axios'
import './Techresults.css'
const Techresults = () => {
    useEffect(() => {
        document.title = "Tech submission result"
    })

    const [errormsg, setErrormsg] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [results, setResults] = useState([])
    const [successMessage, setSuccessMessage] = useState("")


    const isFormFilled = () => {
        return (
            username !== "" && password !== ""
        )
    }

    const submitcred = (e) => {
        e.preventDefault()

        if (!isFormFilled()) {
            setErrormsg("Please fill all the required details")
            setTimeout(() => {
                setErrormsg("")
            }, 5000)
        }

        axios.post(`${process.env.REACT_APP_PROJECTSUBMISSION_API}/sendcred`, {
        // axios.post("http://localhost:4689/sendcred", {
            username, password
        }).then((response) => {
            setUsername("")
            setPassword("")
            setResults(response.data)
            // console.log(response.data)
            setSuccessMessage("Data sent to the server.")
            setTimeout(() => {
                setSuccessMessage("")
            }, 3000)
        })
            .catch((error) => {
                console.error('Error:', error)
                if (error.response && error.response.data && error.response.data.message) {
                    setErrormsg(error.response.data.message);
                    setUsername("")
                    setPassword("")
                } else {
                    setErrormsg("An error occurred. Please try again.");
                }
                setTimeout(() => {
                    setErrormsg("")
                }, 3000)
            })
    }

    return (
        <>
            <div>
                <NavbarTeam />
                <div className='formauthenticateprovblog' id='bigonsmallscreen'>
                    <h2>Login</h2>
                    <form >
                        <div className="formlogin">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value)
                                }}
                                className='input-common-recruit'

                            />
                        </div>
                        <div className="formlogin">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                                className='input-common-recruit'

                            />
                        </div>
                        <button type="submit" className='kretrhereading' onClick={submitcred}>Login</button>

                        {errormsg && <p>{errormsg}</p>}
                        {successMessage && <p>{successMessage}</p>}
                    </form>


                    {results.length > 0 && (
                        <div>
                            <h2>Results</h2>
                            <ul id='ulforsmallwidth'>
                                {results.map((result, index) => (
                                    <>
                                        <li key={index}>
                                            <h1>Name: <span style={{ color: "red" }}>{result.name}</span></h1>
                                            <h1>Mobile No: <span style={{ color: "red" }}>{result.mobileno}</span></h1>
                                            <h1>Project: <span style={{ color: "red" }}> <a href={result.project} target='_blank' rel="noreferrer"><span style={{color:"red",textDecoration:"underline"}}>Project link</span></a></span></h1>
                                            <h1>Email: <span style={{ color: "red" }}>{result.email}</span></h1>
                                            <h1>Tech Team: <span style={{ color: "red" }}>{result.techteam}</span></h1>
                                            <h1>Scholar ID: <span style={{ color: "red" }}>{result.scholarId}</span></h1>
                                            <br /><hr />
                                        </li>
                                    </>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Techresults
