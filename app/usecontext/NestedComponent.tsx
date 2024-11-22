import { useContext } from "react";
import ThemeContext from "./context";

function NestedComponent() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return <div>Error: ThemeContext is not available</div>;
  }
  const { isDarkMode } = themeContext;
  console.log("NestedComponent rendered with dark mode:", isDarkMode);
  return <div>Nested Dark Mode: {isDarkMode ? "Enabled" : "Disabled"}</div>;
}

export default NestedComponent;
