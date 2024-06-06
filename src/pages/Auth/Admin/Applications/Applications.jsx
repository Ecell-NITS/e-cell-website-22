import { useContext, useEffect, useState } from "react";
import Title from "../../../../components/Admin/Page-title/title";
import styles from "./Applications.module.scss";
import AdminContextProvider from "../../../../context/AdminContextProvider";
import AdminContext from "../../../../context/AdminContext";

const Applications = () => {
  const [team, setTeam] = useState("All");
  const { recruitmentData } = useContext(AdminContext);
  const [applications, setApplications] = useState(recruitmentData);

  const teams = [
    {
      name: "All",
      id: 1,
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
      setApplications(recruitmentData);
    } else {
      const filteredData = recruitmentData.filter((data) => data.domain === team);
      setApplications(filteredData);
    }
  };

  useEffect(() => {
    if (team === "All") {
      setApplications(recruitmentData);
    } else {
      const filteredData = recruitmentData.filter((data) => data.domain === team);
      setApplications(filteredData);
    }
  }, [recruitmentData, team]);

  return (
    <div className={styles.Applications}>
      <Title title="Applications" />
      <div className={styles.team_tab}>
        <div className={styles.tab}>
          {teams.map((team, index) => (
            <button
              className={styles.tab_item}
              key={index}
              onClick={() => handleTeam(team.name)}
            >
              {team.name}
            </button>
          ))}
          <button className={styles.tab_item} onClick={() => handleTeam("UI")}>
            UI/UX
          </button>
        </div>
      </div>
      <div className={styles.applications}>
        <div>
          Team: <strong>{team}</strong>
        </div>
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
                  Team: <strong>{data.domain}</strong>{" "}
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
                        Resume
                      </a>{" "}
                    </strong>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Applications;
