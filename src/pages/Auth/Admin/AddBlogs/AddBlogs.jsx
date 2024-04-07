import Title from "../../../../components/Admin/Page-title/title";
import Createblog from "../../../Resources/Blogs/Createblog";
import styles from "./AddBlogs.module.scss";

const AddBlogsAdmin = () => {
  return (
    <div className=" AddBlogsAdmin">
      {/* <Title title=" Add Blogs" /> */}
      <Createblog />
    </div>
  );
};

export default AddBlogsAdmin;
