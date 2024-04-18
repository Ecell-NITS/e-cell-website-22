import { useState } from "react";
import styles from "./BlogCard.module.scss";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BlogCard = ({ blog }) => {
  const [isPublished, setIsPublished] = useState(blog.status === "published");
  // console.log(blog.status );

  const handlePublish = (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${import.meta.env.VITE_REACT_APP_APIMAIN}/publishblog/${id}`, config)
      .then((res) => {
        toast.success("Blog Published Successfully");
      })
      .catch((err) => {
        toast.error("Failed to Publish Blog");
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${import.meta.env.VITE_REACT_APP_APIMAIN}/deleteblog/${id}`, config)
      .then((res) => {
        toast.success("Blog Deleted Successfully");
      })
      .catch((err) => {
        toast.error("Failed to Delete Blog");
      });
  };
  return (
    <div className={styles.blogCard}>
      <div className={styles.blogCardHeader}>
        <h3>
          {`${blog.title.slice(0, 40)}${blog.title.length < 40 ? "" : "..."}` ||
            "Blog Title"}
        </h3>
        <p>{blog.writernmae || "Author Name"}</p>
      </div>
      <div className={styles.blogCardBody}>
        {blog.intro.split("\n").map((paragraph, index) => (
          <p
            key={index}
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          ></p>
        ))}
      </div>
      <div className={styles.blogCardFooter}>
        <Link to={`/blog/${blog._id}`}>
          <button className={styles.editBtn}>Read more</button>
        </Link>
        <button disabled={isPublished} onClick={() => handlePublish(blog._id)}>
          {!isPublished ? (
            <>
              Publish <TiTick size="1.5rem" color="green" />
            </>
          ) : (
            "Published"
          )}
        </button>
        <button className={styles.deleteBtn} onClick={() => handleDelete(blog._id)}>
          Delete <RxCross2 size="1.5rem" color="red" />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
