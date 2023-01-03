import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
const Scrolling = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};
export default Scrolling;
