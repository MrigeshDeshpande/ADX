import { NextResponse } from "next/server";
const allowedOrigins = [
  "https://admin.skillyards.in",
  "https://skillyards-admin.vercel.app",
  "https://www.skillyards.in",
  "https://skillyards.in",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

export function middleware(request) {
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  
  if (request.method === "OPTIONS") {
    const preflightHeaders = {
      "Access-Control-Allow-Methods": "GET, OPTIONS, PATCH, DELETE, POST, PUT",
      "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
      "Access-Control-Allow-Credentials": "true",
    };

    if (isAllowedOrigin) {
      preflightHeaders["Access-Control-Allow-Origin"] = origin;
    }

    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Pass-through standard requests
  const response = NextResponse.next();

  // If the origin is in our allowed list, reflect it
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  // Set the remaining default CORS headers
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS, PATCH, DELETE, POST, PUT");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  return response;
}

export const config = {
  // apply the middleware to all API routes
  matcher: "/api/:path*",
};
