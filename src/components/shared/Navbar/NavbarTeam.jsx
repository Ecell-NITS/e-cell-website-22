// /* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import "./NavbarTeam.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../../context/UserContext";

const NavbarTeam = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const changeToggle = () => {
    if (window.scrollY >= 90 && window.innerWidth > 1000) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  window.addEventListener("scroll", changeToggle);

  const navigate = useNavigate();

  const movetoaboutsection = () => {
    navigate("/");
    document.getElementById("aboutecellnits").scrollIntoView(true);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      setProfilePicture(user.userimg);
    }
  }, [user]);

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <nav
      className={toggle ? "navbar0 expanded" : "navbar0"}
      style={{ userSelect: "none" }}
    >
      <Link to="/">
        <img
          className="brand-logo logo"
          src="https://res.cloudinary.com/dp92qug2f/image/upload/v1678341163/Ecell%20website/ecell-logo-bw2_sayvqp.webp"
          alt="ecell-logo-bw2"
        />
      </Link>
      <div className="toggle-icon" onClick={handleToggle}>
        {toggle ? <ImCross size={20} /> : <GiHamburgerMenu size={25} />}
      </div>
      <ul className="links-nav">
        <li>
          {" "}
          <NavLink to="/">HOME</NavLink>
        </li>

        {/* <li>
          <a role="button" tabIndex="0" onClick={movetoaboutsection}>
            ABOUT US
          </a>
        </li> */}
        <li>
          <NavLink to="/#aboutecellnits">ABOUT US</NavLink>
        </li>
        {/* <li>  <NavHashLink to="/#aboutecell">ABOUT US</NavHashLink></li> */}
        {/* <li><a href="/#aboutecellnits">ABOUT</a></li> */}
        <li>
          {" "}
          <NavLink to="/events">EVENTS</NavLink>
        </li>
        <li>
          <NavLink to="/resources">RESOURCES</NavLink>
        </li>
        {/* <li><a href="https://srijan-nits.in/" rel="noreferrer" target="_blank">SRIJAN</a></li> */}
        <li>
          <NavLink to="/team">OUR TEAM</NavLink>
        </li>
        <li>
          <NavLink to="/gallery">GALLERY</NavLink>
        </li>
        {/* <li>
          <NavLink to="/recruiting">JOIN US</NavLink>
        </li> */}
        {/* <li><NavLink to="/recruiting">RECRUITING</NavLink></li> */}
        {isLoggedIn ? (
          <li>
            <div className="imgactivehlder" onClick={handleGoToDashboard}>
              <img
                className="profileactivesignin"
                src={profilePicture}
                alt="Profile Pic"
              />
            </div>
          </li>
        ) : (
          <li>
            <NavLink to="/signup">SIGN UP</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default NavbarTeam;
