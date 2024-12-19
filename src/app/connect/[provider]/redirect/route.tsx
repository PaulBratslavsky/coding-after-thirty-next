import { getStrapiURL } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  // domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
};

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams, pathname } = new URL(request.url);
  const token = searchParams.get("access_token");
  const provider = pathname.split("/")[2];

  if (!token) {
    console.error("No access token provided");
    return NextResponse.redirect(new URL("/", request.url));
  }

  const backendUrl = getStrapiURL();
  const path = `/api/auth/${provider}/callback`;
  const url = new URL(backendUrl + path);
  url.searchParams.append("access_token", token);

  try {
    const res = await fetch(url.href, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (!data.jwt) {
      throw new Error("No JWT received from the server");
    }

    const cookieStore = await cookies();
    cookieStore.set("jwt", data.jwt, config);

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.redirect(new URL("/auth/error", request.url));
  }
}
