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

  try {
    const res = await fetch(url.href)

    if (!res.ok) {
      throw new Error(`Authentication failed: ${res.status}`)
    }

    const data = await res.json()

    if (!data.jwt) {
      throw new Error("No JWT token received")
    }

    const cookieStore = await cookies()
    const requestUrl = new URL(request.url)

    // Determine environment and domain settings
    const isProduction = process.env.NODE_ENV === "production"
    const isVercel = process.env.VERCEL === "1"

    // Set domain based on environment
    let domain: string | undefined

    if (isProduction && isVercel) {
      // Use Vercel's automatic URL or your custom domain
      domain = process.env.VERCEL_URL || requestUrl.hostname
    } else if (requestUrl.hostname === "localhost") {
      // For localhost, don't set domain
      domain = undefined
    } else {
      // For preview deployments, use current hostname
      domain = requestUrl.hostname
    }

    console.log("Setting cookie with domain:", domain)

    // Set the JWT cookie with proper configuration
    cookieStore.set("jwt", data.jwt, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      domain: domain,
      httpOnly: true,
      secure: isProduction, // Only secure in production
      sameSite: "lax" as const,
    })

    // Optional: Set additional cookies for user info
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
          httpOnly: false, // Allow client-side access for user info
          secure: isProduction,
          sameSite: "lax" as const,
        },
      )
    }

    return NextResponse.redirect(new URL("/courses", request.url))
  } catch (error) {
    console.error("Authentication callback error:", error)
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
  }
}
