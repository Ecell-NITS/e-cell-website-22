import { useEffect, useState } from "react";
import BlogContext from "./BlogContext";
import axios from "axios";

const BlogContextProvider = ({ children }) => {
  const [blogscreated, setBlogscreated] = useState([]);
  const [sortingOrder, setSortingOrder] = useState("latest");
  const [sortingMessage, setSortingMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [authorid, setAuthorid] = useState("");

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [provisionalBlogs, setProvisionalBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setSortingMessage(` ${sortingOrder} blogs coming...`);
        setIsFetching(true);
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_APIMAIN}/getblogs`
        );
        const sortedBlogs = response.data.sort((a, b) => {
          if (sortingOrder === "latest") {
            return new Date(b.timestamp) - new Date(a.timestamp);
          } else if (sortingOrder === "likes") {
            const likesA = a.likes ? a.likes.length : 0;
            const likesB = b.likes ? b.likes.length : 0;
            return likesB - likesA;
          } else {
            return new Date(a.timestamp) - new Date(b.timestamp);
          }
        });
        setAuthorid(response.data.authorid);

        // setWriteremaill(response.data.writeremail)
        // console.log(`writeremaill: ${writeremaill}`)
        // console.log(response.data)
        setSortingMessage("");
        setBlogscreated(
          sortedBlogs.filter((item) => {
            return item.status === "published";
          })
        );
        setProvisionalBlogs(response.data.filter((blog) => blog.status !== "published")); // provisional blogs are filtered here
        setBlogs(response.data.filter((blog) => blog.status === "published")); // published blogs are filtered here
        setLoading(false);
      } catch (error) {
        console.log("Error fetching blogs:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchBlogs();
  }, [sortingOrder]);
  return (
    <BlogContext.Provider
      value={{
        authorid,
        blogscreated,
        setBlogscreated,
        sortingOrder,
        setSortingOrder,
        isFetching,
        sortingMessage,
        setSortingMessage,
        blogs,
        provisionalBlogs,
        loading,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
