import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const shPalette = {
  light: {
    blue: "#0000ff",
    red: "#ff0000",
    text: "#000000",
    stroke: "#000000",
    shapeFill: "#00e1ff34",
    shapeStroke: "#47ffb8",
  },
  dark: {
    blue: "#0000ff",
    red: "#ff0000",
    text: "#ffff",
    stroke: "#e4e4e4",
    shapeFill: "#00e1ff34",
    shapeStroke: "#47ffb8",
  },
};

export function useColorScheme() {
  const [isDark, setIsDark] = useState(() => {
    const localStorageDark = localStorage.getItem("isDark");
    if (localStorageDark !== null) {
      return localStorageDark === "true";
    } else {
      return null;
    }
  });

  const systemPrefersDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" });

  // Обновление состояния в соответствии с системными настройками темы
  useEffect(() => {
    if (isDark === null) {
      setIsDark(systemPrefersDark);
    }
  }, [isDark, systemPrefersDark]);

  // Сохранение значения в localStorage при его изменении
  useEffect(() => {
    if (isDark !== null) {
      localStorage.setItem("isDark", isDark.toString());
    }
  }, [isDark]);

  useEffect(() => {
    if (isDark !== null) {
      if (isDark) {
        document.body.classList.add("dark-body");
      } else {
        document.body.classList.remove("dark-body");
      }
    }
  }, [isDark]);

  return {
    isDark,
    setIsDark,
    plt: isDark ? shPalette.dark : shPalette.light,
  };
}
