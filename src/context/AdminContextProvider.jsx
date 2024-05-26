import { useEffect, useMemo, useState } from "react";
import AdminContext from "./AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

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
    const fetchUsers = () => {
      axios
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
    fetchUsers();
  }, [config]);

  const makeClient = (email) => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/makeclient/${email}`, config)
      .then((response) => {
        setUsers(
          users.map((user) => (user.email === email ? { ...user, role: "client" } : user))
        );
        toast.success("Role changed to client");
      })
      .catch((err) => {
        console.error("Failed to change role", err);
        toast.error("Failed to change role");
      });
  };

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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
