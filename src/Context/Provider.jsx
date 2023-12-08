import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [publishedBlog, setPublishedBlog] = useState([]);
  const [alllAccount, setAllAccount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [PublishedBlogRes, AllAccountsRes] = await Promise.all([
          axios.get(import.meta.env.VITE_REACT_APP_ACCEPTEDBLOGS_RENDER),
          axios.get(`http://localhost:3000/allaccounts`),
        ]);

        setPublishedBlog(PublishedBlogRes.data);
        setAllAccount(AllAccountsRes.data.users);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({ publishedBlog, alllAccount }),
    [publishedBlog, alllAccount]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export { ContextProvider, UserContext };
