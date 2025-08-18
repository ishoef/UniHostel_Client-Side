import React, { useEffect, useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";

const DarkModeToggle = () => {
  // Initialize theme state immediately on first render
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) return storedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light"; // default fallback
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      html.setAttribute("data-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <button
        onClick={toggleTheme}
        aria-label={`switch to ${theme === "light" ? "dark" : "light"} mode`}
        className="btn btn-ghost border border-gray-500 text-2xl"
      >
        {theme === "dark" ? (
          <span
            className="tooltip tooltip-left tooltip-primary"
            data-tip="Light Mode"
          >
            <CiDark />
          </span>
        ) : (
          <span
            className="tooltip tooltip-left tooltip-primary"
            data-tip="Dark Mode"
          >
            <CiLight />
          </span>
        )}
      </button>
    </div>
  );
};

export default DarkModeToggle;
