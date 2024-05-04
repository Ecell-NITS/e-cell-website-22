import { useParams } from "react-router";
import Title from "../../../../../components/Admin/Page-title/title";
import styles from "./IndiMsg.module.scss";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IndiMsg = () => {
  const [message, setMessage] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);
  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/getqueries/${id}`, config)
        .then((response) => {
          setMessage(response.data);
        });
    } catch (error) {
      console.error("Failed to retrieve messages", error);
    }
  }, [id, config]);

  const markAsRead = async () => {
    toast.info("Marking as read...");
    axios
      .get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/query-read/${id}`, config)
      .then((response) => {
        setMessage(response.data);
        toast.success("Message read successfully");
      })
      .catch((err) => {
        console.error("Failed to mark as read", err);
        toast.error(`Failed to mark as read`);
      });
  };
  const deleteMesssage = async () => {
    toast.info("Deleting message...");
    axios
      .delete(`${import.meta.env.VITE_REACT_APP_APIMAIN}/deletequery/${id}`, config)
      .then((response) => {
        toast.success("Message deleted successfully");
        setTimeout(() => {
          navigate("/admin/messages");
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to delete message", err);
        toast.error(`Failed to delete message`);
      });
  };

  return (
    <div className="">
      <Title title="User Message" />
      <div className={styles.IndiMsg}>
        <table>
          <tbody>
            <tr>
              <td className={styles.label}>Name</td>
              <td className={styles.content}>{message.name}</td>
            </tr>
            <tr>
              <td className={styles.label}>Email</td>
              <td className={styles.content}>{message.email}</td>
            </tr>
            <tr>
              <td className={styles.label}>Time</td>
              <td className={styles.content}>{message.sentAt}</td>
            </tr>
            <tr>
              <td className={styles.label}>Message</td>
              <td className={styles.content}>{message.message}</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.buttonContainer}>
          {!message.read && (
            <button onClick={markAsRead}>
              Mark as Read <TiTick size="1.5rem" color="green" />
            </button>
          )}
          <button onClick={deleteMesssage}>
            Delete <RxCross2 size="1.5rem" color="red" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndiMsg;
