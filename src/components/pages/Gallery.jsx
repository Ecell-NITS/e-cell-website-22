import React, { useEffect } from 'react'
import NavbarTeam from '../shared/NavbarTeam'
import '../css/Gallery.css'
import Footer from '../footer/Footer';
import Tab from '../GalleryPage/Tab';

const Gallery = () => {
  useEffect(() => {
    document.title = "Gallery ECELL | NITS";
  }, []);
  return (
    <div>
      <NavbarTeam />
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