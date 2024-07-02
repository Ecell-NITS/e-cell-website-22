import { useContext, useEffect, useState } from "react";
import Title from "../../../../components/Admin/Page-title/title";
import styles from "./Applications.module.scss";
import ApplicantsContext from "../../../../context/ApplicantsContext";
import { SiMicrosoftexcel } from "react-icons/si";
import exportFromJSON from "export-from-json";

const Applications = () => {
  const [team, setTeam] = useState("All");
  const { recruitmentData, recruitDataLoading } = useContext(ApplicantsContext);
  const [applications, setApplications] = useState(recruitmentData);

  const teams = [
    {
      name: "All",
      id: 1,
    },
    {
      name: "Curation",
      id: 5,
    },
    {
      name: "Design",
      id: 6,
    },
    {
      name: "Event",
      id: 7,
    },
    {
      name: "Content",
      id: 8,
    },
    {
      name: "Publicity",
      id: 9,
    },
    {
      name: "Marketing",
      id: 10,
    },
    {
      name: "Collaboration",
      id: 11,
    },
  ];

  const handleTeam = (team) => {
    setTeam(team);
    if (team === "All") {
      setApplications(recruitmentData);
    } else {
      const filteredData = recruitmentData.filter((data) => data.teams.includes(team));
      setApplications(filteredData);
    }
  };

  const exportData = () => {
    const fileName = `${team}-applicants`;
    const exportType = exportFromJSON.types.csv;
    const data = applications;
    exportFromJSON({ data, fileName, exportType });
  };

  useEffect(() => {
    if (team === "All") {
      setApplications(recruitmentData);
    } else {
      const filteredData = recruitmentData.filter((data) => data.teams.includes(team));
      setApplications(filteredData);
    }
  }, [recruitmentData, team]);

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
        <div className={styles.flex}>
          <div>
            <p>
              Team: <strong>{team}</strong>
            </p>
            <p>
              Total Applicants: <strong>{applications.length}</strong>
            </p>
          </div>
          <button className={styles.ExcelIcon} onClick={exportData}>
            <SiMicrosoftexcel size="1.5em" /> Export to excel
          </button>
        </div>
        {recruitDataLoading ? (
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
                    Team:{" "}
                    <strong>
                      {data.teams.map((team, index) => {
                        return (
                          <span key={index}>
                            {team}
                            {index !== data.teams.length - 1 ? ", " : ""}
                          </span>
                        );
                      })}
                    </strong>{" "}
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
                    Why do you want to join E-cell:
                    {data.WhyEcell.includes("https://") ? (
                      <a target="_blank" rel="noreferrer" href={data.WhyEcell}>
                        {" "}
                        <strong>{data.WhyEcell}</strong>
                      </a>
                    ) : (
                      <strong>{data.WhyEcell}</strong>
                    )}
                  </p>
                  <p>
                    Contribution towards E-cell:
                    {data.contribution.includes("https://") ? (
                      <a target="_blank" rel="noreferrer" href={data.contribution}>
                        {" "}
                        <strong>{data.contribution}</strong>
                      </a>
                    ) : (
                      <strong>{data.contribution}</strong>
                    )}
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

export default Applications;
