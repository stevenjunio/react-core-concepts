import { useContext } from "react";
import ThemeContext from "./context";
import NestedComponent from "./NestedComponent";

function DisplayComponent() {
  console.log("Using ThemeContext in DisplayComponent");
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext ? themeContext.isDarkMode : false;
  console.log("DisplayComponent rendered with dark mode:", isDarkMode);
  return (
    <div>
      Dark Mode: {isDarkMode ? "Enabled" : "Disabled"}
      <NestedComponent />
    </div>
  );
}

export default DisplayComponent;
