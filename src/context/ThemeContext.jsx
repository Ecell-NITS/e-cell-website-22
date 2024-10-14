import { useRef } from "react";
import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

function ThemeContextProvider({ children }) {
  let currentMode = localStorage.getItem("isDarkMode");

  console.log(typeof currentMode);

  //   useEffect(() => {

  //     currentMode = localStorage.getItem("isDarkMode");

  //     if (currentMode == null) {
  //       currentMode = "false";
  //       localStorage.setItem("isDarkMode", "false");
  //     } else {
  //       if (currentMode == "false") {
  //         document.body.classList.remove("dark-theme");
  //         localStorage.setItem("isDarkMode", "false");
  //       } else {
  //         document.body.classList.add("dark-theme");
  //         localStorage.setItem("isDarkMode", "true");
  //       }
  //     }

  //   },[])
  // }
  // if (currentMode == null) {
  //   currentMode = "false";
  //   localStorage.setItem("isDarkMode", "false");
  // } else {
  //   if (currentMode == "false") {
  //     document.body.classList.remove("dark-theme");
  //     localStorage.setItem("isDarkMode", "false");
  //   } else {
  //     document.body.classList.add("dark-theme");
  //     localStorage.setItem("isDarkMode", "true");
  //   }
  // }

  const [isDarkMode, setIsDarkMode] = useState(currentMode != "false");
  if (isDarkMode) {
    localStorage.setItem("isDarkMode", "true");
  } else {
    localStorage.setItem("isDarkMode", "false");
  }

  useEffect(() => {
    const currentMode = localStorage.getItem("isDarkMode");

    if (currentMode !== null) {
      setIsDarkMode(currentMode === "true");
    }

    if (isDarkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);
  // const [isDarkMode, setIsDarkMode] = useState(currentMode != "false");
  // if (isDarkMode) {
  //   localStorage.setItem("isDarkMode", "true");
  // } else {
  //   localStorage.setItem("isDarkMode", "false");
  // }
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (currentMode == "false") {
      document.body.classList.remove("dark-theme");
    } else {
      document.body.classList.add("dark-theme");
    }
  };
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };
