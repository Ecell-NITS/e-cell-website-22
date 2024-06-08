import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Logout.css";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import UserContext from "../../../context/UserContext";
const Logout = () => {
  // const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    document.title = "Logout?";
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <main className="parent__logout">
        <div className="img__ecell__holder">
          <Link to="/">
            {" "}
            <img
              src="https://res.cloudinary.com/dp92qug2f/image/upload/v1678341163/Ecell%20website/ecell-logo-bw2_sayvqp.webp"
              alt=""
            />
          </Link>
        </div>

        <div className="signedin__details">
          <div className="user__auth__profile_img">
            <img src={user.userimg} alt="" />
          </div>
          <div id="auth__details__cont">
            <p>
              Signed in as{" "}
              <span id="bold__auth__name">
                <Link to="/dashboard">{user.name}</Link>
              </span>{" "}
            </p>
          </div>
        </div>

        <div className="logout__btn">
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div className="back__to__dashboard">
          <button onClick={handleGoToDashboard}>
            <GoArrowLeft />
            <span style={{ marginLeft: ".35vw" }}>Back to Dashboard</span>
          </button>
        </div>
      </main>
    </>
  );
};

export default Logout;
