import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStrapiURL } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ [key: string]: string }> }
) {
  const resolvedParams = await params;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("access_token");
  console.log("[Auth] Access token received:", token ? "Present" : "Missing");

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  const provider = resolvedParams.provider;
  const backendUrl = getStrapiURL();
  const path = `/api/auth/${provider}/callback`;
  console.log("[Auth] Backend URL:", backendUrl);
  console.log("[Auth] Provider:", provider);

  const url = new URL(backendUrl + path);
  url.searchParams.append("access_token", token);

  const res = await fetch(url.href);
  const data = await res.json();
  console.log("[Auth] Response from backend:", {
    status: res.status,
    hasJWT: !!data.jwt,
    dataKeys: Object.keys(data)
  });

  const cookieStore = await cookies();
  const cookieConfig = {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    domain: new URL(request.url).hostname,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const
  };
  console.log("[Auth] Cookie config:", {
    domain: cookieConfig.domain,
    secure: cookieConfig.secure,
    sameSite: cookieConfig.sameSite
  });

  cookieStore.set("jwt", data.jwt, cookieConfig);
  console.log("[Auth] Cookie set attempt completed");

  return NextResponse.redirect(new URL("/courses", request.url));
}