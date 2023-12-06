import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionToScrollIn = document.querySelector(location.hash);
      console.log(sectionToScrollIn);
      if (sectionToScrollIn) {
        sectionToScrollIn.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
};

export default ScrollToSection;
