import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStrapiURL } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ [key: string]: string }> }
) {
  try {
    const resolvedParams = await params;
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("access_token");
    console.log("[Auth] Access token received:", token ? "Present" : "Missing");

    if (!token) {
      console.error("[Auth] No access token in URL");
      return NextResponse.redirect(new URL("/", request.url));
    }

    const provider = resolvedParams.provider;
    const backendUrl = getStrapiURL();
    const path = `/api/auth/${provider}/callback`;
    console.log("[Auth] Backend URL:", backendUrl);
    console.log("[Auth] Provider:", provider);

    const url = new URL(backendUrl + path);
    url.searchParams.append("access_token", token);

    const res = await fetch(url.href);
    if (!res.ok) {
      const errorText = await res.text();
      console.error("[Auth] Backend request failed:", {
        status: res.status,
        statusText: res.statusText,
        error: errorText,
        url: url.href
      });
      return NextResponse.redirect(new URL("/", request.url));
    }

    const data = await res.json();
    console.log("[Auth] Response from backend:", {
      status: res.status,
      hasJWT: !!data.jwt,
      jwtLength: data.jwt ? data.jwt.length : 0,
      dataKeys: Object.keys(data)
    });

    if (!data.jwt) {
      console.error("[Auth] No JWT in response data");
      return NextResponse.redirect(new URL("/", request.url));
    }

    const cookieStore = await cookies();
    // Get the hostname and remove any subdomain
    const hostname = new URL(request.url).hostname;
    const rootDomain = hostname.split('.').slice(-2).join('.');
    console.log("[Auth] Domain info:", { hostname, rootDomain });

    const cookieConfig = {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      domain: rootDomain,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const
    };
    console.log("[Auth] Cookie config:", {
      domain: cookieConfig.domain,
      secure: cookieConfig.secure,
      sameSite: cookieConfig.sameSite,
      jwtLength: data.jwt.length
    });

    cookieStore.set("jwt", data.jwt, cookieConfig);
    console.log("[Auth] Cookie set attempt completed");

    return NextResponse.redirect(new URL("/courses", request.url));
  } catch (error) {
    console.error("[Auth] Error in auth process:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}