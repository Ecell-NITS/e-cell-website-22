import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarTeam from "../../../components/shared/Navbar/NavbarTeam";
import Footer from "../../../components/shared/Footer/Footer";
import "./Dashboard.css";
import Allblogspublished from "./Allblogswritten";
import Allprovblogs from "./Allprovblogs";
import Alllikedblogs from "./Alllikedblogs";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import UserContext from "../../../context/UserContext";
import Preloader from "../../../components/Loader/Loader";
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, fetchUserProfile } = useContext(UserContext);

  const [isLoaded, setIsLoaded] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [editedbio, setEditedbio] = useState("");
  const [editedfb, setEditedfb] = useState("");
  const [editedig, setEditedig] = useState("");
  const [editedGithub, setEditedGithub] = useState("");
  const [editedLinkedin, setEditedLinkedin] = useState("");

  const [hideLinkedin, setHideLinkedin] = useState(false);
  const [hidefb, setHidefb] = useState(false);
  const [hideig, setHideig] = useState(false);
  const [hidegithub, setHidegithub] = useState(false);

  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
    if (user) {
      setAdmin(user?.role === "admin" || user?.role === "superadmin");
      setEditedbio(user?.bio);
      setEditedfb(user?.facebook);
      setEditedig(user?.instagram);
      setEditedGithub(user?.github);
      setEditedLinkedin(user?.linkedin);
      setIsLoaded(false);
    }
  }, [fetchUserProfile, user]);

  const ButtonSignout = () => {
    navigate("/logout");
  };

  const handleEditProfile = () => {
    navigate("/editprofile");
  };
  const handleAdminPanel = () => {
    navigate("/admin");
  };

  // const handleallblogsbtn = () => {
  //   navigate("/mypublishedblogs");
  // };

  // const handleallprovblogs = () => {
  //   navigate("/myallblogs");
  // };

  // const handlelikedblogs = () => {
  //   navigate("/likedblogs");
  // };

  // console.log(`${editedfb}`)

  const handleGoFacebook = () => {
    window.open(`${editedfb}`, "_blank");
  };

  const handleGoIg = () => {
    window.open(`${editedig}`, "_blank");
  };

  const handleGoGithub = () => {
    window.open(`${editedGithub}`, "_blank");
  };

  const handleGoLinkedin = () => {
    window.open(`${editedLinkedin}`, "_blank");
  };

  const [lebel12, setlebel12] = useState("publishedblogs");

  useEffect(() => {
    if (editedLinkedin === undefined) {
      setHideLinkedin(true);
    } else {
      setHideLinkedin(false);
    }
  }, [editedLinkedin]);

  useEffect(() => {
    if (editedfb === undefined) {
      setHidefb(true);
    } else {
      setHidefb(false);
    }
  }, [editedfb]);

  useEffect(() => {
    if (editedig === undefined) {
      setHideig(true);
    } else {
      setHideig(false);
    }
  }, [editedig]);

  useEffect(() => {
    if (editedGithub === undefined) {
      setHidegithub(true);
    } else {
      setHidegithub(false);
    }
  }, [editedGithub]);

  if (isLoaded) {
    return <Preloader />;
  }

  return (
    <>
      <NavbarTeam />
      <Helmet>
        <title>{`${user.name}'s Dashboard | E-CELL NIT Silchar`}</title>
        <meta name="description" content="E-CELL NIT SILCHAR" />
      </Helmet>
      <div className="dashboardmain">
        <div className="flexingphotocontent">
          <div className="phhotodash">
            <div className="photodashimg">
              <img src={user.userimg} alt={user.name} />
            </div>

            <div className="smediaconnectlinks">
              <div
                className="smedia1div"
                id="fbfaa"
                style={{ display: hidefb ? "none" : "initial" }}
              >
                <button onClick={handleGoFacebook}>
                  <FaFacebookF />
                </button>
              </div>

              <div
                className="smedia1div"
                id="igfaa"
                style={{ display: hideig ? "none" : "initial" }}
              >
                <button onClick={handleGoIg}>
                  <AiFillInstagram />
                </button>
              </div>

              <div
                className="smedia1div"
                id="githubfaa"
                style={{ display: hidegithub ? "none" : "initial" }}
              >
                <button onClick={handleGoGithub}>
                  <AiFillGithub />
                </button>
              </div>

              <div
                className="smedia1div"
                id="linkkedinfaa"
                style={{ display: hideLinkedin ? "none" : "initial" }}
              >
                <button onClick={handleGoLinkedin}>
                  <AiFillLinkedin />
                </button>
              </div>
            </div>
          </div>

          <div className="biodashboardd">
            <div className="firstseconndchild">
              {/* <div className="namenadbtnsinsame">
                <div className="usernamehlderdash">
                  <h1 className='accountusername'>{user.name}</h1>
                </div>

                <div className="btnholrgdashbo">
                  <div className='profeftcontparnt'>
                    <button onClick={handleEditProfile} className='editkryieprof' >Edit Profile</button>
                    <button onClick={ButtonSignout} className='editkryieprof'>Sign Out</button>
                  </div>
                </div>
              </div> */}
              <h1 className="accountusername">{user.name}</h1>
              <div className="profile-buttons">
                <button
                  onClick={handleEditProfile}
                  className="editkryieprof "
                  id="sirfcolorchng"
                >
                  Edit Profile
                </button>
                {admin && (
                  <button
                    onClick={handleAdminPanel}
                    className="editkryieprof "
                    id="admin-button"
                  >
                    Admin Panel
                  </button>
                )}
                <button onClick={ButtonSignout} className="editkryieprof">
                  Sign Out
                </button>
              </div>
            </div>

            <div className="biohbhauidhar">
              {editedbio?.split("\n").map((bio, index) => (
                <h3 key={index} style={{ whiteSpace: "pre-line" }}>
                  {bio}
                </h3>
              ))}
            </div>
          </div>
        </div>

        <div className="tab_main" id="tabchangerdashboard">
          <div
            className={`publishedblogs ${
              lebel12 === "publishedblogs" ? "active-link" : ""
            }`}
            onClick={() => {
              setlebel12("publishedblogs");
            }}
          >
            Published Blogs
          </div>

          <div
            className={`allblogs ${lebel12 === "allblogs" ? "active-link" : ""}`}
            onClick={() => {
              setlebel12("allblogs");
            }}
          >
            All Blogs
          </div>

          <div
            className={`likedblogs ${lebel12 === "likedblogs" ? "active-link" : ""}`}
            onClick={() => {
              setlebel12("likedblogs");
            }}
          >
            Liked Blogs
          </div>
        </div>

        <div className="tab_content">
          {lebel12 === "publishedblogs" && <Allblogspublished />}
          {lebel12 === "allblogs" && <Allprovblogs />}
          {lebel12 === "likedblogs" && <Alllikedblogs />}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
