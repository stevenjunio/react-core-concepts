"use client";
import { useCallback, useState, useEffect } from "react";

// Metadata
/**
 * @fileoverview This file demonstrates the use of the useCallback hook in React.
 * @description The page showcases how useCallback can be used to optimize performance by preventing unnecessary re-renders of components.
 * @author Steven
 * @date 2023-10-10
 */

// Component Props Interface
interface ComponentProps {
  item: string;
  onRemove: (item: string) => void;
}

// ListItem Component
const ListItem = ({ item, onRemove }: ComponentProps) => {
  console.log(`Rendering ListItem: ${item}`);
  return (
    <div className="flex justify-between items-center p-2 bg-gray-200 rounded-md mb-2">
      <span>{item}</span>
      <button
        type="button"
        className="bg-red-500 text-white px-2 py-1 rounded-md"
        onClick={() => onRemove(item)}
      >
        Remove
      </button>
    </div>
  );
};

// Main Page Component
export default function useCallBackPage() {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler to add item to the list
  const handleAddItem = () => {
    setItems((prevItems) => [...prevItems, inputValue]);
    setInputValue("");
  };

  // Handler to remove item without useCallback
  const handleRemoveItemNoCallback = (itemToRemove: string) => {
    console.log(`Removing item without useCallback: ${itemToRemove}`);
    setItems((prevItems) => prevItems.filter((item) => item !== itemToRemove));
  };

  // Handler to remove item with useCallback
  const handleRemoveItem = useCallback((itemToRemove: string) => {
    console.log(`Removing item with useCallback: ${itemToRemove}`);
    setItems((prevItems) => prevItems.filter((item) => item !== itemToRemove));
  }, []);

  // Effects to log creation of handlers
  useEffect(() => {
    console.log("handleRemoveItemNoCallback function created");
  }, [handleRemoveItemNoCallback]);

  useEffect(() => {
    console.log("handleRemoveItem function created");
  }, [handleRemoveItem]);

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">This is how useCallBack Works</h1>
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
                Real-world use cases of useCallback
              </h2>
              <ul className="list-disc list-inside">
                <li>
                  Optimizing performance in large lists by preventing
                  unnecessary re-renders of list items.
                </li>
                <li>
                  Passing stable callback references to child components to
                  avoid triggering their re-renders.
                </li>
                <li>
                  Memoizing event handlers in complex forms to ensure they are
                  not recreated on every render.
                </li>
                <li>
                  Improving performance in animations or drag-and-drop
                  interactions by keeping callback references stable.
                </li>
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
            title="Add item"
            type="text"
            className="border p-2 flex-grow mr-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleAddItem}
          >
            Add
          </button>
        </div>
        <div className="text-gray-700 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Without useCallback</h2>
          {items.map((item, index) => (
            <ListItem
              key={`no-callback-${index}`}
              item={item}
              onRemove={handleRemoveItemNoCallback}
            />
          ))}
        </div>
        <div className="text-gray-700 flex flex-col gap-2 mt-4">
          <h2 className="text-xl font-semibold">With useCallback</h2>
          {items.map((item, index) => (
            <ListItem
              key={`callback-${index}`}
              item={item}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
