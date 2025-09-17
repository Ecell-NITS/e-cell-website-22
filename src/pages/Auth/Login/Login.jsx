import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarTeam from "../../../components/shared/Navbar/NavbarTeam";
import Footer from "../../../components/shared/Footer/Footer";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromEvent = location.state?.fromEvent; // redirect after login if coming from event

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggingin, setLoggingin] = useState(false);
  const [disablelogin, setDisablelogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    document.title = "Login | E-Cell NIT Silchar";
    const token = localStorage.getItem("token");
    if (token) {
      if (fromEvent) {
        navigate("/events", {
          state: { showQuestions: true, fromEventId: fromEvent },
        });
      } else {
        navigate("/events");
      }
    }
  }, [fromEvent, navigate]);

  const handlelogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    setDisablelogin(true);
    setLoggingin(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_APIMAIN}/login`,
        { email, password }
      );

      const { token, user } = response.data;

      // Save token and user info
      localStorage.setItem("token", token);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Redirect after login
      if (fromEvent) {
        navigate("/events", { state: { showQuestions: true, fromEventId: fromEvent } });
      } else {
        navigate("/events");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Login failed. Please try again.";
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      setMessage(errorMsg);
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setLoggingin(false);
      setDisablelogin(false);
    }
  };

  const HandleSignupMove = () => navigate("/signup");
  const handleForgetPwd = () => navigate("/forgot password");

  return (
    <>
      <NavbarTeam />
      <div className="signuptopcont">
        <div className="formcontsignup">
          <h1 className="okwelcometoecell">Welcome back</h1>
          <h4 className="enterdtlssignup">Please enter your details.</h4>
          <div className="formsignaccoutn">
            <div className="inputdicdignup">
              <h3>Email</h3>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="inputdicdignup">
              <h3>Password</h3>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlelogin()}
              />
              <label className="labelshowpass">
                <input
                  className="inputshowpass"
                  type="checkbox"
                  checked={showPassword}
                  onChange={handleShowPassword}
                />
                Show password
              </label>
            </div>

            <div className="inputdicdignup" id="fogtpwd">
              <button
                disabled={disablelogin}
                style={{ cursor: disablelogin ? "not-allowed" : "pointer" }}
                onClick={handleForgetPwd}
              >
                Forgot Password?
              </button>
            </div>

            <button
              className="btnsubmittodb"
              type="submit"
              disabled={disablelogin}
              onClick={handlelogin}
              style={{
                opacity: disablelogin ? 0.5 : 1,
                cursor: disablelogin ? "not-allowed" : "pointer",
              }}
            >
              {loggingin ? "Signing in..." : "Sign in"}
            </button>

            {message && <p className="msgaftersignuplogin">{message}</p>}

            <div className="bottomredirectlogin">
              <h4 className="logexistingaccount">Don’t have an account?</h4>
              <button
                onClick={HandleSignupMove}
                disabled={disablelogin}
                style={{ cursor: disablelogin ? "not-allowed" : "pointer" }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div className="imgbgholdersignup">
          <img
            src="https://res.cloudinary.com/dp92qug2f/image/upload/v1686499643/Photo_zxxmw5.svg"
            alt=""
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
