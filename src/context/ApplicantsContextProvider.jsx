import { useEffect, useMemo, useState } from "react";
import ApplicantsContext from "./ApplicantsContext";
import axios from "axios";
import { toast } from "react-toastify";

const ApplicantsContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);

  const [techDataLoading, setTechDataLoading] = useState(true);
  const [recruitDataLoading, setRecruitDataLoading] = useState(true);
  const [recruitmentData, setRecruitmentData] = useState([]);
  const [techData, setTechData] = useState([]);

  useEffect(() => {
    const fetchTechRecruitData = async () => {
      try {
        axios
          .get(`${import.meta.env.VITE_REACT_APP_RECRUIT_API}/submit`, config)
          .then((response) => {
            setTechData(response.data);
            setTechDataLoading(false);
          });
      } catch (error) {
        console.error("Failed to retrieve recruitment data", error);
        toast.error("Failed to retrieve recruitment data");
      }
    };
    const fetchAllRecruitData = async () => {
      try {
        axios
          .get(`${import.meta.env.VITE_REACT_APP_RECRUIT_API}/applications`, config)
          .then((response) => {
            setRecruitmentData(response.data);
            setRecruitDataLoading(false);
          });
      } catch (error) {
        console.error("Failed to retrieve recruitment data", error);
        toast.error("Failed to retrieve recruitment data");
      }
    };

    fetchTechRecruitData();
    fetchAllRecruitData();
  }, [config]);

  return (
    <ApplicantsContext.Provider
      value={{
        techData,
        techDataLoading,
        recruitmentData,
        recruitDataLoading,
      }}
    >
      {children}
    </ApplicantsContext.Provider>
  );
};

export default ApplicantsContextProvider;
