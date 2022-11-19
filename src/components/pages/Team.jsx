import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'

const Team = () => {
  useEffect(() => {
    document.title = "Team ECELL | NITS";
  }, []);
  return (
    <div>
      <Navbar />
      <h1>Team ECELL</h1>
    </div>

  )
}

export default Team