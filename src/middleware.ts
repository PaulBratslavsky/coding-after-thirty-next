import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// While the site is rebuilt it shows only its public pages; every other route goes home.
// The course, dashboard and sign-in routes are still in the code, unreachable, and the
// auth-checking middleware they used is in git history (before the legal-pages-for-oauth branch).
const publicPaths = new Set(["/", "/privacy", "/terms"]);

export function middleware(request: NextRequest) {
  if (publicPaths.has(request.nextUrl.pathname)) return NextResponse.next();
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  // Everything except Next's own assets and files with an extension (favicon, public/*.svg).
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
