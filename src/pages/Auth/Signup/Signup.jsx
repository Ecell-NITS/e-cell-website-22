import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import NavbarTeam from "../../../components/shared/Navbar/NavbarTeam";
import Footer from "../../../components/shared/Footer/Footer";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google"; // Import the useGoogleLogin hook
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confirmpwd, setConfirmpwd] = useState("");
  const [signingup, setSigningup] = useState(false);
  const [verifyotp, setVerifyotp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpgoing, setOtpgoing] = useState(false);
  const [disablebtn, setDisablebtn] = useState(false);
  const [disablesendotp, setDisablesendotp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userimg, setUserimg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [bio, setBio] = useState("Author");

  const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    document.title = "Signup | E-Cell NIT Silchar";
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const isSignUpFormFilled = () => {
    return (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      otp !== "" &&
      confirmpwd !== "" &&
      bio !== "" &&
      userimg !== ""
    );
  };

  const formhandlesubmit = async (e) => {
    e.preventDefault();

    if (!isSignUpFormFilled()) {
      toast.error("Please fill all the required fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (confirmpwd !== password) {
      toast.error("Passwords are not same", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        setMessage("");
      }, 5000);
      return;
    }
    setDisablebtn(true);
    try {
      setVerifyotp(true);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_APIMAIN}/verify-otp`,
        {
          otp,
          email,
        }
      );

      if (response.data.message !== "OTP verified successfully") {
        toast.error("Wrong OTP. Please try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setVerifyotp(false);
        setDisablebtn(false);
        return;
      }
    } catch (error) {
      toast.error("Wrong OTP. Please try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setVerifyotp(false);
      setDisablebtn(false);
      return;
    } finally {
      // moved from here
    }
    setVerifyotp(false); // moved here
    setDisablebtn(true);
    setSigningup(true);
    axios
      .post(`${import.meta.env.VITE_REACT_APP_APIMAIN}/signup`, {
        name,
        email,
        password,
        bio,
        userimg,
      })
      .then((response) => {
        console.log(response.data);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmpwd("");
        setOtp("");
        toast.success(
          `Signup completed! You will be redirected to login page after 5 seconds`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        setTimeout(() => {
          setMessage("");
          navigate("/login");
        }, 5000);
        setSigningup(false);
        setDisablebtn(false);
      })
      .catch((error) => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmpwd("");
        setOtp("");

        if (error.response && error.response.data.error === "Email already exists") {
          toast.info(`Email already exists`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (
          error.response &&
          error.response.data.error === "Password should not be less than 8 characters"
        ) {
          toast.error(`Password cannot be less than 8 characters`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error(`Signup failed. Please try again`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        setTimeout(() => {
          setMessage("");
        }, 5000);
        setSigningup(false);
        setDisablebtn(false);
      });
  };

  const hangleGoToLogin = () => {
    navigate("/login");
  };

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const sendOTP = async (e) => {
    e.preventDefault();

    if (name === "") {
      toast.error("Please enter your name", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email id", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      setDisablesendotp(true);
      setOtpgoing(true);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_APIMAIN}/send-otp`,
        {
          email,
        }
      );
      if (response.status === 200) {
        toast.success(
          "OTP sent successfully! Please check your inbox as well as SPAM folder.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true, // Corrected from aptrue
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setOtpgoing(false);
      setDisablesendotp(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        //  fetch user info
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        const { name, email, picture } = userInfoResponse.data;

        //send this information to  backend to sign up or log in the user
        axios
          .post(`${import.meta.env.VITE_REACT_APP_APIMAIN}/auth/google`, {
            name,
            email,
            userimg: picture,
            bio: "Author",
          })
          .then((response) => {
            // Handle successful signup/login from your backend
            // For example, saving the token and redirecting
            localStorage.setItem("token", response.data.token);
            toast.success("Successfully logged in with Google!");
            navigate("/dashboard");
          })
          .catch((error) => {
            console.error("Backend Google Auth Error:", error);
            toast.error("Failed to sign up with Google. Please try again.");
          });
      } catch (error) {
        console.error("Failed to fetch user info from Google", error);
        toast.error("Could not fetch user information from Google.");
      }
    },
    onError: () => {
      console.log("Google Login Failed");
      toast.error("Google login failed. Please try again.");
    },
  });

  return (
    <>
      <NavbarTeam />
      <div className="signuptopcont">
        <div className="formcontsignup">
          <h1 className="okwelcometoecell">Welcome to E-Cell, NITS</h1>
          <h4 className="enterdtlssignup">Please enter your details.</h4>
          <form className="formsignaccoutn" onSubmit={formhandlesubmit}>
            {/* Your existing form inputs are untouched */}
            <div className="inputdicdignup">
              <h3>Name</h3>
              <input
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="inputdicdignup">
              <h3>Email</h3>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ display: "none" }}>
              <div className="inputdicdignup">
                <h3>Bio</h3>
                <input
                  type="text"
                  placeholder="Enter your Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="inputdicdignup">
                <h3>Profile pic</h3>
                <input
                  type="text"
                  placeholder="Enter your Profile img link"
                  value={userimg}
                  onChange={(e) => setUserimg(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="button" // Important: set type to "button" to prevent form submission
                onClick={sendOTP}
                disabled={disablesendotp || disablebtn}
                style={{
                  opacity: disablesendotp || disablebtn ? 0.5 : 1,
                  cursor: disablesendotp || disablebtn ? "not-allowed" : "pointer",
                }}
                className="btnotpsend"
                id="newotpsending"
              >
                Send OTP
              </button>
            </div>
            {otpgoing && (
              <p className="statusmsgssubmt">
                Sending otp...Please be patient it might take 10 seconds.
              </p>
            )}
            <div className="inputdicdignup">
              <h3>OTP</h3>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="inputdicdignup">
              <h3>Password</h3>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="labelshowpass">
                <input
                  className="inputshowpass"
                  type="checkbox"
                  name="showPassword"
                  id="showPassword"
                  checked={showPassword}
                  onChange={handleShowPassword}
                />
                Show password
              </label>
            </div>
            <div className="inputdicdignup">
              <h3>Confirm Password</h3>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmpwd}
                onChange={(e) => setConfirmpwd(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btnsubmittodb"
              disabled={disablebtn || disablesendotp}
              style={{
                opacity: disablebtn || disablesendotp ? 0.5 : 1,
                cursor: disablebtn || disablesendotp ? "not-allowed" : "pointer",
              }}
            >
              {signingup ? "Creating account" : "Sign up"}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <button
              type="button" // Use type="button" to prevent form submission
              className="btnsubmittodb google-btn"
              onClick={() => googleLogin()}
              disabled={disablebtn}
              style={{
                opacity: disablebtn ? 0.5 : 1,
                cursor: disablebtn ? "not-allowed" : "pointer",
              }}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="google-icon"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              Sign up with Google
            </button>

            <div className="statusmeshs">
              {message && <p className="msgaftersignuplogin">{message}</p>}
              {verifyotp && <p className="statusmsgssubmt">Verifying otp...</p>}
            </div>
            <div className="bottomredirectlogin">
              <h4 className="logexistingaccount">Already have an account?</h4>
              <button
                type="button" // prevent form submission
                onClick={hangleGoToLogin}
                disabled={disablebtn || disablesendotp}
                style={{
                  cursor: disablebtn || disablesendotp ? "not-allowed" : "pointer",
                }}
              >
                Sign In
              </button>
            </div>
          </form>
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

export default Signup;
