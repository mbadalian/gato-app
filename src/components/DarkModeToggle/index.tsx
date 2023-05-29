import React from "react";
import { useTheme } from "../../ThemeContext";
import { Button } from "../../ui";
import "./index.css";

export const DarkModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className="wrapper">
      <Button onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
    </div>
  );
};
