import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Resources from "../Resources/Resources";
const BlogRedirect = () => {
  const location = useLocation();
  const currentURL = decodeURIComponent(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      currentURL === "/blog" ||
      currentURL === "/blogs" ||
      currentURL === "/tags" ||
      currentURL === "/tag"
    ) {
      navigate("/resources/#blog_section");
    }
  }, [navigate, currentURL]);
  return <Resources />;
};

export default BlogRedirect;
