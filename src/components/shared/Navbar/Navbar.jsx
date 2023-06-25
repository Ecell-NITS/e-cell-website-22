import React, { useState, useEffect } from 'react'
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
const Navbar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  }

  const changeToggle = () => {
    if (window.scrollY >= 90 && window.innerWidth > 768) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  window.addEventListener("scroll", changeToggle);

  const movetosection = () => {
    document.getElementById("aboutecellnits").scrollIntoView();
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_FETCHPROFILE, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfilePicture(response.data.userimg);
        console.log(response.data.userimg)
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (localStorage.getItem('token')) {
      fetchUserProfile();
    }
  }, []);

  const handleGoToDashboard = ()=>{
    navigate("/dashboard")
  }

  return (
    <nav className={toggle ? 'navbar1 expanded' : 'navbar1'} style={{ userSelect: 'none' }}>
      <Link to="/">
        {/* <img className='brand-logo logo' src="./images/ecell-logo-bw2.png" alt="ecell-logo-bw2" /> */}
        <img className='brand-logo logo' src="https://res.cloudinary.com/dp92qug2f/image/upload/v1678341163/Ecell%20website/ecell-logo-bw2_sayvqp.webp" alt="ecell-logo-bw2" />
      </Link>
      <div className='toggle-icon' onClick={handleToggle}>
        {toggle ? <ImCross size={20} /> : <GiHamburgerMenu size={25} />}
      </div>
      <ul className='links-nav'>
      <li> <NavLink to="/">HOME</NavLink></li>
        <li><a onClick={movetosection}>ABOUT US</a></li>
        <li> <NavLink to="/events">EVENTS</NavLink></li>
        <li><NavLink to="/resources">RESOURCES</NavLink></li>
        {/* <li><a href="https://srijan-nits.in/" rel="noreferrer" target="_blank">SRIJAN</a></li> */}
        <li><NavLink to="/team">OUR TEAM</NavLink></li>
        <li><NavLink to="/gallery">GALLERY</NavLink></li>
        {/* <li><NavLink to="/recruiting">RECRUITING</NavLink></li> */}
        {isLoggedIn ? (
          <li><div className='imgactivehlder' onClick={handleGoToDashboard}>
            <img  className='profileactivesignin' src={profilePicture} alt="Profile Pic" />
            </div></li>
        ) : (
          <li><NavLink to="/signup">SIGN UP</NavLink></li>
        )}
      </ul>
    </nav>
  )
}
export default Navbar;
