import { logRequest, logResponse } from "@/app/utils/logger";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  logRequest(request);

  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "Guest";

  const response = NextResponse.json({
    data: `Hello, ${name}! This is the standard route returned.`,
  });

  logResponse(response);
  return response;
}

export async function POST(request: NextRequest) {
  logRequest(request);

  const body = await request.json();
  const response = NextResponse.json({
    message: "Data received",
    data: body,
  });

  logResponse(response);
  return response;
}

export async function PUT(request: NextRequest) {
  logRequest(request);

  const body = await request.json();
  const response = NextResponse.json({
    message: "Data updated",
    data: body,
  });

  logResponse(response);
  return response;
}

export async function DELETE(request: NextRequest) {
  logRequest(request);

  const response = NextResponse.json({
    message: "Data deleted",
  });

  logResponse(response);
  return response;
}
