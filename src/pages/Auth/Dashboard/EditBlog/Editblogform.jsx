import React, { useEffect, useState, useRef } from "react";
import "../../../Resources/Blogs/Createblog.css";
import axios from "axios";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import FileBase64 from "react-file-base64";
import NavbarTeam from "../../../../components/shared/Navbar/NavbarTeam";
import Footer from "../../../../components/shared/Footer/Footer";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const Editblogform = () => {
  const editor = useRef(null);
  const editor0 = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [tag, setTag] = useState("");
  const [topicpic, setTopicpic] = useState("");
  const [content, setContent] = useState("");
  const [writernmae, setWritername] = useState("");
  const [writerintro, setWriterintro] = useState("");
  const [writerpic, setWriterpic] = useState("");
  const [writeremail, setWriteremail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [disablecreate, setDisablecreate] = useState(false);
  const [authorverf, setAuthorverf] = useState("");
  const [loggedinuserid, setLoggedinuserid] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const currentURL = decodeURIComponent(location.pathname);
  const blogId = currentURL.split("/editblog/")[1];

  const handleImgChange = (base64) => {
    setTopicpic(base64);
  };

  useEffect(() => {
    document.title = "Edit Blog | E-Cell NIT Silchar";
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/fetchprofile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const user = response.data;
          setLoggedinuserid(user._id);
          setWritername(user.name);
          setWriterintro(user.bio);
          setWriterpic(user.userimg);
          setWriteremail(user.email);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch user data", error);
          toast.error(`Failed to fetch user data ${error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_APIMAIN}/getblogs/${blogId}`
        );
        setAuthorverf(response.data.authorid);
        setContent(response.data.content);
        setTitle(response.data.title);
        setWriterpic(response.data.writerpic);
        setWriterintro(response.data.writerintro);
        setTopicpic(response.data.topicpic);
        setIntro(response.data.intro);
        setWritername(response.data.writernmae);
        setTag(response.data.tag);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  console.log(`loggedinuserid: ${loggedinuserid}`);
  console.log(`authorverf: ${authorverf}`);
  useEffect(() => {
    if (
      authorverf !== "" &&
      loggedinuserid !== "" &&
      !isLoading &&
      loggedinuserid !== authorverf
    ) {
      toast.error("Only the original author of the blog can edit this blog.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/login");
    }
  }, [authorverf, loggedinuserid, isLoading, navigate]);

  const isEditblogempty = () => {
    return (
      title !== "" || intro !== "" || tag !== "" || content !== "" || topicpic !== ""
    );
  };

  /* button onclick function */
  const submitform = async (event) => {
    event.preventDefault();
    if (!isEditblogempty()) {
      toast.error("Please edit atleast anyone field.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (!writeremail.includes("@") || !writeremail.includes(".")) {
      toast.error("Invalid email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const timestamp = moment().tz("Asia/Kolkata").format();

    setSubmitting(true);
    setDisablecreate(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_APIMAIN}/acceptedblogs`
      );
      const publishedBlogIds = response.data.map((blog) => blog._id);
      // console.log(publishedBlogIds)
      if (publishedBlogIds.includes(blogId)) {
        toast.error("Published blogs can't be edited.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
    } catch (error) {
      console.log("Error fetching blogs:", error);
    } finally {
      setSubmitting(false);
      setDisablecreate(false);
      setTitle("");
      setIntro("");
      setTag("");
      setContent("");
      setTopicpic("");
    }

    setSubmitting(true);
    setDisablecreate(true);
    axios
      .put(
        `${import.meta.env.VITE_REACT_APP_APIMAIN}/editblog/${blogId}`,
        {
          // .put(`http://localhost:2226/editblog/${blogId}`, {
          // .put(import.meta.env.VITE_REACT_APP_CREATEBLOG_RENDER, {
          title,
          tag,
          intro,
          content,
          writernmae,
          writerintro,
          writerpic,
          timestamp,
          topicpic,
          writeremail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTitle("");
        setIntro("");
        setTag("");
        setContent("");
        setWritername("");
        setWriterintro("");
        setWriterpic("");
        setTopicpic("");
        setWriteremail("");
        setSubmitting(false);
        setDisablecreate(false);
        toast.success("Blog edited successfully.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/dashboard");
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavbarTeam />
      <div className="mainblogmake">
        <h2 className="titletopcbl">Edit Blog </h2>
        <div className="firstboxvreateblog">
          <h2 className="ttleinptcrteblog">Title</h2>
          <h4 className="specificttle">Be specific with your title</h4>
          <input
            type="text"
            id="cretaeblogsinpt"
            required
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            placeholder="Enter your title"
            className="input-common-recruit"
          />
        </div>

        <div className="firstboxvreateblog">
          <h2 className="ttleinptcrteblog">Brief Introduction</h2>
          <h4 className="specificttle">
            Write a brief introduction to your blog in about 40-50 words
          </h4>

          <JoditEditor
            ref={editor0}
            value={intro}
            onChange={(newIntro) => setIntro(newIntro)}
            onBlur={(newIntro) => setIntro(newIntro)}
            required
          />
        </div>

        <div className="firstboxvreateblog">
          <h2 className="ttleinptcrteblog">Content</h2>
          <h4 className="specificttle">Write about your topic</h4>

          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => setContent(newContent)}
            required
          />
        </div>

        <div className="firstboxvreateblog">
          <h2 className="ttleinptcrteblog">Tags</h2>
          <h4 className="specificttle">Add tags to describe your blog</h4>
          <h4 className="specificttle">(Separate tags by space like #tag1 #tag2)</h4>
          <input
            type="text"
            required
            value={tag}
            id="cretaeblogsinpt"
            onChange={(event) => {
              setTag(event.target.value);
            }}
            placeholder="Enter tags"
            className="input-common-recruit"
          />
        </div>

        <div className="firstboxvreateblog">
          <h2 className="ttleinptcrteblog">Topic picture</h2>
          <h4 className="specificttle">Add a picture to your blog</h4>

          <h4 className="specificttle">
            Only jpg, jpeg, png, webp, or avif file types of size less than 300KB are
            accepted
          </h4>
          <FileBase64
            multiple={false}
            onDone={({ base64, file }) => {
              if (
                (file.type === "image/png" ||
                  file.type === "image/jpeg" ||
                  file.type === "image/jpg" ||
                  file.type === "image/webp" ||
                  file.type === "image/avif") &&
                file.size <= 300 * 1024
              ) {
                handleImgChange(base64);
              } else {
                toast.error(
                  "Invalid file type or size. Image should be less than 300 KB.",
                  {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  }
                );
                setTopicpic("");
              }
            }}
          >
            {({ file }) => (
              <div>
                {file && file.size <= 300 * 1024 && <p>Selected file: {file.name}</p>}
              </div>
            )}
          </FileBase64>
        </div>

        <div className="firstboxvreateblog" id="writerdivid">
          <h2 className="ttleinptcrteblog">Writer Details</h2>
          <h4 className="specificttle">Name</h4>
          <input
            type="text"
            id="cretaeblogsinpt"
            required
            value={writernmae}
            onChange={(event) => {
              setWritername(event.target.value);
            }}
            placeholder="Enter name"
            className="input-common-recruit"
          />

          <h4 className="specificttle">Email</h4>
          <input
            type="email"
            required
            value={writeremail}
            id="cretaeblogsinpt"
            onChange={(event) => {
              setWriteremail(event.target.value);
            }}
            placeholder="Enter your email"
            className="input-common-recruit"
          />

          <h4 className="specificttle">Brief Introduction</h4>

          <textarea
            rows="3"
            type="text"
            required
            id="cretaeblogsinpt"
            value={writerintro}
            onChange={(event) => {
              setWriterintro(event.target.value);
            }}
            placeholder="Enter intro to be displayed"
            className="input-common-recruit"
          ></textarea>

          <h4 className="specificttle">Photograph</h4>
          <input
            type="text"
            required
            id="cretaeblogsinpt"
            value={writerpic}
            onChange={(event) => {
              setWriterpic(event.target.value);
            }}
            placeholder="Your photograph link"
            className="input-common-recruit"
          />
        </div>

        <button
          onClick={submitform}
          className="kretrhereading"
          id="crteblogbtn0"
          disabled={disablecreate}
          style={{
            opacity: disablecreate ? 0.5 : 1,
            cursor: disablecreate ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Editing Blog..." : "Edit Blog"}{" "}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Editblogform;
