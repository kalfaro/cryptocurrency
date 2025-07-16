import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDark(isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300
        ${dark ? "bg-gray-700" : "bg-gray-300"}`}
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300
          ${dark ? "translate-x-8" : "translate-x-0"}`}
      >
        {dark ? "🌙" : "☀️"}
      </div>
    </button>
  );
}
