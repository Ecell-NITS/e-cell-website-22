import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import NavbarTeam from "../shared/Navbar/NavbarTeam";
import Footer from "../shared/Footer/Footer";
import { toast } from "react-toastify";
const Authprovblog = ({ onAuthentication }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      username === import.meta.env.VITE_REACT_APP_USERNAME_PROVBLOG &&
      password === import.meta.env.VITE_REACT_APP_PWD_PROVBLOG
    ) {
      onAuthentication(true);
      navigate("/provisionalblog");
    } else {
      toast.error("Invalid username or password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <NavbarTeam />
      <div className="formauthenticateprovblog">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="formlogin">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              className="input-common-recruit"
              onChange={handleUsernameChange}
            />
          </div>
          <div className="formlogin">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              className="input-common-recruit"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="kretrhereading">
            Login
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Authprovblog;
