import React, { useState } from 'react'
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi"
import { Link } from 'react-router-dom';
import './NavbarTeam.css';
import navlogo from '../../../assets/ecell-logo-bw2.png'
const NavbarTeam = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  }

  const changeToggle = () => {
    if (window.scrollY >= 90 && window.innerWidth > 1000){
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  window.addEventListener("scroll", changeToggle);


  return (
    <nav className={ toggle ? 'navbar0 expanded' : 'navbar0'} style={{userSelect:'none'}} >
      <Link to="/">
        <img className='brand-logo logo' src={navlogo} alt="ecell-logo-bw2" />
      </Link>
      <div className='toggle-icon' onClick={handleToggle}>
        {toggle ? <ImCross size={20} /> : <GiHamburgerMenu size={25} />}
      </div>
      <ul className='links-nav'>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/#about">ABOUT US</Link></li>
        <li><Link to="/events">EVENTS</Link></li>
        <li><Link to="/resources">RESOURCES</Link></li>
        <li><a href="https://srijan-nits.in/" rel="noreferrer" target="_blank">SRIJAN</a></li>
        <li><Link to="/team">OUR TEAM</Link></li>
        <li><Link to="/gallery">GALLERY</Link></li>
      </ul>
    </nav>
  )
}
export default NavbarTeam;