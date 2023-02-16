import React from 'react'
import Footer from '../shared/Footer/Footer'
import NavbarTeam from '../shared/Navbar/NavbarTeam'
import './Allevents.css'
const AllEvents = () => {
    return (
        <>
            <NavbarTeam />
            <div className="events-main-hero ">
                <div className="top-hro-all-evnts-pol">
                    <h1>OUR PAST EVENTS</h1>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AllEvents