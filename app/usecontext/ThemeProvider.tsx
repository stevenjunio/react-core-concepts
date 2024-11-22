import { useState, ReactNode } from "react";
import ThemeContext from "./context";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // This state holds the current theme mode (dark or light)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // This function toggles the theme mode and updates the state
  const toggleDarkMode = () => {
    console.log(
      "Context is being updated: toggling dark mode via the provider"
    );
    setIsDarkMode(!isDarkMode);
  };

  return (
    // The ThemeContext.Provider component provides the current context values (isDarkMode and toggleDarkMode) to its children
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
