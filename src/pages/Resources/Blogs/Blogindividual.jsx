import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Blogindi.css";
import { useParams } from "react-router-dom";
import NavbarTeam from "../../../components/shared/Navbar/NavbarTeam";
import Footer from "../../../components/shared/Footer/Footer";
import { Helmet } from "react-helmet";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";
import { AiFillRedditCircle } from "react-icons/ai";
import { FaClock } from "react-icons/fa";
import Comments from "./Comments";
import ProgressiveBar from "./ProgressiveBar";
// import Blog from '../../../components/Blog/Blog';
const Blogindividual = () => {
  const { _id } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [writerpic, setWriterpic] = useState("");
  const [writerintro, setWriterintro] = useState("");
  const [topicpic, setTopicpic] = useState("");
  const [intro, setIntro] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [writername, setWritername] = useState("");
  const [writeremaill, setWriteremaill] = useState("");
  const [authoruniqueid, setAuthoruniqueid] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [readingtime, setReadingtime] = useState("");
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_REACT_APP_FETCHBLOG_RENDER + "/" + _id
        );
        // const response = await axios.get(`http://localhost:2226/getblogs/${_id}`);
        setContent(response.data.content);
        setTitle(response.data.title);
        setWriterpic(response.data.writerpic);
        setWriterintro(response.data.writerintro);
        setTopicpic(response.data.topicpic);
        setIntro(response.data.intro);
        setWritername(response.data.writernmae);
        setTimestamp(response.data.timestamp);
        setWriteremaill(response.data.writeremail);
        setAuthoruniqueid(response.data.authorid);

        const wordsPerMinute = 183;
        const wordCount = response.data.content.split(" ").length;
        const time = Math.ceil(wordCount / wordsPerMinute);
        setReadingtime(time);
      } catch (error) {
        console.log("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [_id]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 991) {
        const scrolled = window.pageYOffset;
        const parallaxContainer = document.querySelector(".parallax-container");
        parallaxContainer.style.transform = `translate3d(0, ${scrolled * 0.6}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  const handleBackToResorces = () => {
    navigate("/resources");
  };

  const currentURL = decodeURIComponent(window.location.origin + location.pathname);
  // console.log(currentURL)
  const handleShareToFb = () => {
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`;
    window.open(facebookShareURL, "_blank");
    // console.log(facebookShareURL);
  };

  const handleShareToReddit = () => {
    const redditShareURL = `https://www.reddit.com/submit?url=${currentURL}`;
    window.open(redditShareURL, "_blank");
  };

  const handleShareToTwitter = () => {
    const twitterShareURL = `https://twitter.com/intent/tweet?url=${currentURL}`;
    window.open(twitterShareURL, "_blank");
  };

  const handleShareToLinkedin = () => {
    const linkedinShareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${currentURL}`;
    window.open(linkedinShareURL, "_blank");
  };

  const handlePublicProfile = () => {
    navigate(`/user/${authoruniqueid}`);
  };

  return (
    <>
      <NavbarTeam />
      <ProgressiveBar />
      <Helmet>
        <title>{title} | The E-Cell NITS Blog</title>
      </Helmet>
      <div className="topicpicimgstyled">
        <div className="parallax-container">
          <img src={topicpic} alt="" />
        </div>
      </div>
      <div className="indiviualblog">
        <h1>{title}</h1>
        {/* <p>{intro}</p> */}
        <div id="reading-author-name">
          <h6 className="dateandtimeofpost">
            Posted by{" "}
            <span onClick={handlePublicProfile} id="writerimpspan">
              {writername}{" "}
            </span>
          </h6>
          <h6>
            {" "}
            <FaClock /> {readingtime} {readingtime > 1 ? "minutes" : "minute"} read
          </h6>
        </div>
        {intro.split("\n").map((paragraph, index) => (
          <p
            key={index}
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          ></p>
        ))}

        {content.split("\n").map((paragraph, index) => (
          <p
            key={index}
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          ></p>
        ))}

        <div className="writerdetails">
          <div className="imgholderwriter">
            <img src={writerpic} alt="" />
          </div>

          <div className="writerintro">
            <h1 id="nameinwriterindiblog" onClick={handlePublicProfile}>
              {writername}
            </h1>
            {writerintro.split("\n").map((writerintro, index) => (
              <p key={index} style={{ whiteSpace: "pre-line" }}>
                {writerintro}
              </p>
            ))}
          </div>
        </div>

        <div className="bottomindiblogftr">
          <button onClick={handleBackToResorces} id="btnbacktoresoucres">
            <IoIosArrowBack />
            Back to Resources
          </button>

          <div className="smedisharetoicons">
            <button onClick={handleShareToFb}>
              <BsFacebook />
            </button>
            <button onClick={handleShareToReddit}>
              <AiFillRedditCircle />
            </button>
            <button onClick={handleShareToTwitter}>
              <BsTwitter />
            </button>
            <button onClick={handleShareToLinkedin}>
              <BsLinkedin />
            </button>
          </div>
        </div>
        <Comments />
      </div>
      <Footer />
    </>
  );
};

export default Blogindividual;
