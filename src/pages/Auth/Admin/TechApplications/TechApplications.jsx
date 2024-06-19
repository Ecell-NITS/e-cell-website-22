import { useContext, useEffect, useState } from "react";
import Title from "../../../../components/Admin/Page-title/title";
import styles from "./Applications.module.scss";
import AdminContextProvider from "../../../../context/AdminContextProvider";
import AdminContext from "../../../../context/AdminContext";
import ApplicantsContext from "../../../../context/ApplicantsContext";

const TechApplications = () => {
  const [team, setTeam] = useState("All");
  const { techData, techDataLoading } = useContext(ApplicantsContext);
  const [applications, setApplications] = useState(techData);

  const teams = [
    {
      name: "All",
      id: 1,
    },
    {
      name: "UI",
      id: 2,
    },
    {
      name: "Web",
      id: 3,
    },
    {
      name: "Flutter",
      id: 4,
    },
  ];

  const handleTeam = (team) => {
    setTeam(team);
    if (team === "All") {
      setApplications(techData);
    } else {
      const filteredData = techData.filter((data) => data.domain === team);
      setApplications(filteredData);
    }
  };

  useEffect(() => {
    if (team === "All") {
      setApplications(techData);
    } else {
      const filteredData = techData.filter((data) => data.domain === team);
      setApplications(filteredData);
    }
  }, [techData, team]);

  return (
    <div className={styles.Applications}>
      <Title title="Applications" />
      <div className={styles.team_tab}>
        <div className={styles.tab}>
          {teams.map((t, index) => (
            <button
              className={`${styles.tab_item} ${team === t.name ? styles.active : ""}`}
              key={index}
              onClick={() => handleTeam(t.name)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.applications}>
        <div>
          <p>
            Team: <strong>{team}</strong>
          </p>
          <p>
            Total Applicants: <strong>{applications.length}</strong>
          </p>
        </div>
        {techDataLoading ? (
          <div>Loading...</div>
        ) : (
          <div className={styles.applications_container}>
            {applications.map((data, index) => {
              return (
                <div key={data.id} className={styles.application_item}>
                  <p>
                    No: <strong>{index + 1}</strong>{" "}
                  </p>
                  <p>
                    Name: <strong>{data.name}</strong>{" "}
                  </p>
                  <p>
                    Team: <strong>{data.domain}</strong>{" "}
                  </p>
                  <p>
                    Scholar ID: <strong>{data.scholarId}</strong>{" "}
                  </p>
                  <p>
                    Phone: <strong>{data.number}</strong>{" "}
                  </p>
                  <p>
                    Email: <strong>{data.email}</strong>{" "}
                  </p>
                  <p>
                    Resume:{" "}
                    <strong>
                      {" "}
                      <a href={data.resumeUrl} target="_blank" rel="noreferrer">
                        Resume
                      </a>{" "}
                    </strong>
                  </p>
                  {data.githubUrl && (
                    <p>
                      Github:{" "}
                      <strong>
                        {" "}
                        <a href={data.githubUrl} target="_blank" rel="noreferrer">
                          Github
                        </a>{" "}
                      </strong>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechApplications;
