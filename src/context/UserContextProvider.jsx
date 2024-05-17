import { useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useEffect } from "react";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_APIMAIN}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data);
        // console.log(response.data.userimg)
        // setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (localStorage.getItem("token")) {
      fetchUserProfile();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
