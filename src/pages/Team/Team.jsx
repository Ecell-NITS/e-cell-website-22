import React, { useEffect } from "react";
import NavbarTeam from "../../components/shared/Navbar/NavbarTeam";
import "./Team.css";
import Tab from "../../components/Teampage/Tab/Tab";
import Footer from "../../components/shared/Footer/Footer";

const Team = () => {
  useEffect(() => {
    document.title = "Team | E-Cell NIT Silchar";
  }, []);
  return (
    <>
      <NavbarTeam />
      <div className="team-top">
        <h1 className="me-ou" style={{ userSelect: "none" }}>
          Meet our
        </h1>
        <h1 style={{ userSelect: "none" }}>Excellent</h1>
        <span className="team-nme-half" style={{ userSelect: "none" }}>
          Team{" "}
        </span>{" "}
        <span className="mem-part" style={{ userSelect: "none" }}>
          Memb
        </span>{" "}
        <span className="er" style={{ userSelect: "none" }}>
          ers
        </span>
      </div>
      <Tab />
      <Footer />
    </>
  );
};

export default Team;
