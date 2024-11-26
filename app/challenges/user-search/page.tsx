"use client";
import { useState, useEffect, ChangeEvent } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

// Separate validation logic
function validateSearch(query: string, minLength: number): boolean {
  if (!query || query.length < minLength) {
    return false;
  }
  //regex, // slash starts the regex in js
  //^means the start of the string and $ means the end
  //so we're checking from the start to the end of the string
  //[brackers mean we're checking if it has any of the values we provide in the brackets]
  //in this case, we're asking for a range (a-z) and caps A-Z as well as a space
  return /^[a-zA-Z ]+$/.test(query);
}

// Separate API logic
async function fetchUserData(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    //throw an error if the response throws an error
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

function UserSearch() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<User[]>([]);

  // Debounced search effect this works because we return a cleanup function, everytime the search query changes, re-react runs through the re-render tree, and this effect runs again because it recognizes the depedency of searchQuery has changed

  useEffect(() => {
    //setup a async function interally so we can easily run await commands and so we don't recreate it when outside of this effect. Also you can't make useEffect async
    const fetchUsers = async () => {
      //if the search is bad, wipe out the search results so we don't show any mismatches
      if (!validateSearch(searchQuery, 3)) {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        //clear the error because we haven't deteremined if anythings wrong with the search yet
        setError(null);
        //simple use our custom fetch call to grab the API
        const users = await fetchUserData();
        //have a json list of users here

        //filter them using the native filter object, and includes, which just checks if a string is within a string
        //lowercase so we ignore and don't pull seperate results
        const filteredUsers = users.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        //now that we have a filtered result, send it on down to the state
        setSearchResults(filteredUsers);
      } catch (err) {
        //pretty much handle any err, this would come from the API call, or the filter if we missed up syntax if the data changed
        setError(err instanceof Error ? err.message : "An error occurred");
        //make sure we aren't showing any bad data
        setSearchResults([]);
      } finally {
        //clear looading state
        setLoading(false);
      }
    };

    //debounce using a simple timeout, basically we run the above defined fetchUsers api call, if we have a search query
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        //this will run and take action or throw an error after 300ms
        fetchUsers();
      }
    }, 300);
    //but if the searchQuery has changed, aka someone has typed we run a cleanup function. Cleanup functions are tied to effects
    //it will run when this component no longer exists in the dom, so we should cleanup all the leftover code to avoid leaks
    //it also runs before it re-runs if the depedency changes again

    //so basically the searcquery will change, it'll run clearTimeout, then it'll re-run the effect starting from the top
    return () => {
      console.log(`Running the cleanup function on ${timeoutId}`);
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      {/* Search Input */}
      <div className="space-y-2">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700"
        >
          Search Users
        </label>
        <input
          id="search"
          type="text"
          placeholder="Enter user name..."
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* if the search is not vaild and there is an actual search happening, show an error message */}
        {!validateSearch(searchQuery, 3) && searchQuery && (
          <p className="text-sm text-red-500">
            Please enter at least 3 letters (no numbers or special characters)
          </p>
        )}
      </div>

      {/* Results Section */}
      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 rounded-md bg-red-50">{error}</div>
        ) : searchResults.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {/* if we have search results, show the ui */}
            {searchResults.map((user) => (
              <li key={user.id} className="py-4">
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm text-gray-500">{user.email}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          //if we have a valid search, and there are no results up, show no results
          searchQuery &&
          validateSearch(searchQuery, 3) && (
            <p className="text-center text-gray-500">No results found</p>
          )
        )}
      </div>
    </div>
  );
}

// Test cases implementation remains the same
const TEST_CASES = [
  {
    input: { query: "john", minLength: 3 },
    expectedResult: true,
    description: "Valid search query",
  },
  {
    input: { query: "jo", minLength: 3 },
    expectedResult: false,
    description: "Query too short",
  },
  {
    input: { query: "", minLength: 3 },
    expectedResult: false,
    description: "Empty query",
  },
  {
    input: { query: "john123", minLength: 3 },
    expectedResult: false,
    description: "Query with numbers",
  },
];

interface TestResults {
  testNumber: number;
  description: string;
  passed: boolean;
}
function runTests() {
  let passedTests = 0;
  const results: TestResults[] = [];

  TEST_CASES.forEach((testCase, index) => {
    const { query, minLength } = testCase.input;
    const isValid = validateSearch(query, minLength);

    const passed = isValid === testCase.expectedResult;
    results.push({
      testNumber: index + 1,
      description: testCase.description,
      passed,
    });

    if (passed) passedTests++;
  });

  console.log("Test Results:", results);
  console.log(`Passed ${passedTests} out of ${TEST_CASES.length} tests`);
  return passedTests === TEST_CASES.length;
}

runTests();

export default UserSearch;
