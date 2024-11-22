"use client";
import { useMemo, useRef, useState } from "react";

// Metadata
/**
 * @fileoverview This file demonstrates the use of the useMemo hook in React.
 * @description The page showcases how useMemo can be used to optimize performance by memoizing expensive calculations.
 * @date 2023-10-10
 */

// Main Page Component
export default function useMemoPage() {
  const [count, setCount] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [unrelatedState, setUnrelatedState] = useState(0);

  const inputCalcRef = useRef<HTMLInputElement>(null);

  // Expensive calculation function
  const expensiveCalculation = (num: number) => {
    console.log("Running expensive calculation...");
    setIsCalculating(true);
    setTimeout(() => {
      for (let i = 0; i < 1000000000; i++) {} // Simulate a heavy computation
      setIsCalculating(false);
    }, 1000);
    return num * 2;
  };

  // Memoized value
  const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">This is how useMemo Works</h1>
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
                Real-world use cases of useMemo
              </h2>
              <ul className="list-disc list-inside">
                <li>Optimizing performance for expensive calculations.</li>
                <li>Memoizing values that depend on complex computations.</li>
                <li>Preventing unnecessary re-renders of child components.</li>
                <li>Improving performance in large lists or tables.</li>
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
            title="Update count"
            type="number"
            className="border p-2 flex-grow mr-2"
            defaultValue={10}
            ref={inputCalcRef}
          />
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => setCount(Number(inputCalcRef.current?.value))}
          >
            Update Count
          </button>
        </div>

        <div className="text-gray-700 flex flex-col gap-2 mt-4">
          <h2 className="text-xl font-semibold">Memoized Value</h2>
          <div className="flex items-center gap-2">
            {isCalculating ? (
              <span className="text-xl">Calculating...</span>
            ) : (
              <span className="text-xl">{memoizedValue}</span>
            )}
          </div>
        </div>

        <div className="text-gray-700 flex flex-col gap-2 mt-4">
          <h2 className="text-xl font-semibold">Unrelated State</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              onClick={() => setUnrelatedState(unrelatedState + 1)}
            >
              Increment Unrelated State
            </button>
            <span className="text-xl">{unrelatedState}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
