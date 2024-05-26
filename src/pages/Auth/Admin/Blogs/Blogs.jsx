import BlogCard from "../../../../components/Admin/BlogCard/BlogCard";
import Title from "../../../../components/Admin/Page-title/title";
import styles from "./Blogs.module.scss";
import { FaPlus } from "react-icons/fa";
import data from "../../../../Data/sample-blogs.json";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import BlogContext from "../../../../context/BlogContext";

const BlogsAdmin = () => {
  const { blogs, provisionalBlogs, loading } = useContext(BlogContext);

  useEffect(() => {}, []);

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
