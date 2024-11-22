import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Log request details
  console.log(`Request URL: ${request.url}`);
  console.log(`Request Method: ${request.method}`);
  console.log(`Request Headers: ${JSON.stringify([...request.headers])}`);

  // Clone the request headers and set a new header `x-custom-header`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-custom-header", "my-custom-value");

  // Add exclusive header for /api/v1 route and its sub-routes
  if (request.nextUrl.pathname.startsWith("/api/v1")) {
    requestHeaders.set("x-exclusive-header", "exclusive-value");
  }

  // Create a response with the modified headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-response-header`
  response.headers.set("x-response-header", "response-value");

  return response;
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
