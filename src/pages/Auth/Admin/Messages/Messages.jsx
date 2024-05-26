import Title from "../../../../components/Admin/Page-title/title";
import styles from "./Messages.module.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminContext from "../../../../context/AdminContext";

const Messages = () => {
  const { messages, setMessages, loading, setLoading, markAsRead } =
    useContext(AdminContext);

  let unreadMessages = messages.filter((item) => item.read === false);
  let readMessages = messages.filter((item) => item.read === true);

  return (
    <div className={styles.Messages}>
      <Title title="Messages" />
      <div className={styles.MessagesBox}>
        <table>
          <thead>
            <tr>
              <th className={styles.slNo}>Sl. No.</th>
              <th className={styles.name}>Name</th>
              <th className={styles.email}>Email</th>
              <th className={styles.message}>Message</th>
            </tr>
          </thead>
        </table>
        <h3>Unread</h3>
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <table>
            <tbody className={styles.Container}>
              {unreadMessages.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className={styles.slNo}>{index + 1}</td>
                    <td className={styles.name}>{item.name}</td>
                    <td className={styles.email}>{item.email}</td>
                    <td className={styles.message}>
                      <p>{`${
                        item.message.length < 100
                          ? item.message
                          : `${item.message.slice(0, 100)}...`
                      }`}</p>
                      <div className={styles.ButtonContainer}>
                        {item.message.length > 100 && (
                          <Link to={`/admin/messages/${item._id}`}>
                            <button>Read more</button>
                          </Link>
                        )}
                        <button onClick={() => markAsRead(item._id)}>Mark as read</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {!loading && unreadMessages.length === 0 && <h4>No unread messages</h4>}
        <h3>Read</h3>
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <table>
            <tbody className={styles.Container}>
              {readMessages.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className={styles.slNo}>{index + 1}</td>
                    <td className={styles.name}>{item.name}</td>
                    <td className={styles.email}>{item.email}</td>
                    <td className={styles.message}>
                      <p>{`${
                        item.message.length < 100
                          ? item.message
                          : `${item.message.slice(0, 100)}...`
                      }`}</p>
                      <div className={styles.ButtonContainer}>
                        {item.message.length > 100 && (
                          <Link to={`/admin/messages/${item._id}`}>
                            <button>Read more</button>
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {!loading && readMessages.length === 0 && <h4>No read messages</h4>}
      </div>
    </div>
  );
};

export default Messages;
