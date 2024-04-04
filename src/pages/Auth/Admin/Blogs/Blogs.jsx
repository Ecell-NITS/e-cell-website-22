import BlogCard from "../../../../components/Admin/BlogCard/BlogCard";
import Title from "../../../../components/Admin/Page-title/title";
import styles from "./Blogs.module.scss";
import { FaPlus } from "react-icons/fa";
import blogs from "../../../../data/sample-blogs.json";
import { Link } from "react-router-dom";

const BlogsAdmin = () => {
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
      <div className={styles.blogContainer}>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsAdmin;
