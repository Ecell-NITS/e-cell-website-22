import React, { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../../context/UserContext";
import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const { fetchUserProfile } = useContext(UserContext);

  const handleGoogleLoginSuccess = async (tokenResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_APIMAIN}/auth/google`,
        {
          token: tokenResponse.access_token,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      const { token } = res.data;
      localStorage.setItem("token", token);
      await fetchUserProfile();
      navigate("/dashboard");
      toast.success("Login Successful");
    } catch (error) {
      console.error("Google Login Error", error);
      toast.error("Google Login Failed");
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: () => {
      console.log("Login Failed");
      toast.error("Google Login Failed");
    },
  });

  return (
    <button onClick={() => login()} className="google-btn">
      <FcGoogle className="google-icon" />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleAuth;
