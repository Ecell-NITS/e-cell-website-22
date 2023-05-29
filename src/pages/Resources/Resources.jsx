import React, {useEffect} from "react";
import Footer from "../../components/shared/Footer/Footer";
import NavbarTeam from "../../components/shared/Navbar/NavbarTeam";
import "./Resources.css";
import BooksSummary from "../../components/ResourceModal/BooksSummary";
// import PodcastSummary from "../../components/ResourceModal/PodcastSummary";

const Resources = () => {
  useEffect(() => {
    document.title = "Resources ECELL | NITS";
  }, []);
  return (
    <>
      <NavbarTeam />
      <div className="resources-main">
        <h1>Resources</h1>
      </div>
      <BooksSummary />
      {/* <PodcastSummary /> */}
      <Footer />
    </>
  );
};

export default Resources;
