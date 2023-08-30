import React, { useEffect } from 'react'
import './Gallery.css'
import Footer from '../../components/shared/Footer/Footer';
// import Tab from '../../GalleryPage/Tab';
import Tab from '../../components/GalleryPage/GallertTab/Tab'
import NavbarTeam from '../../components/shared/Navbar/NavbarTeam';

const Gallery = () => {
  useEffect(() => {
    document.title = "Gallery | E-Cell NIT Silchar";
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