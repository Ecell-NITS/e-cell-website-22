import Title from "../../../../../components/Admin/Page-title/title";
import styles from "./BlogReview.module.scss";
import { useParams } from "react-router";
import blogs from "../../../../../data/sample-blogs.json";

const BlogReview = () => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id == id);
  return (
    <div className={styles.BlogReview}>
      <Title title={`${blog.title}`} />
    </div>
  );
};

export default BlogReview;
