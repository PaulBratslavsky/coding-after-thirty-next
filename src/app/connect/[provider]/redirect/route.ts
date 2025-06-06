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

      // If the error is about email being taken, we need to handle it differently
      if (errorText.includes("Email is already taken")) {
        // Get the GitHub user info to find the email
        const githubUserRes = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!githubUserRes.ok) {
          console.error("[Auth] Failed to get GitHub user info:", await githubUserRes.text());
          return NextResponse.redirect(new URL("/", request.url));
        }

        const githubUser = await githubUserRes.json();
        console.log("[Auth] GitHub user info:", { 
          id: githubUser.id,
          login: githubUser.login,
          email: githubUser.email 
        });

        // Try to find the existing user with case-insensitive search
        const searchUrl = new URL(`${backendUrl}/api/users`);
        searchUrl.searchParams.append("filters[email][$eqi]", githubUser.email);
        console.log("[Auth] Searching for user with URL:", searchUrl.toString());

        const findUserRes = await fetch(searchUrl.toString(), {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
          },
        });

        if (!findUserRes.ok) {
          const errorText = await findUserRes.text();
          console.error("[Auth] Failed to find user:", {
            status: findUserRes.status,
            statusText: findUserRes.statusText,
            error: errorText
          });
          return NextResponse.redirect(new URL("/", request.url));
        }

        const userData = await findUserRes.json();
        console.log("[Auth] User search response:", {
          status: findUserRes.status,
          data: userData
        });

        // Check if we have any users in the response
        if (!userData.data || !Array.isArray(userData.data) || userData.data.length === 0) {
          console.error("[Auth] No existing user found for email:", githubUser.email);
          return NextResponse.redirect(new URL("/", request.url));
        }

        const existingUser = userData.data[0];
        console.log("[Auth] Found existing user:", {
          id: existingUser.id,
          email: existingUser.email,
          username: existingUser.username,
          provider: existingUser.provider
        });

        // Create a JWT for the existing user
        const jwtRes = await fetch(`${backendUrl}/api/auth/github/callback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: token,
            user: {
              id: existingUser.id,
              email: existingUser.email,
              username: existingUser.username,
              provider: existingUser.provider
            },
          }),
        });

        if (!jwtRes.ok) {
          const errorText = await jwtRes.text();
          console.error("[Auth] Failed to get JWT for existing user:", {
            status: jwtRes.status,
            statusText: jwtRes.statusText,
            error: errorText
          });
          return NextResponse.redirect(new URL("/", request.url));
        }

        const jwtData = await jwtRes.json();
        if (!jwtData.jwt) {
          console.error("[Auth] No JWT in response for existing user");
          return NextResponse.redirect(new URL("/", request.url));
        }

        const cookieStore = await cookies();
        const requestUrl = new URL(request.url);
        const hostname = requestUrl.hostname;
        const isLocalhost = hostname === 'localhost';
        console.log("[Auth] Request URL:", requestUrl.toString());
        console.log("[Auth] Hostname:", hostname);
        console.log("[Auth] Is localhost:", isLocalhost);

        const cookieConfig = {
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: "/",
          // Only set domain for non-localhost environments
          ...(isLocalhost ? {} : { domain: hostname }),
          httpOnly: true,
          secure: !isLocalhost, // Only require secure in production
          sameSite: "lax" as const
        };

        console.log("[Auth] Cookie config:", {
          domain: cookieConfig.domain,
          secure: cookieConfig.secure,
          sameSite: cookieConfig.sameSite,
          jwtLength: jwtData.jwt.length,
          isLocalhost
        });

        cookieStore.set("jwt", jwtData.jwt, cookieConfig);
        console.log("[Auth] Cookie set for existing user");

        return NextResponse.redirect(new URL("/courses", request.url));
      }

      return NextResponse.redirect(new URL("/", request.url));
    }

    const data = await res.json();
    if (!data.jwt) {
      console.error("[Auth] No JWT in response data");
      return NextResponse.redirect(new URL("/", request.url));
    }

    const cookieStore = await cookies();
    const requestUrl = new URL(request.url);
    const hostname = requestUrl.hostname;
    const isLocalhost = hostname === 'localhost';
    console.log("[Auth] Request URL:", requestUrl.toString());
    console.log("[Auth] Hostname:", hostname);
    console.log("[Auth] Is localhost:", isLocalhost);

    const cookieConfig = {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      // Only set domain for non-localhost environments
      ...(isLocalhost ? {} : { domain: hostname }),
      httpOnly: true,
      secure: !isLocalhost, // Only require secure in production
      sameSite: "lax" as const
    };

    console.log("[Auth] Cookie config:", {
      domain: cookieConfig.domain,
      secure: cookieConfig.secure,
      sameSite: cookieConfig.sameSite,
      jwtLength: data.jwt.length,
      isLocalhost
    });

    cookieStore.set("jwt", data.jwt, cookieConfig);
    console.log("[Auth] Cookie set attempt completed");

    return NextResponse.redirect(new URL("/courses", request.url));
  } catch (error) {
    console.error("[Auth] Error in auth process:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}