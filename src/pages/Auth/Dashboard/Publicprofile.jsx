import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PublicProfile.css'
import { useLocation } from 'react-router-dom'
import NavbarTeam from '../../../components/shared/Navbar/NavbarTeam'
import Footer from '../../../components/shared/Footer/Footer'
import { FaFacebookF } from 'react-icons/fa'
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
const Publicprofile = () => {
    useEffect(() => {
        document.title = "Profile | E-Cell NITS"
    })

    const location = useLocation()
    const currentURL = decodeURIComponent(location.pathname);
    const writeremaill = currentURL.split('/user/')[1];
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [pic, setPic] = useState("")
    const [fb, setFb] = useState("")
    const [ig, setIg] = useState("")
    const [git, setGit] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [hideLinkedin, setHideLinkedin] = useState(false)
    const [hidefb, setHidefb] = useState(false)
    const [hideig, setHideig] = useState(false)
    const [hidegithub, setHidegithub] = useState(false)


    const handleGoFacebook = () => {
        window.open(`${fb}`, '_blank');
    }

    const handleGoIg = () => {
        window.open(`${ig}`, '_blank')
    }

    const handleGoGithub = () => {
        window.open(`${git}`, '_blank')
    }

    const handleGoLinkedin = () => {
        window.open(`${linkedin}`, '_blank')
    }

    useEffect(() => {
        if (linkedin === undefined) {
            setHideLinkedin(true);
        } else {
            setHideLinkedin(false);
        }
    }, [linkedin]);

    useEffect(() => {
        if (fb === undefined) {
            setHidefb(true)
        } else {
            setHidefb(false)
        }
    }, [fb])

    useEffect(() => {
        if (ig === undefined) {
            setHideig(true)
        } else {
            setHideig(false)
        }
    }, [ig])

    useEffect(() => {
        if (git === undefined) {
            setHidegithub(true)
        } else {
            setHidegithub(false)
        }
    }, [git])

    // console.log(writeremaill)

    useEffect(() => {
        const fetchPublicProfile = async () => {
            try {
                // const response = await axios.get(`http://localhost:2226/publicprofile/${writeremaill}`);
                const response = await axios.get(`${process.env.REACT_APP_APIMAIN}/publicprofile/${writeremaill}`);
                // console.log(response.data)
                setName(response.data.name)
                setBio(response.data.bio)
                setPic(response.data.userimg)
                setFb(response.data.facebook)
                setIg(response.data.instagram)
                setGit(response.data.github)
                setLinkedin(response.data.linkedin)
            } catch (error) {
                console.log('Error fetching Public Profile:', error);
            }
        }
        fetchPublicProfile()
    }, [writeremaill])

    return (
        <>
            <NavbarTeam />
            <div className='dashboardmain'>
                <div className="flexingphotocontent">
                    <div className="phhotodash">
                        <div className="photodashimg">
                            <img src={pic} alt={name} />
                        </div>
                        <div className="smediaconnectlinks">
                            <div className="smedia1div" id='fbfaa' style={{ display: hidefb ? "none" : "initial" }}>
                                <button onClick={handleGoFacebook}><FaFacebookF /></button>
                            </div>

                            <div className="smedia1div" id='igfaa' style={{ display: hideig ? "none" : "initial" }}>
                                <button onClick={handleGoIg}><AiFillInstagram /></button>
                            </div>

                            <div className="smedia1div" id='githubfaa' style={{ display: hidegithub ? "none" : "initial" }}>
                                <button onClick={handleGoGithub}><AiFillGithub /></button>
                            </div>

                            <div className="smedia1div" id='linkkedinfaa' style={{ display: hideLinkedin ? "none" : "initial" }}>
                                <button onClick={handleGoLinkedin}>
                                    <AiFillLinkedin />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="biodashboardd">
                        <div className="firstseconndchild">
                            <h1 className='accountusername'>{name}</h1>
                        </div>

                        <div className="biohbhauidhar">
                            {bio.split('\n').map((bio, index) => (
                                <h3 key={index} style={{ whiteSpace: "pre-line" }}>{bio}</h3>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Publicprofile