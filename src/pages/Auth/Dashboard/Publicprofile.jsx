import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PublicProfile.css";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarTeam from "../../../components/shared/Navbar/NavbarTeam";
import Footer from "../../../components/shared/Footer/Footer";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
const Publicprofile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentURL = decodeURIComponent(location.pathname);
  const authoruniqueid = currentURL.split("/user/")[1];
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");
  const [fb, setFb] = useState("");
  const [ig, setIg] = useState("");
  const [git, setGit] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [hideLinkedin, setHideLinkedin] = useState(false);
  const [hidefb, setHidefb] = useState(false);
  const [hideig, setHideig] = useState(false);
  const [hidegithub, setHidegithub] = useState(false);
  const [fetching, setFetching] = useState(false);

  /* states for fetching blogs*/
  const [blogs, setBlogs] = useState([]);
  const [noblog, setNoblog] = useState(false);

  const handleGoFacebook = () => {
    window.open(`${fb}`, "_blank");
  };

  const handleGoIg = () => {
    window.open(`${ig}`, "_blank");
  };

  const handleGoGithub = () => {
    window.open(`${git}`, "_blank");
  };

  const handleGoLinkedin = () => {
    window.open(`${linkedin}`, "_blank");
  };

  useEffect(() => {
    if (linkedin === undefined) {
      setHideLinkedin(true);
    } else {
      setHideLinkedin(false);
    }
  }, [linkedin]);

  useEffect(() => {
    if (fb === undefined) {
      setHidefb(true);
    } else {
      setHidefb(false);
    }
  }, [fb]);

  useEffect(() => {
    if (ig === undefined) {
      setHideig(true);
    } else {
      setHideig(false);
    }
  }, [ig]);

  useEffect(() => {
    if (git === undefined) {
      setHidegithub(true);
    } else {
      setHidegithub(false);
    }
  }, [git]);

  // console.log(writeremaill)

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        // const response = await axios.get(`http://localhost:2226/publicprofile/${authoruniqueid}`);
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_APIMAIN}/publicprofile/${authoruniqueid}`
        );
        // console.log(response.data)
        setName(response.data.name);
        setBio(response.data.bio);
        setPic(response.data.userimg);
        setFb(response.data.facebook);
        setIg(response.data.instagram);
        setGit(response.data.github);
        setLinkedin(response.data.linkedin);
      } catch (error) {
        if (
          error.response &&
          error.response.data.error === "Failed to retrieve user details"
        ) {
          navigate("/");
          toast.error("No such profile exists", {
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
          console.error("Error fetching Public Profile:", error);
        }
      }
    };
    fetchPublicProfile();
  }, [authoruniqueid, navigate]);

  useEffect(() => {
    const fetchPublicBlogs = async () => {
      try {
        setFetching(true);
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_APIMAIN}/publicwrittenblogs/${authoruniqueid}`
        );
        // const response = await axios.get(`http://localhost:2226/publicwrittenblogs/${authoruniqueid}`)
        setBlogs(response.data);
        // console.log(response.data);
      } catch (error) {
        if (
          error.response &&
          error.response.data.error === "No blogs found for the user"
        ) {
          setNoblog(true);
        }
        console.log("Error fetching Public Profile:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchPublicBlogs();
  }, [authoruniqueid]);

  const screenWidth = window.innerWidth || document.documentElement.clientWidth;
  const tabletPc = screenWidth > 660;

  if (!name) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <NavbarTeam />
      <Helmet>
        <title>{`${name}'s Profile | ECELL NITS`}</title>
        <meta name="description" content="E-CELL NIT SILCHAR" />
      </Helmet>
      <div className="dashboardmain">
        <div className="flexingphotocontent">
          <div className="phhotodash">
            <div className="photodashimg">
              <img src={pic} alt={name} />
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
            <div className="firstseconndchild" id="makeitcenterdamn">
              <h1 className="accountusername">{name}</h1>
            </div>

            <div className="biohbhauidhar">
              {bio.split("\n").map((bio, index) => (
                <h3 key={index} style={{ whiteSpace: "pre-line" }}>
                  {bio}
                </h3>
              ))}
            </div>
          </div>
        </div>

        {/* Published blog section */}
        <div id="paddinginpublishlist">
          <h1 id="publishedblogforusertitle">All Published Blogs</h1>
          {fetching && <p id="loadingkrrhebhaiblogs">Loading Blogs...</p>}
          {noblog && <p id="noblogsmsgstyling">No blogs found for the user</p>}
          <div id="blogs_under_profile_protected">
            {blogs.map((blog) => (
              <div key={blog._id} id="indicardblog_protct">
                <div className="imgholdercontblog">
                  <img src={blog.topicpic} alt="" />
                </div>
                {tabletPc
                  ? blog.title.split("\n").map((paragraph, index) => (
                      <h1
                        key={index}
                        className="titlehainlogindi"
                        style={{ whiteSpace: "pre-line" }}
                        dangerouslySetInnerHTML={{
                          __html:
                            paragraph.length > 58
                              ? paragraph.slice(0, 58) + "..."
                              : paragraph,
                        }}
                      ></h1>
                    ))
                  : blog.title.split("\n").map((paragraph, index) => (
                      <h1
                        key={index}
                        className="titlehainlogindi"
                        style={{ whiteSpace: "pre-line" }}
                        dangerouslySetInnerHTML={{
                          __html: paragraph,
                        }}
                      ></h1>
                    ))}
                <div className="whowrittenblog">
                  <h2>{blog.writernmae}</h2>
                </div>

                <div className="whoholdsthetag">
                  {blog.tag
                    .trim()
                    .split(" ")
                    .map(
                      (word, index) =>
                        word.length > 0 && (
                          <button
                            style={{ cursor: "default" }}
                            key={index}
                            className={index !== 0 ? "buttonmarginlft" : ""}
                          >
                            {word}
                          </button>
                        )
                    )}
                </div>

                <div className="briefintrohldman">
                  {/* <p>{blog.intro}</p> */}
                  {blog.intro.split("\n").map((paragraph, index) => (
                    <p
                      key={index}
                      style={{ whiteSpace: "pre-line" }}
                      dangerouslySetInnerHTML={{
                        __html:
                          paragraph.split(" ").slice(0, 20).join(" ") +
                          (paragraph.split(" ").length > 20 ? "..." : ""),
                      }}
                    ></p>
                  ))}
                </div>

                <Link to={`/blog/${blog._id}`}>
                  {" "}
                  <button className="kretrhereading">Read more</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Publicprofile;
