"use client";
import { useRef, useState } from "react";

// Metadata
/**
 * @fileoverview This file demonstrates the use of the useRef hook in React.
 * @description The page showcases how useRef can be used to access and manipulate DOM elements directly.
 * @date 2023-10-10
 */

// Main Page Component
export default function useRefPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">This is how useRef Works</h1>
      <div className="p-4 bg-white shadow-md rounded-md w-3/4 max-w-lg">
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
                Real-world use cases of useRef
              </h2>
              <ul className="list-disc list-inside">
                <li>Accessing and manipulating DOM elements directly.</li>
                <li>Storing mutable values that do not cause re-renders.</li>
                <li>
                  Integrating with third-party libraries that require DOM
                  manipulation.
                </li>
                <li>Managing focus, text selection, or media playback.</li>
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
        <div className="flex mb-4">
          <input
            title="Input field"
            type="text"
            className="border p-2 flex-grow mr-2"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={focusInput}
          >
            Focus Input
          </button>
        </div>

        <div className="text-gray-700 flex flex-col gap-2 mt-4">
          <h2 className="text-xl font-semibold">Input Value</h2>
          <div className="flex items-center gap-2">
            <span className="text-xl">{inputValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
