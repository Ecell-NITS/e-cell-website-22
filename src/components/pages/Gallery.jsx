import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'

const Gallery = () => {
  useEffect(() => {
    document.title = "Gallery ECELL | NITS";
  }, []);
  return (
    <div>
      <Navbar />
      <h1>Gallery ECELL</h1>
    </div>
  )
}

export default Gallery