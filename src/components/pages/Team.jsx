import React, { useEffect } from 'react'
import NavbarTeam from '../shared/NavbarTeam';
import '../css/Team.css'
import Tab from '../Teampage/Tab/Tab'

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
      <Tab />
    </>

  )
}

export default Team