import React from "react";
import { useState, useEffect } from "react";
import styles from "./ConnectionDropBanner.module.scss";

const ConnectionDropBanner = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [showOnlineBanner, setShowOnlineBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsConnected(true);
      setShowOnlineBanner(true);
      setTimeout(() => {
        setShowOnlineBanner(false);
      }, 1000);
    };
    const handleOffline = () => setIsConnected(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      className={
        !isConnected
          ? styles.offlinebanner
          : showOnlineBanner
            ? styles.onlinebanner
            : styles.hide
      }
    >
      {!isConnected && <p>You are offline. Please check your internet connection.</p>}
      {showOnlineBanner && <p>You are online.</p>}
    </div>
  );
};

export default ConnectionDropBanner;
