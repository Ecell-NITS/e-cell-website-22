import { useEffect, useState } from "react";
import Title from "../../../../../components/Admin/Page-title/title";
import styles from "../Applications.module.scss";
import { SiMicrosoftexcel } from "react-icons/si";
import exportFromJSON from "export-from-json";
import axios from "axios";

const BidWise = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl =
    import.meta.env.VITE_REGISTRATION_API_BASE_URL || "http://localhost:3000";

  const exportData = (fileSuffix = "bidwise-applicants") => {
    const fileName = fileSuffix;
    const exportType = exportFromJSON.types.csv;
    const data = applications;
    exportFromJSON({ data, fileName, exportType });
  };

  const safeParseMembers = (teamMembers) => {
    if (!teamMembers) return [];
    if (Array.isArray(teamMembers)) return teamMembers;
    try {
      return JSON.parse(teamMembers);
    } catch (e) {
      return [];
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${baseUrl}/bid-wise/all`);
        setApplications(res.data || []);
      } catch (err) {
        console.error("Failed to fetch Bid-Wise applications", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [baseUrl]);

  return (
    <div className={styles.Applications}>
      <Title title="Bid-Wise Applications" />
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
            {applications.map((app, idx) => {
              const members = safeParseMembers(app.teamMembers);
              return (
                <div key={app.id || idx} className={styles.application_item}>
                  <p>
                    No: <strong>{idx + 1}</strong>
                  </p>
                  <p>
                    Team Name: <strong>{app.teamName}</strong>
                  </p>
                  <p>
                    Leader: <strong>{app.teamLeaderName}</strong>
                  </p>

                  {app.teamLeaderScholarId ? (
                    <p>
                      Scholar ID: <strong>{app.teamLeaderScholarId}</strong>
                    </p>
                  ) : null}

                  {app.teamLeaderPhone ? (
                    <p>
                      Phone: <strong>{app.teamLeaderPhone}</strong>
                    </p>
                  ) : null}

                  {app.teamLeaderEmail ? (
                    <p>
                      Email: <strong>{app.teamLeaderEmail}</strong>
                    </p>
                  ) : null}

                  <p>
                    College:{" "}
                    <strong>
                      {app.collegeType === "other"
                        ? app.collegeName || app.collegeType
                        : app.collegeType}
                    </strong>
                  </p>

                  {(app.department || app.year) && (
                    <p>
                      Department/Year:{" "}
                      <strong>
                        {app.department || "N/A"}
                        {app.department && app.year
                          ? ` / ${app.year}`
                          : app.year
                            ? ` / ${app.year}`
                            : ""}
                      </strong>
                    </p>
                  )}

                  {app.id && (
                    <p>
                      Application ID: <strong>{app.id}</strong>
                    </p>
                  )}

                  {app.createdAt && (
                    <p>
                      Registered At:{" "}
                      <strong>{new Date(app.createdAt).toLocaleString()}</strong>
                    </p>
                  )}

                  <div>
                    <p>Team Members:</p>
                    {members && members.length > 0 ? (
                      <ul>
                        {members.map((m, i) => (
                          <li key={m.phone || m.name || i} style={{ marginBottom: 8 }}>
                            <div>
                              <strong>{m.name || "Unnamed"}</strong>
                            </div>
                            {m.scholarId ? (
                              <div>
                                Scholar ID: <strong>{m.scholarId}</strong>
                              </div>
                            ) : null}
                            {m.phone ? (
                              <div>
                                Phone: <strong>{m.phone}</strong>
                              </div>
                            ) : null}
                            {m.email ? (
                              <div>
                                Email: <strong>{m.email}</strong>
                              </div>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div>N/A</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BidWise;
