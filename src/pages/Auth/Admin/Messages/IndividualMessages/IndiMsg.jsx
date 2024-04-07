import { useParams } from "react-router";
import Title from "../../../../../components/Admin/Page-title/title";
import messageData from "../../../../../Data/sample-messages.json";
import styles from "./IndiMsg.module.scss";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const IndiMsg = () => {
  const { id } = useParams();
  const message = messageData.find((item) => {
    return item.id == id;
  });
  return (
    <div className="">
      <Title title="User Message" />
      <div className={styles.IndiMsg}>
        <table>
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
            <td className={styles.content}>{message.createdAt}</td>
          </tr>
          <tr>
            <td className={styles.label}>Message</td>
            <td className={styles.content}>{message.message}</td>
          </tr>
        </table>
        <div className={styles.buttonContainer}>
          <button>
            Mark as Read <TiTick size="1.5rem" color="green" />
          </button>
          <button>
            Delete <RxCross2 size="1.5rem" color="red" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndiMsg;
