import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "../Home/Home";
const UserRedirect = () => {
  const location = useLocation();
  const currentURL = decodeURIComponent(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentURL === "/user") {
      navigate("/login");
    }
  }, [navigate, currentURL]);
  return <Home />;
};

export default UserRedirect;
