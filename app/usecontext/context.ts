import { createContext } from "react";

const ThemeContext = createContext<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
} | null>(null);

export default ThemeContext;
