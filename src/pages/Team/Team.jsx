import React, { useEffect } from 'react'
import NavbarTeam from '../../components/shared/Navbar/NavbarTeam'
import './Team.css';
import Tab from '../../components/Teampage/Tab/Tab'
import Footer from '../../components/shared/Footer/Footer';

const Team = () => {
  useEffect(() => {
    document.title = "Team ECELL | NITS";
  }, []);
  return (
    <>
      <NavbarTeam />
      <div className="team-top">
        <h1 className='me-ou'>Meet our</h1>
        <h1>Excellent</h1>
        <span>Team </span> <span className='mem-part'>Memb</span> <span className='er'>ers</span>
      </div>
      {/* <Tab /> */}
      <Footer />
    </>

  )
}

export default Team