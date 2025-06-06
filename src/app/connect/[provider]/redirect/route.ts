import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getStrapiURL } from "@/lib/utils"

export async function GET(request: NextRequest, { params }: { params: Promise<{ [key: string]: string }> }) {
  const resolvedParams = await params
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("access_token")

  if (!token) return NextResponse.redirect(new URL("/", request.url))

  const provider = resolvedParams.provider
  const backendUrl = getStrapiURL()
  const path = `/api/auth/${provider}/callback`

  const url = new URL(backendUrl + path)
  url.searchParams.append("access_token", token)

  // Add detailed logging for debugging
  console.log("=== AUTH CALLBACK DEBUG ===")
  console.log("Provider:", provider)
  console.log("Backend URL:", backendUrl)
  console.log("Full callback URL:", url.href)
  console.log("Access token (first 10 chars):", token.substring(0, 10) + "...")
  console.log("Environment:", process.env.NODE_ENV)
  console.log("Request hostname:", new URL(request.url).hostname)

  try {
    const res = await fetch(url.href, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Add User-Agent for some providers that require it
        "User-Agent": "NextJS-App/1.0",
      },
    })

    console.log("Strapi response status:", res.status)
    console.log("Strapi response headers:", Object.fromEntries(res.headers.entries()))

    if (!res.ok) {
      const errorText = await res.text()
      console.error("Strapi error response:", errorText)
      throw new Error(`Authentication failed: ${res.status} - ${errorText}`)
    }

    const data = await res.json()
    console.log("Strapi response data keys:", Object.keys(data))

    if (!data.jwt) {
      console.error("No JWT in response:", data)
      throw new Error("No JWT token received")
    }

    const cookieStore = await cookies()
    const requestUrl = new URL(request.url)
    const hostname = requestUrl.hostname

    // Fix domain logic
    let domain: string | undefined

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      domain = undefined
    } else if (hostname.includes("vercel.app")) {
      domain = hostname
    } else {
      // For custom domains, use root domain with leading dot
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
    // Redirect with error details for debugging
    const errorUrl = new URL("/", request.url)
    errorUrl.searchParams.set("error", "auth_failed")
    errorUrl.searchParams.set("provider", provider)
    return NextResponse.redirect(errorUrl)
  }
}
