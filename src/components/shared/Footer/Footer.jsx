import React from 'react'
import './Footer.css'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi'
import { MdLocationOn } from 'react-icons/md'
import { MdSend } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs'
// import footlogo from '../../../assets/E-Cell-Logo-White.png'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (

    <div className='footer-section'>
      <div className="fcontainer">


        <div className="container1">
          <Link to="/"><img className='img-foot-centr' src="https://res.cloudinary.com/dp92qug2f/image/upload/v1678341670/Ecell%20website/E-Cell-Logo-White_qhkb0q.webp" alt="logo" /></Link>
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
          <h2 className='h2'><span className="s_head">Social</span></h2>
          <a href="https://www.facebook.com/ecell.nit.silchar?mibextid=ZbWKwL" className="footer_social_Logo" target={'_blank'} rel="noreferrer"><FaFacebook /><span className="i-text">Facebook</span></a>
          <a href="https://www.linkedin.com/company/ecell-nit-silchar/" className="footer_social_Logo" id='link_ln' target={'_blank'} rel="noreferrer"><FaLinkedin /><span className="i-text">Linkedln</span></a>
          <a href="https://instagram.com/ecell.nitsilchar?igshid=YmMyMTA2M2Y=" className="footer_social_Logo" target={'_blank'} rel="noreferrer" ><FaInstagram className='foot_insta' /><span className="i-text">Instagram</span></a>
        </div>


        <div className="container4">
          <h2 className='h2' id='h'>Subscribe</h2>
          <p className='p1' style={{ marginTop: "2rem" }}>Keep yourself updated. Subscribe to our newsletter</p>
          <div className='fill'>
            <input type="email" placeholder="Your email" />
            <MdSend className='send' />
          </div>
          <div className='fill'>
            <input type="email" placeholder="Your email" />
            <MdSend className='send' />
          </div>
          <div className='fill'>
            <input type="email" placeholder="Your email" />
            <MdSend className='send' />
          </div>

        </div>
        <div className="container5">
          <p className='p2'>All Rights Reserved @E-Cell, NIT Silchar</p>
        </div>
      </div>
    </div>

  )
}
export default Footer