import { createContext } from "react";

// Create a context with default values set to null beacuse we'll set it in the provider
const ThemeContext = createContext<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
} | null>(null);

export default ThemeContext;
