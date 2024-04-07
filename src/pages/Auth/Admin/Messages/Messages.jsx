import Title from "../../../../components/Admin/Page-title/title";
import styles from "./Messages.module.scss";
import messagesData from "../../../../Data/sample-messages.json";
import { Link } from "react-router-dom";

const Messages = () => {
  const unreadMessages = messagesData.filter((item) => item.read === false);
  const readMessages = messagesData.filter((item) => item.read === true);

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
          <tbody>
            <h3>Unread</h3>
            <div className={styles.Container}>
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
                          <Link to={`/admin/messages/${item.id}`}>
                            <button>Read more</button>
                          </Link>
                        )}
                        <button>Mark as read</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </div>
            <h3>Read</h3>
            <div className={styles.Container}>
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
                          <Link to={`/admin/messages/${item.id}`}>
                            <button>Read more</button>
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
