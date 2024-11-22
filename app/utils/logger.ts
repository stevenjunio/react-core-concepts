import { NextRequest, NextResponse } from "next/server";

export function logRequest(request: NextRequest) {
  console.log("Request:", request);
  // Add more detailed logging as needed
}

export function logResponse(response: NextResponse) {
  console.log("Response:", response);
  // Add more detailed logging as needed
}
