"use client";
import { useState } from "react";
import ThemeProvider from "./ThemeProvider";
import DisplayComponent from "./DisplayComponent";
import { useContext } from "react";
import ThemeContext from "./context";

// Metadata
/**
 * @fileoverview This file demonstrates the use of the useContext hook in React.
 * @description The page showcases how useContext can be used to share state across components.
 * @date 2023-10-10
 */

// Main Page Component
export default function UseContextPage() {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
}

function Content({}) {
  const themeContext = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const isDarkMode = themeContext ? themeContext.isDarkMode : false;
  const toggleDarkMode = themeContext ? themeContext.toggleDarkMode : () => {};

  return (
    <div
      className={`flex flex-col items-center justify-center h-[100vh] ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">This is how useContext Works</h1>
      <div
        className={`p-4 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-md rounded-md w-3/4 max-w-lg`}
      >
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Use Cases
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-md max-w-lg mx-auto">
              <h2 className="text-xl font-semibold mb-4">
                Real-world use cases of useContext
              </h2>
              <ul className="list-disc list-inside">
                <li>Sharing state across deeply nested components.</li>
                <li>Managing global state in a React application.</li>
                <li>Providing theme or localization settings.</li>
                <li>Reducing prop drilling in large component trees.</li>
              </ul>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <button
          type="button"
          className="bg-yellow-500 text-white px-4 py-2 rounded-md mb-4"
          onClick={() => setIsWarningModalOpen(true)}
        >
          How NOT to Use Context
        </button>
        {isWarningModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-md max-w-lg mx-auto">
              <h2 className="text-xl font-semibold mb-4">
                Common Mistakes with useContext
              </h2>
              <ul className="list-disc list-inside">
                <li>
                  Using context for state that doesn&apos;t need to be global.
                </li>
                <li>Overusing context, leading to unnecessary re-renders.</li>
                <li>
                  Not memoizing context values, causing performance issues.
                </li>
                <li>Using context for infrequently changing state.</li>
              </ul>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={() => setIsWarningModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <DisplayComponent />
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={toggleDarkMode}
        >
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
}
