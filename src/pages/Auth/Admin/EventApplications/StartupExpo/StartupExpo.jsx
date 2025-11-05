import { useEffect, useState } from "react";
import Title from "../../../../../components/Admin/Page-title/title";
import styles from "../Applications.module.scss";
import { SiMicrosoftexcel } from "react-icons/si";
import exportFromJSON from "export-from-json";
import axios from "axios";

const StartupExpo = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl =
    import.meta.env.VITE_REGISTRATION_API_BASE_URL || "http://localhost:3000";
  const exportData = (fileSuffix = "startup-expo-applicants") => {
    const fileName = fileSuffix;
    const exportType = exportFromJSON.types.csv;
    const data = applications;
    exportFromJSON({ data, fileName, exportType });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        // Note: startup-expo route uses /startup-expo/applications per server
        const res = await axios.get(`${baseUrl}/startup-expo/applications`);
        setApplications(res.data || []);
      } catch (err) {
        console.error("Failed to fetch Startup Expo applications", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [baseUrl]);

  return (
    <div className={styles.Applications}>
      <Title title="Startup Expo Applications" />
      <div className={styles.applications}>
        <div className={styles.flex}>
          <div>
            <p>
              Total Applicants: <strong>{applications.length}</strong>
            </p>
          </div>
          <button className={styles.ExcelIcon} onClick={() => exportData()}>
            <SiMicrosoftexcel size="1.5em" /> Export to excel
          </button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className={styles.applications_container}>
            {applications.map((app, idx) => (
              <div key={app.id || idx} className={styles.application_item}>
                <p>
                  No: <strong>{idx + 1}</strong>
                </p>
                <p>
                  Team Name: <strong>{app.teamName}</strong>
                </p>
                <p>
                  Team Leader: <strong>{app.teamLeaderName}</strong>
                </p>
                {app.teamLeaderScholarId && (
                  <p>
                    Leader Scholar ID: <strong>{app.teamLeaderScholarId}</strong>
                  </p>
                )}
                {app.teamLeaderPhone && (
                  <p>
                    Leader Phone: <strong>{app.teamLeaderPhone}</strong>
                  </p>
                )}
                {app.teamLeaderEmail && (
                  <p>
                    Leader Email: <strong>{app.teamLeaderEmail}</strong>
                  </p>
                )}
                <p>
                  Business Description: <strong>{app.businessDescription}</strong>
                </p>
                {app.driveLink && (
                  <p>
                    Drive Link:{" "}
                    <a href={app.driveLink} target="_blank" rel="noreferrer">
                      {app.driveLink}
                    </a>
                  </p>
                )}
                {app.department && (
                  <p>
                    Department: <strong>{app.department}</strong>
                  </p>
                )}
                {app.year && (
                  <p>
                    Year: <strong>{app.year}</strong>
                  </p>
                )}
                <p>
                  College:{" "}
                  <strong>
                    {app.collegeType === "other" ? app.collegeName : "NIT Silchar"}
                  </strong>
                </p>
                <div>
                  <p>Team Members:</p>
                  {app.teamMembers && app.teamMembers.length > 0 ? (
                    <ul style={{ margin: "0.25rem 0 0 1rem" }}>
                      {app.teamMembers.map((m, i) => (
                        <li key={i} className={styles.member_item}>
                          <div>
                            <p style={{ margin: 0 }}>
                              <strong>{m.name}</strong>
                            </p>
                            {m.scholarId && (
                              <p style={{ margin: 0 }}>Scholar ID: {m.scholarId}</p>
                            )}
                            {m.phone && <p style={{ margin: 0 }}>Phone: {m.phone}</p>}
                            {m.email && (
                              <p style={{ margin: 0 }}>
                                Email: <a href={`mailto:${m.email}`}>{m.email}</a>
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupExpo;
