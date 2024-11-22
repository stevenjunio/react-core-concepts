"use client";
import { useReducer, useState } from "react";

// Metadata
/**
 * @fileoverview This file demonstrates the use of the useReducer hook in React.
 * @description The page showcases how useReducer can be used to manage complex state logic in a more predictable way compared to useState.
 * @date 2023-10-10
 */

// Component Props Interface
interface ComponentProps {
  item: string;
  onRemove: (item: string) => void;
}
// Define action types
type INCREMENT = "INCREMENT";
type DECREMENT = "DECREMENT";
type ADD_ITEM = "ADD_ITEM";
type RESET = "RESET";
type REMOVE_ITEM = "REMOVE_ITEM";

// Define the action interface
interface IncrementAction {
  type: INCREMENT;
  payload: undefined;
}

interface DecrementAction {
  type: DECREMENT;
  payload: undefined;
}

interface AddOrRemoveItemAction {
  type: ADD_ITEM;
  payload: string;
}

interface ResetAction {
  type: RESET;
  payload: undefined;
}

interface RemoveItemAction {
  type: REMOVE_ITEM;
  payload: string;
}

// Combine the action types using a union
type ActionTypes =
  | IncrementAction
  | DecrementAction
  | AddOrRemoveItemAction
  | ResetAction
  | RemoveItemAction;

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

// Reducer function
const reducer = (
  state: { counter: number; items: string[] },
  action: ActionTypes
) => {
  console.log("Current State:", state);
  console.log("Action Type:", action.type);
  console.log("Action Payload:", action.payload);
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    case "RESET":
      return { ...state, counter: 0 };
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item !== action.payload),
      };
    default:
      return state;
  }
};

// Main Page Component
export default function useReducerPage() {
  const [state, dispatch] = useReducer(reducer, { counter: 0, items: [] });
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler to add item to the list
  const handleAddItem = () => {
    console.log("Dispatching ADD_ITEM with payload:", inputValue);
    dispatch({ type: "ADD_ITEM", payload: inputValue });
    setInputValue("");
  };

  // Handler to remove item with useReducer
  const handleRemoveItem = (itemToRemove: string) => {
    console.log("Dispatching REMOVE_ITEM with payload:", itemToRemove);
    dispatch({ type: "REMOVE_ITEM", payload: itemToRemove });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">This is how useReducer Works</h1>
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
                Real-world use cases of useReducer
              </h2>
              <ul className="list-disc list-inside">
                <li>
                  Managing complex state logic that involves multiple
                  sub-values.
                </li>
                <li>
                  Handling state transitions that depend on the previous state.
                </li>
                <li>
                  Centralizing state logic to make it more predictable and
                  easier to debug.
                </li>
                <li>
                  Using with context to manage global state in larger
                  applications.
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

        <div className="text-gray-700 flex flex-col gap-2 mt-4">
          <h2 className="text-xl font-semibold">Counter</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                console.log("Dispatching INCREMENT");
                dispatch({
                  type: "INCREMENT",
                  payload: undefined,
                });
              }}
            >
              Increment
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                console.log("Dispatching DECREMENT");
                dispatch({ type: "DECREMENT", payload: undefined });
              }}
            >
              Decrement
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                console.log("Dispatching RESET");
                dispatch({ type: "RESET", payload: undefined });
              }}
            >
              Reset
            </button>
            <span className="text-xl">{state.counter}</span>
          </div>

          <h2 className="text-xl font-semibold mt-4">With useReducer</h2>
          {state.items.map((item, index) => (
            <ListItem
              key={`reducer-${index}`}
              item={item}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
