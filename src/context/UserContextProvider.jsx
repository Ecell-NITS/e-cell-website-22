import { useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

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
    } catch (error) {
      localStorage.removeItem("token");
      toast.error("Login expired,please login again");
      console.error("Error fetching user profile:", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUserProfile();
      // if (!user) {
      //   localStorage.removeItem("token");
      // }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
