import BlogCard from "../../../../components/Admin/BlogCard/BlogCard";
import Title from "../../../../components/Admin/Page-title/title";
import styles from "./Blogs.module.scss";
import { FaPlus } from "react-icons/fa";
import data from "../../../../Data/sample-blogs.json";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [provisionalBlogs, setProvisionalBlogs] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // all blogs are fetched here
    axios
      .get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/getblogs`, config)
      .then((response) => {
        setProvisionalBlogs(response.data.filter((blog) => blog.status !== "published")); // provisional blogs are filtered here
        setBlogs(response.data.filter((blog) => blog.status === "published")); // published blogs are filtered here
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to retrieve blogs", error);
      });
  }, []);

  return (
    <div className={styles.BlogsAdmin}>
      <div className={styles.header}>
        <Title title="Blogs" />
        <button>
          <Link to="/admin/add-blogs">
            Add Blog <FaPlus size="1.5rem" color="white" />{" "}
          </Link>
        </button>
      </div>
      <h2>Published Blogs</h2>
      {loading && <h1>Loading...</h1>}
      <div className={styles.blogContainer}>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <h2>Provisional Blogs</h2>
      {loading && <h1>Loading...</h1>}
      <div className={styles.blogContainer}>
        {provisionalBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsAdmin;
