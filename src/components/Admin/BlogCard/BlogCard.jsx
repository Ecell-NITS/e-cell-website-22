import styles from "./BlogCard.module.scss";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className={styles.blogCard}>
      <div className={styles.blogCardHeader}>
        <h3>
          {`${blog.title.slice(0, 40)}${blog.title.length < 40 ? "" : "..."}` ||
            "Blog Title"}
        </h3>
        <p>{blog.author || "Author Name"}</p>
      </div>
      <div className={styles.blogCardBody}>
        <p>
          {`${blog.content.slice(0, 250)}${blog.content.length < 250 ? "" : "..."}` ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec erat nec turpis fringilla aliquam. Nullam auctor, nunc nec fermentum fermentum, eros odio tincidunt purus, nec aliquam purus purus et purus. Nullam nec erat nec turpis fringilla aliquam. Nullam auctor, nunc nec fermentum fermentum, eros odio tincidunt purus, nec aliquam purus purus et purus."}
        </p>
      </div>
      <div className={styles.blogCardFooter}>
        <Link to={`/admin/blogs/review/${blog.id}`}>
          <button className={styles.editBtn}>
            Review <CiSearch size="1.5rem" color="white" />
          </button>
        </Link>
        <button className={styles.deleteBtn}>
          Delete <RxCross2 size="1.5rem" color="red" />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
