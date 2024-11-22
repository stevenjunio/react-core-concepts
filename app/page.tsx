import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to React Learning Hub</h1>
      <div className="p-4 bg-white shadow-md rounded-md w-3/4 max-w-lg">
        <p className="mb-4">
          This site is dedicated to helping you understand React hooks and core
          concepts through practical examples and explanations.
        </p>
        <div className="text-gray-700 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Topics Covered</h2>
          <ul className=" list-inside mb-4">
            <li>
              <Link href="/usecallback">
                <p className="text-blue-500 hover:underline">useCallback</p>
              </Link>
            </li>
            <li>
              <Link href="/reducer">
                <p className="text-blue-500 hover:underline">useReducer</p>
              </Link>
            </li>
            <li>
              <Link href="/memo">
                <p className="text-blue-500 hover:underline">useMemo</p>
              </Link>
            </li>
            <li>
              <Link href="/ref">
                <p className="text-blue-500 hover:underline">useRef</p>
              </Link>
            </li>
            <li>
              <Link href="/context">
                <p className="text-blue-500 hover:underline">useContext</p>
              </Link>
            </li>
            <li>
              <Link href="/state">
                <p className="text-blue-500 hover:underline">useState</p>
              </Link>
            </li>
            <li>
              <Link href="/effect">
                <p className="text-blue-500 hover:underline">useEffect</p>
              </Link>
            </li>
            <li>
              <Link href="/props">
                <p className="text-blue-500 hover:underline">Props</p>
              </Link>
            </li>
            <li>
              <Link href="/lifecycle">
                <p className="text-blue-500 hover:underline">
                  Lifecycle Methods
                </p>
              </Link>
            </li>
            <li>
              <Link href="/jsx">
                <p className="text-blue-500 hover:underline">JSX</p>
              </Link>
            </li>
            <li>
              <Link href="/routing">
                <p className="text-blue-500 hover:underline">Routing</p>
              </Link>
            </li>
          </ul>
          <p>
            Click on the topics above to explore detailed examples and learn how
            to use each React hook effectively.
          </p>
        </div>
      </div>
    </div>
  );
}
