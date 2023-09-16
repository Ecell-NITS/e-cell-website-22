import React, { useEffect, useState } from "react";
import axios from "axios";
const Ip = () => {
  useEffect(() => {
    getUserIp();
  }, []);
  const [ip, setIp] = useState("");
  const getUserIp = async () => {
    const ip = await axios.get("https://ipapi.co/json");
    // console.log(ip.data.city)
    setIp(ip.data.ip);
  };
  return <div>{ip}</div>;
};

export default Ip;
