import React from 'react';
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";
import { AiOutlineInstagram } from "react-icons/ai";
import '../css/FooterConstant.css';
const Footerconstant = () => {
    return (
        <>
            <div className="footer-c">
                <a href="https://www.instagram.com/ecell.nitsilchar/" rel="noreferrer" target="_blank" >
                    <button className="ig-btn">
                        {" "}
                        <AiOutlineInstagram className="ig-icon" size={30} />
                    </button>
                </a>
                <a href="https://www.linkedin.com/in/e-cell-nit-silchar-848602154" rel="noreferrer" target="_blank" >
                    <button className="li-btn">
                        <RiLinkedinFill className="li-icon" size={30} />
                    </button>
                </a>
                <a href="https://twitter.com" rel="noreferrer" target="_blank" >
                    <button className="fa-btn tw">
                        {" "}
                        <BsTwitter className="fa-icon tw-i" size={30} />
                    </button>
                </a>
                <a href="https://www.facebook.com/ecell.nit.silchar/" rel="noreferrer" target="_blank" >
                    <button className="fa-btn">
                        {" "}
                        <FaFacebookF className="fa-icon" size={30} />
                    </button>
                </a>
            </div>
        </>
    )
}

export default Footerconstant