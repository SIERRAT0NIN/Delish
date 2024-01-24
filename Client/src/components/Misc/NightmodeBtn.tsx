import React, { useState, useEffect } from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./Moonicon";
import { SunIcon } from "./Sunicon";

export default function NightmodeBtn() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true" || false;
  });
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="content-stretch">
      <Switch
        checked={isDarkMode}
        onChange={handleToggle}
        color="success"
        startContent={isDarkMode ? <SunIcon /> : <SunIcon />}
        endContent={isDarkMode ? <MoonIcon /> : <MoonIcon />}
      >
        Dark Mode
      </Switch>
    </div>
  );
}
