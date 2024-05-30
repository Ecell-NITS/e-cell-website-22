import { useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useEffect } from "react";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_APIMAIN}/dashboard`,
        config
      );
      setUser(response.data);
      // console.log(response.data.userimg)
      // setIsLoggedIn(true);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUserProfile();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
