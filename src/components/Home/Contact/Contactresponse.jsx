import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../../pages/Projectsubmission/Techresults.css'
import NavbarTeam from '../../shared/Navbar/NavbarTeam'
import Footer from '../../shared/Footer/Footer'

const Contactresponse = () => {
    useEffect(() => {
        document.title = "Contact Us responses || ECELL NITS"
    })

    const [errormsg, setErrormsg] = useState("")
    const [password, setPassword] = useState("")
    const [results, setResults] = useState([])
    const [successMessage, setSuccessMessage] = useState("")
    const [nologin, setNologin] = useState(false)
    const [loggingin, setLoggingin] = useState(false)


    const isFormFilled = () => {
        return (
            password !== ""
        )
    }

    const submitcred = (e) => {
        e.preventDefault()

        if (!isFormFilled()) {
            setErrormsg("Please fill all the required details")
            return
        }

        setNologin(true)
        setLoggingin(true)
        axios.post(`${process.env.REACT_APP_APIMAIN}/getUsers`, {
        // axios.post("http://localhost:2226/getUsers", {
            password
        }).then((response) => {
            setPassword("")
            setNologin(false)
            setLoggingin(false)
            setResults(response.data)
            setSuccessMessage("Credentials sent to the server.")
            setTimeout(() => {
                setSuccessMessage("")
            }, 3000)
        })
            .catch((error) => {
                console.error('Error:', error)
                setNologin(false)
                setLoggingin(false)
                if (error.response && error.response.data && error.response.data.message) {
                    setErrormsg(error.response.data.message);

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
                        <button disabled={nologin} style={{ opacity: nologin ? 0.5 : 1, cursor: nologin ? "not-allowed" : "pointer" }} type="submit" className='kretrhereading' onClick={submitcred}>
                            {loggingin ? "Logging in..." : "Log in"}
                        </button>

                        {errormsg && <p style={{ color: "red" }}>{errormsg}</p>}
                        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                    </form>


                    {results.length > 0 && (
                        <div>
                            <h2>Results</h2>
                            <ul id='ulforsmallwidth'>
                                {results.map((result, index) => (
                                    <>
                                        <div key={index} >
                                            <h1>name: <span style={{ color: "red" }}>{result.name}</span></h1>
                                            <h1>email: <span style={{ color: "red" }}>{result.email}</span> </h1>
                                            <h1>Message: <span style={{ color: "red" }}>{result.message}</span></h1>
                                            <hr />
                                        </div>
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

export default Contactresponse
