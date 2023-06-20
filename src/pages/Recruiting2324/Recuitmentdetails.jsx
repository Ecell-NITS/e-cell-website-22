import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../Projectsubmission/Techresults.css'
import NavbarTeam from '../../components/shared/Navbar/NavbarTeam'
import Footer from '../../components/shared/Footer/Footer'
const Recuitmentdetails = () => {
    useEffect(() => {
        document.title = "Recruitment responses || ECELL NITS"
    })

    const [errormsg, setErrormsg] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [results, setResults] = useState([])
    const [successMessage, setSuccessMessage] = useState("")
    const [nologin, setNologin] = useState(false)
    const [loggingin, setLoggingin] = useState(false)


    const isFormFilled = () => {
        return (
            username !== "" && password !== ""
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
        axios.post(`${process.env.REACT_APP_RECRUITMENT_MAIN_API}/sendcred`, {
            // axios.post("http://localhost:8000/sendcred", {
            username, password
        }).then((response) => {
            setUsername("")
            setPassword("")
            setNologin(false)
            setLoggingin(false)
            setResults(response.data)
            // console.log(response.data)
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
                                        <li key={index}>


                                            <h1>Name: <span style={{ color: "red" }}>{result.name}</span></h1>
                                            <h1>email: <span style={{ color: "red" }}>{result.email}</span> </h1>
                                            <h1>Scholar Id: <span style={{ color: "red" }}>{result.scholarId}</span> </h1>
                                            <h1>branch: <span style={{ color: "red" }}>{result.branch}</span> </h1>
                                            <h1>WP number: <span style={{ color: "red" }}>{result.mobileno}</span></h1>
                                            <h1>Which team you want to apply for? <span style={{ color: "red" }}> {result.team && result.team.join(", ")}</span></h1>
                                            <h1>why ecell: <span style={{ color: "red" }} >{result.whyecell}</span> </h1>
                                            <hr />
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

export default Recuitmentdetails
