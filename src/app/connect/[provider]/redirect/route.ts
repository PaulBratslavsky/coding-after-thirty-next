import { NextResponse } from "next/server"
import { getStrapiURL } from "@/lib/utils"

export async function GET(request: Request, { params }: { params: Promise<{ [key: string]: string }> }) {
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
      console.error("Error response from Strapi:", res.status, res.statusText)
      return NextResponse.redirect(new URL("/auth/error", request.url))
    }

    const data = await res.json()

    // Check for redirectUrl cookie
    const cookies = request.headers.get("cookie")

    console.log("######################### Cookies: #########################", cookies)
    const redirectUrlCookie = cookies?.split(";").find((c) => c.trim().startsWith("redirectUrl="))
    let redirectPath = "/courses"

    console.log("######################### Redirect URL Cookie: #########################", redirectUrlCookie)

    if (redirectUrlCookie) {
      const encodedRedirectUrl = redirectUrlCookie.split("=")[1]
      redirectPath = decodeURIComponent(encodedRedirectUrl)
    }

    // Create the redirect response
    const redirectUrl = new URL(redirectPath, request.url)
    const response = NextResponse.redirect(redirectUrl)

    // Set the JWT cookie on the response object
    response.cookies.set("jwt", data.jwt, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      domain: new URL(request.url).hostname,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    // Clear the redirectUrl cookie
    response.cookies.set("redirectUrl", "", {
      maxAge: 0,
      path: "/",
      domain: new URL(request.url).hostname,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return response
  } catch (error) {
    console.error("Error during auth callback:", error)
    return NextResponse.redirect(new URL("/auth/error", request.url))
  }
}

