import { useState } from "react";
import styles from "./BlogCard.module.scss";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BlogCard = ({ blog }) => {
  const [isPublished, setIsPublished] = useState(blog.status === "published");
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  // console.log(blog.status );

  const handlePublish = async (id) => {
    setPublishing(true);
    if (!window.confirm("Are you sure you want to publish this blog?")) {
      setPublishing(false);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_APIMAIN}/publishblog/${id}`, config)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Blog Published Successfully");
            setIsPublished(true);
          }
        });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setPublishing(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      setDeleting(false);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .delete(`${import.meta.env.VITE_REACT_APP_APIMAIN}/deleteblog/${id}`, config)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Blog Deleted Successfully");
            window.location.reload();
          }
        });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setDeleting(false);
    }
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
        <button
          disabled={isPublished || publishing}
          onClick={() => handlePublish(blog._id)}
        >
          {isPublished ? (
            "Published"
          ) : publishing ? (
            "Publishing..."
          ) : (
            <p>
              {" "}
              Publish <TiTick size="1.5rem" color="green" />{" "}
            </p>
          )}
        </button>
        <button className={styles.deleteBtn} onClick={() => handleDelete(blog._id)}>
          {deleting ? "Deleting..." : "Delete"}
          <RxCross2 size="1.5rem" color="red" />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
