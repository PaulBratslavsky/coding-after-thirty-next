import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getStrapiURL } from "@/lib/utils"

export async function GET(request: NextRequest, { params }: { params: Promise<{ [key: string]: string }> }) {
  const resolvedParams = await params
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("access_token")

  console.log("Token:", token)

  console.log("=== AUTH CALLBACK START ===")
  console.log("Full URL:", request.url)
  console.log("Search params:", Object.fromEntries(searchParams.entries()))
  console.log("Provider:", resolvedParams.provider)

  if (!token) {
    console.log("No access token found")
    return NextResponse.redirect(new URL("/?error=no_token", request.url))
  }

  const provider = resolvedParams.provider
  const backendUrl = getStrapiURL()
  const path = `/api/auth/${provider}/callback`
  const url = new URL(backendUrl + path)
  url.searchParams.append("access_token", token)

  console.log("Calling Strapi URL:", url.href)

  try {
    const res = await fetch(url.href, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "NextJS-LMS/1.0",
      },
    })

    console.log("Strapi response status:", res.status)
    console.log("Strapi response headers:", Object.fromEntries(res.headers.entries()))

    // Get response text first to log it
    const responseText = await res.text()
    console.log("Strapi raw response:", responseText)

    if (!res.ok) {
      console.error("Strapi error - Status:", res.status)
      console.error("Strapi error - Response:", responseText)

      // Try to parse as JSON for better error details
      let errorDetails = responseText
      try {
        const errorJson = JSON.parse(responseText)
        errorDetails = JSON.stringify(errorJson, null, 2)
      } catch (error) {
        console.error("Failed to parse Strapi response as JSON:", error)
        // Keep as text if not JSON
      }

      return NextResponse.redirect(
        new URL(`/?error=strapi_error&status=${res.status}&details=${encodeURIComponent(errorDetails)}`, request.url),
      )
    }

    // Parse the response
    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error("Failed to parse Strapi response as JSON:", e)
      return NextResponse.redirect(new URL("/?error=invalid_json", request.url))
    }

    console.log("Parsed Strapi data:", data)

    if (!data.jwt) {
      console.error("No JWT in response. Available keys:", Object.keys(data))
      return NextResponse.redirect(new URL("/?error=no_jwt", request.url))
    }

    // Set cookies
    const cookieStore = await cookies()
    const requestUrl = new URL(request.url)
    const hostname = requestUrl.hostname

    let domain: string | undefined
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      domain = undefined
    } else if (hostname.includes("vercel.app")) {
      domain = hostname
    } else {
      const rootDomain = hostname.replace(/^www\./, "")
      domain = `.${rootDomain}`
    }

    console.log("Setting cookie with domain:", domain)

    cookieStore.set("jwt", data.jwt, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      domain: domain,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
    })

    if (data.user) {
      cookieStore.set(
        "user",
        JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
        }),
        {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
          domain: domain,
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax" as const,
        },
      )
    }

    console.log("=== AUTH SUCCESS ===")
    return NextResponse.redirect(new URL("/courses", request.url))
  } catch (error) {
    console.error("Authentication callback error:", error)
    return NextResponse.redirect(
      new URL(`/?error=callback_error&message=${encodeURIComponent(error.message)}`, request.url),
    )
  }
}
