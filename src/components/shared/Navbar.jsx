import React, { useState } from 'react'
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi"
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
const Navbar = () => {
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
    <nav className={ toggle ? 'navbar1 expanded' : 'navbar1'}>
      <Link to="/">
        <img className='brand-logo logo' src="./images/ecell-logo-bw2.png" alt="ecell-logo-bw2" />
      </Link>
      <div className='toggle-icon' onClick={handleToggle}>
        {toggle ? <ImCross size={20} /> : <GiHamburgerMenu size={25} />}
      </div>
      <ul className='links-nav'>
        <li><Link to="/#about">ABOUT</Link></li>
        <li><Link to="/#events">EVENTS</Link></li>
        <li><a href="https://srijan-nits.in/" rel="noreferrer" target="_blank">SRIJAN</a></li>
        <li><Link to="/team">OUR TEAM</Link></li>
        <li><Link to="/gallery">GALLERY</Link></li>
      </ul>
    </nav>
  )
}
export default Navbar;