import React, { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { ThemeContext } from "../../../context/ThemeContext";

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    // <button onClick={toggleTheme} style={{ border: 'none', backgroundColor: 'transparent' }}>
    //   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //     {isDarkMode ? (
    //       <IoSunny size={isDarkMode ? 20 : 18} style={{ color: 'white' }} />
    //     ) : (
    //       <FaMoon size={isDarkMode ? 18 : 20} style={{ color: 'black' }} />
    //     )}
    //   </div>
    // </button>
    <button
      onClick={toggleTheme}
      style={{
        border: "none",
        backgroundColor: "transparent",
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isDarkMode ? (
          <IoSunny size={isDarkMode ? 20 : 18} style={{ color: "white" }} />
        ) : (
          <FaMoon size={isDarkMode ? 18 : 20} style={{ color: "black" }} />
        )}
      </div>
    </button>
  );
};

export default ThemeToggleButton;
