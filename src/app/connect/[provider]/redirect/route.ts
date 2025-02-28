import { NextResponse } from "next/server";
import { getStrapiURL } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ [key: string]: string }> }
) {
  const resolvedParams = await params;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("access_token");

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  const provider = resolvedParams.provider;
  const backendUrl = getStrapiURL();
  const path = `/api/auth/${provider}/callback`;

  console.log("Provider and URL:", provider, backendUrl + path);

  const url = new URL(backendUrl + path);
  url.searchParams.append("access_token", token);

  try {
    const res = await fetch(url.href);
    
    if (!res.ok) {
      console.error("Error response from Strapi:", res.status, res.statusText);
      return NextResponse.redirect(new URL("/auth/error", request.url));
    }
    
    const data = await res.json();
    console.log("Auth data received:", { jwt: data.jwt ? "JWT present" : "No JWT" });

    // Create the redirect response first
    const redirectUrl = new URL("/courses", request.url);
    const response = NextResponse.redirect(redirectUrl);
    
    // Set the cookie on the response object directly
    response.cookies.set("jwt", data.jwt, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      // Use the request's host instead of environment variable for domain
      domain: new URL(request.url).hostname,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });
    
    console.log("Cookie set on response");
    return response;
  } catch (error) {
    console.error("Error during auth callback:", error);
    return NextResponse.redirect(new URL("/auth/error", request.url));
  }
}