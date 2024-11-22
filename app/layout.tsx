import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "React learning modules",
  description: "Understand core concepts and modern hooks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav
          style={{
            padding: "1rem",
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #dee2e6",
            overflowX: "auto",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              gap: "1rem",
              padding: 0,
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            <li>
              <Link
                href="/usecallback"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                useCallback
              </Link>
            </li>
            <li>
              <Link
                href="/reducer"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                useReducer
              </Link>
            </li>
            <li>
              <Link
                href="/memo"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                useMemo
              </Link>
            </li>
            <li>
              <Link
                href="/ref"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                useRef
              </Link>
            </li>
            <li>
              <Link
                href="/context"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                useContext
              </Link>
            </li>
            <li>
              <Link
                href="/state"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                useState
              </Link>
            </li>
            <li>
              <Link
                href="/effect"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                useEffect
              </Link>
            </li>
            <li>
              <Link
                href="/props"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                Props
              </Link>
            </li>
            <li>
              <Link
                href="/lifecycle"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                Lifecycle Methods
              </Link>
            </li>
            <li>
              <Link
                href="/jsx"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                JSX
              </Link>
            </li>
            <li>
              <Link
                href="/routing"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                Routing
              </Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
