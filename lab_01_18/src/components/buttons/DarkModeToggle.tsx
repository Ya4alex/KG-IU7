import { useTheme } from "../../contexts/ThemeContext";

export const DarkModeToggle = () => {
  const { isDark, setIsDark } = useTheme();

  const toggleDarkMode = () => {
    setIsDark((prevIsDark: boolean) => !prevIsDark);
  };

  return (
    <button
      className={`button ${isDark ? "active" : ""} darkmode-btn`}
      onClick={toggleDarkMode}
    >
      {isDark ? "🌙" : "🔆"}
    </button>
  );
};
