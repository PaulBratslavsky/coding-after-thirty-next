import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // Create the redirect response
  const response = NextResponse.redirect(new URL("/", request.url))

  // Clear the JWT cookie by setting it with maxAge: 0
  response.cookies.set("jwt", "", {
    maxAge: 0,
    path: "/",
    // Use the request's host instead of environment variable
    domain: new URL(request.url).hostname,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  return response
}

