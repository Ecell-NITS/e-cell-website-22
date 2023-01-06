import React, { useEffect } from 'react'
import Navbar from '../shared/NavbarTeam'
import '../css/Gallery.css'
import Footer from '../footer/Footer';
import Tab from '../GalleryPage/Tab';

const Gallery = () => {
  useEffect(() => {
    document.title = "Gallery ECELL | NITS";
  }, []);
  return (
    <div>
      <Navbar />
      <div className="Gallery-top">
      <h1>
        <span className='Gall-part'>Gall</span>
        <span className='ery-part'>ery</span>
      </h1>
      </div>
      <Tab />
      <Footer />
    </div>
  )
}

export default Gallery