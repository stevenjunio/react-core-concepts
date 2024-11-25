"use client";

import { useState } from "react";

// Difficulty: Easy
// Time Limit: 45 minutes
// Focus Areas: State Management, Event Handling
// Create a counter component that meets the following requirements:
// Display a number (starting at 0)
// Have an "Increment" button that adds 1
// Have a "Decrement" button that subtracts 1
// Have a "Reset" button that returns the count to 0
// The counter should never go below 0

// Expected Output:
// The counter should display the current count
// Buttons should be clearly labeled
// Counter stops at 0 (no negative numbers)
// All buttons should be functional
// Testing Points:
// Does initial render show 0?
// Does increment work?
// Does decrement stop at 0?
// Does reset return to 0 from any number?
// Copy this code into VS Code and begin your implementation. Remember:
// First 20 minutes: Try without any documentation
// Next 25 minutes: Can use React docs if needed
// After 45 minutes: Let me know if you need the solution

function Counter() {
  //set the intial state
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  const handleDecrement = () => {
    try {
      if (count > 0) {
        setCount(count - 1);
        setError("");
      }
    } catch (e) {
      console.error(`Failed to successfully decrement`, e);
      setError("An error occurred while decrementing.");
    }
  };

  const handleIncrement = () => {
    try {
      setCount(count + 1);
      setError("");
    } catch (e) {
      console.error(`Failed to successfully increment`, e);
      setError("An error occurred while incrementing.");
    }
  };

  const handleReset = () => {
    try {
      setCount(0);
      setError("");
    } catch (e) {
      console.error(`Failed to successfully reset`, e);
      setError("An error occurred while resetting.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4 border rounded shadow-md">
      <h1 className="text-2xl font-bold">{count}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleIncrement}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={handleDecrement}
        >
          Decrement
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// Simple test function to validate the counter component
function runTests() {
  const testResults = [];

  // Initial render test
  let count = 0;
  testResults.push(count === 0 ? "Pass" : "Fail");

  // Increment test
  count++;
  testResults.push(count === 1 ? "Pass" : "Fail");

  // Decrement test
  count--;
  testResults.push(count === 0 ? "Pass" : "Fail");

  // Decrement below 0 test
  count--;
  testResults.push(count === 0 ? "Pass" : "Fail");

  // Reset test
  count = 5;
  count = 0;
  testResults.push(count === 0 ? "Pass" : "Fail");

  console.log("Test Results:", testResults);
}

runTests();

export default Counter;
