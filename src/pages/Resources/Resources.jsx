import React, { useEffect } from "react";
import Footer from "../../components/shared/Footer/Footer";
import NavbarTeam from "../../components/shared/Navbar/NavbarTeam";
import "./Resources.css";
import BooksSummary from "../../components/ResourceModal/BooksSummary";
import PodcastSummary from "../../components/ResourceModal/PodcastSummary";
import Blog from "../../components/Blog/Blog";
import ScrollToSection from "../../components/shared/ScrollToSection/Scroll";

const Resources = () => {
  ScrollToSection();
  useEffect(() => {
    document.title = "Resources | E-Cell NIT Silchar";
  }, []);
  return (
    <>
      <NavbarTeam />
      <div className="resources-main">
        <h1>Resources</h1>
      </div>
      <BooksSummary />
      <PodcastSummary />
      <Blog />
      <Footer />
    </>
  );
};

export default Resources;
