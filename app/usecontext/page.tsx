"use client";
import { createContext, useContext, useState } from "react";

// Metadata
/**
 * @fileoverview This file demonstrates the use of the useContext hook in React.
 * @description The page showcases how useContext can be used to share state across components.
 * @date 2023-10-10
 */

// Create a Context
const MyContext = createContext<string | null>(null);

// A component that consumes the context
function DisplayComponent() {
  const contextValue = useContext(MyContext);
  console.log("DisplayComponent rendered with context value:", contextValue);
  return <div>Context Value: {contextValue}</div>;
}

// Main Page Component
export default function UseContextPage() {
  const [contextValue, setContextValue] = useState("Initial Value");

  return (
    <MyContext.Provider value={contextValue}>
      <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          This is how useContext Works
        </h1>
        <div className="p-4 bg-white shadow-md rounded-md w-3/4 max-w-lg">
          <DisplayComponent />
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={() => setContextValue("Updated Value")}
          >
            Update Context Value
          </button>
        </div>
      </div>
    </MyContext.Provider>
  );
}
