import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getUserMeLoader } from "@/lib/services/user"

// Define an array of protected routes
const protectedRoutes = [
  "/dashboard",
  "/dashboard/*", // This will match any path that starts with /dashboard/
]

// Helper function to check if a path is protected
function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => {
    // For exact matches
    if (!route.includes("*")) {
      return path === route
    }

    // For wildcard routes (e.g., /dashboard/*)
    const basePath = route.replace("/*", "")
    return path === basePath || path.startsWith(`${basePath}/`)
  })
}

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader()
  const currentPath = request.nextUrl.pathname

  if (isProtectedRoute(currentPath) && user.ok === false) {
    const redirectUrl = new URL("/", request.url)
    redirectUrl.searchParams.set("redirect", currentPath)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

// Configure matcher for better performance
export const config = {
  matcher: [
    // Match /dashboard and any path under /dashboard
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/dashboard",
    "/dashboard/:path*",
  ],
}


