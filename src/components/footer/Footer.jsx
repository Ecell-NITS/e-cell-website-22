import React from 'react'
import './Footer.css'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi'
import { MdLocationOn } from 'react-icons/md'
import { MdSend } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs'

const Footer = () => {
  return (

    <div className='footer-section'>
      <div className="fcontainer">


        <div className="container1">
          <img src="./images/E-Cell-Logo-White.png" alt="logo" href="/" />
        </div>


        <div className="container2">
          <h2 className='h2'>Organisation</h2>
          <ul className='no-bullets'>
            <li>
              <BiUserCircle className='f_icon' /><span className='i-text'> Entrepreneur</span>
            </li>
            <li>
              <MdLocationOn className='f_icon' /><span className='i-text'> NIT Silchar, Silchar, Assam, India-788010 </span>
            </li>
            <li>
              <BsFillTelephoneFill className='f_icon' /><span className='i-text'>+91 6263 943 064</span>
            </li>
          </ul>
        </div>


        <div className="container3">
          <h2 className='h2'>Social</h2>
          <a href="/" className="footer_social_Logo"><FaFacebook /><span className="i-text">Facebook</span></a>
          <a href="/" className="footer_social_Logo" id='link_ln'><FaLinkedin /><span className="i-text">Linkedln</span></a>
          <a href="/" className="footer_social_Logo" ><FaInstagram /><span className="i-text">Instagram</span></a>
        </div>


        <div className="container4">
          <h2 className='h2' id='h'>Subscribe</h2>
          <p className='p1' style={{ marginTop: "2rem" }}>Keep yourself updated. Subscribe to our newsletter</p>
          <div className='fill'>
            <input type="email" placeholder="Your email" />
            <MdSend className='send' />
          </div>

        </div>
      </div>
      <div className="container5">
        <p className='p2'>All Rights Reserved @E-Cell, NIT Silchar</p>
      </div>
    </div>


  )
}
export default Footer