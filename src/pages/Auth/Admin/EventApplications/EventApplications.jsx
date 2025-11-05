import Title from "../../../../components/Admin/Page-title/title";
import styles from "./Applications.module.scss";
import { Link } from "react-router-dom";

const EventApplications = () => {
  return (
    <div className={styles.Applications}>
      <Title title="Event Applications" />
      <div className={styles.event_buttons}>
        <Link to="./Adovation" className={styles.event_button}>
          Adovation
        </Link>
        <Link to="./BidWise" className={styles.event_button}>
          Bid-Wise
        </Link>
        <Link to="./BusinessHackathon" className={styles.event_button}>
          Business Hackathon
        </Link>
        <Link to="./StartupExpo" className={styles.event_button}>
          Startup Expo
        </Link>
        <Link to="./TreasureHunt" className={styles.event_button}>
          Treasure Hunt
        </Link>
      </div>
    </div>
  );
};

export default EventApplications;
