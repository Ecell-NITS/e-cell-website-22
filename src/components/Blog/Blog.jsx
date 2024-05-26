import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { useContext } from "react";
import BlogContext from "../../context/BlogContext";
import "./Blog.css";
import { toast } from "react-toastify";

const Blog = () => {
  const [activeTagFilter, setActiveTagFilter] = useState("");

  const navigate = useNavigate();
  const {
    blogscreated,
    setBlogscreated,
    sortingOrder,
    setSortingOrder,
    isFetching,
    sortingMessage,
    setSortingMessage,
    authorid,
  } = useContext(BlogContext);
  const handleLikeKarp = async (blogId) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_APIMAIN}/api/blogs/${blogId}/like`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedLikes = response.data.likes;
      setBlogscreated((prevBlogs) => {
        return prevBlogs.map((blog) => {
          if (blog._id === blogId) {
            return { ...blog, likesCount: updatedLikes };
          }
          return blog;
        });
      });
      toast.success("You have liked the blog", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "You have already liked this blog"
      ) {
        toast.info("You have already liked this blog", {
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
        console.error("Error liking the blog:", error);
      }
    }
  };

  const handleSortingOrderChange = (order) => {
    setSortingOrder(order);
  };

  const handleTagFilter = (tag) => {
    if (activeTagFilter === tag) {
      setActiveTagFilter("");
    } else {
      setActiveTagFilter(tag);
    }
  };

  const filteredBlogs = activeTagFilter
    ? blogscreated.filter((blog) =>
        blog.tag.toLowerCase().includes(activeTagFilter.toLowerCase())
      )
    : blogscreated;

  const screenWidth = window.innerWidth || document.documentElement.clientWidth;
  const tabletPc = screenWidth > 660;

  return (
    <>
      <div className="collab" id="blog_section">
        <h1 style={{ userSelect: "none" }}>BLOG-SECTION</h1>
      </div>

      <div className="mainblogstarts">
        <div className="leftblogcontent">
          <div className="btnsorting">
            <h2 className="sortkaro">Sort By:</h2>
            <div className="btnlatestoldest">
              <button
                onClick={() => handleSortingOrderChange("latest")}
                className={sortingOrder === "latest" ? "active" : ""}
              >
                Latest
              </button>
              <button
                onClick={() => handleSortingOrderChange("oldest")}
                id="moreold"
                className={sortingOrder === "oldest" ? "active" : ""}
              >
                Oldest
              </button>
              <button
                onClick={() => handleSortingOrderChange("likes")}
                id="moreold"
                className={sortingOrder === "likes" ? "active" : ""}
              >
                Most Liked
              </button>
            </div>
          </div>

          <p>{isFetching ? "Fetching blogs..." : sortingMessage}</p>

          {activeTagFilter ? (
            <>
              {filteredBlogs.length === 0 ? (
                <p className="msgonblogcnt">
                  No blogs found with the tag &quot; {activeTagFilter} &quot;
                </p>
              ) : (
                <p className="msgonblogcnt">
                  <strong>{filteredBlogs.length}</strong>{" "}
                  {filteredBlogs.length > 1 ? "blogs" : "blog"} found with the tag{" "}
                  <strong>&#34;{activeTagFilter}&#34;</strong>
                </p>
              )}
            </>
          ) : (
            <p className="msgonblogcnt">
              <strong>{filteredBlogs.length}</strong>{" "}
              {filteredBlogs.length > 1 ? "blogs" : "blog"} found on the server
            </p>
          )}

          {sortingMessage ? null : (
            <>
              {filteredBlogs.length === 0 ? (
                <p></p>
              ) : (
                <>
                  <div className="mainparentblogindicard">
                    {filteredBlogs.map((blog) => (
                      <div key={blog.name} className="indicardblog">
                        {/* <h1>id: {blog._id}</h1> */}
                        <div className="imgholdercontblog">
                          <img src={blog.topicpic} alt="" id="hoverscaledown" />
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
                          <Link to={`/user/${blog.authorid}`}>
                            <h2>{blog.writernmae}</h2>
                          </Link>
                        </div>

                        <div className="whoholdsthetag">
                          {blog.tag
                            .trim()
                            .split(" ")
                            .map(
                              (word, index) =>
                                word.length > 0 && (
                                  // eslint-disable-next-line react/jsx-key
                                  <Link
                                    to={`/tag/${word.replace("#", "")}`}
                                    id="tagbuttonidlink"
                                    // key={index}
                                  >
                                    <button
                                      key={index}
                                      className={index !== 0 ? "buttonmarginlft" : ""}
                                    >
                                      {" "}
                                      {word}
                                    </button>
                                  </Link>
                                )
                            )}
                        </div>

                        <div className="briefintrohldman">
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

                        <div id="btnholderslikeread">
                          <button
                            className="likekarobhaiblog"
                            onClick={() => handleLikeKarp(blog._id)}
                          >
                            <BiLike /> {blog.likes ? blog.likes.length : 0}
                          </button>

                          <Link to={`/blog/${blog._id}`}>
                            {" "}
                            <button className="kretrhereading">Read more</button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="rightblogcontent">
          <Link to="/createblog">
            <button className="newblogaddbtn">ADD NEW BLOG +</button>
          </Link>

          <div className="btnfiltertag">
            <button
              onClick={() => handleTagFilter("startup")}
              className={`activetagcolored ${
                activeTagFilter === "startup" ? "active" : ""
              }`}
            >
              Startup
            </button>
            <button
              onClick={() => handleTagFilter("technology")}
              className={`activetagcolored ${
                activeTagFilter === "technology" ? "active" : ""
              }`}
            >
              Technology
            </button>
            <button
              onClick={() => handleTagFilter("entrepreneur")}
              className={`activetagcolored ${
                activeTagFilter === "entrepreneur" ? "active" : ""
              }`}
              id="btnthirdtag"
            >
              Entrepreneur
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
