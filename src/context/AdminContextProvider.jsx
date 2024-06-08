import { useContext, useEffect, useMemo, useState } from "react";
import AdminContext from "./AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import UserContext from "./UserContext";

const AdminContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);

  //   context approach for message page start
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recruitDataLoading, setRecruitDataLoading] = useState(true);
  const [recruitmentData, setRecruitmentData] = useState([]);

  const { user } = useContext(UserContext);

  const markAsRead = (id) => {
    toast.info("Marking as read...");
    axios
      .get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/query-read/${id}`, config)
      .then((response) => {
        toast.success("Message read successfully");
        setMessages(
          messages.map((item) => (item._id === id ? { ...item, read: true } : item))
        );
      })
      .catch((err) => {
        console.error("Failed to mark as read", err);
        toast.error(`Failed to mark as read`);
      });
  };

  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/getqueries`, config)
        .then((response) => {
          setMessages(response.data);
          setLoading(false);
        });
    } catch (error) {
      console.error("Failed to retrieve messages", error);
      toast.error("Failed to retrieve messages");
    }
  }, [config]);

  //   context approach for message page end

  //   context approach for users page start
  const [users, setUsers] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      await axios
        .get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/allaccounts`, config)
        .then((response) => {
          setUsers(response.data.users);
          setUserLoading(false);
        })
        .catch((err) => {
          console.error("Failed to retrieve users", err);
          toast.error("Failed to retrieve users");
        });
    };
    if (user.role === "superadmin") {
      fetchUsers();
    }
  }, [config, user]);

  const makeClient = (email) => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/makeclient/${email}`, config)
      .then((response) => {
        console.log(response);
        toast.success("Role changed to client");
      })
      .catch((err) => {
        console.error("Failed to change role", err);
        toast.error("Failed to change role");
      });
  };

  const makeAdmin = (email) => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/makeadmin/${email}`, config)
      .then((response) => {
        console.log(response);
        toast.success("Role changed to admin");
      })
      .catch((err) => {
        console.error("Failed to change role", err);
        toast.error("Failed to change role");
      });
  };

  //   context approach for users page end

  //  context approach for recruitment page start

  useEffect(() => {
    const fetchTechRecruitData = async () => {
      try {
        axios
          .get(`${import.meta.env.VITE_REACT_APP_TECH_RECRUIT_API}/applications`, config)
          .then((response) => {
            setRecruitmentData(response.data);
            setRecruitDataLoading(false);
          });
      } catch (error) {
        console.error("Failed to retrieve recruitment data", error);
        toast.error("Failed to retrieve recruitment data");
      }
    };
    const fetchAllRecruitData = async () => {
      try {
        axios
          .get(`${import.meta.env.VITE_REACT_APP_RECRUIT_API}/applications`, config)
          .then((response) => {
            setRecruitmentData((prev) => [...prev, ...response.data]);
            setRecruitDataLoading(false);
          });
      } catch (error) {
        console.error("Failed to retrieve recruitment data", error);
        toast.error("Failed to retrieve recruitment data");
      }
    };

    fetchTechRecruitData();
    fetchAllRecruitData();
  }, [config, user]);

  //  context approach for recruitment page end
  return (
    <AdminContext.Provider
      value={{
        messages,
        setMessages,
        loading,
        setLoading,
        markAsRead,
        users,
        setUsers,
        userLoading,
        makeClient,
        makeAdmin,
        recruitmentData,
        recruitDataLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
