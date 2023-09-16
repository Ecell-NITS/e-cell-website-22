import React, { useEffect, useState } from "react";
import "./ScrollToTop.css";
import { useWindowScroll } from "react-use";
const ScrollToTop = () => {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisibility] = useState(false);
  useEffect(() => {
    if (pageYOffset > 400) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }, [pageYOffset]);
  const ScrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  if (!visible) {
    return false;
  }
  return (
    <div className="scroll-to-top cursor-pointer text-center" onClick={ScrollToTop}>
      <center>
        <i className="icon fas fa-chevron-up"></i>
      </center>
    </div>
  );
};
export default ScrollToTop;
