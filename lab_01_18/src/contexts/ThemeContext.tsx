import React, { createContext, useContext } from "react";

interface ThemeContextProps {
  children: any;
  value: any;
}

const ThemeContext = createContext<any>(null);

export const ThemeProvider: React.FC<ThemeContextProps> = ({ children, value }) => (
  <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
