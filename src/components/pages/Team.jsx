import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import Tab from '../Teampage/Tab/Tab'

const Team = () => {
  useEffect(() => {
    document.title = "Team ECELL | NITS";
  }, []);
  return (
    <div>
      <Navbar />
      <Tab />
    </div>

  )
}

export default Team