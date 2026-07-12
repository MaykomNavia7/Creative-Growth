import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple middleware stub showing dynamic role-based guarding
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Guard dashboard routes (Mock simulation)
  if (path.startsWith("/dashboard")) {
    // In a real environment, redirect to login if session is empty:
    // const hasSessionToken = request.cookies.has("next-auth.session-token") || request.cookies.has("__session");
    // if (!hasSessionToken) {
    //   return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    // }
  }

  return NextResponse.next();
}

// Apply middleware checks to dashboard sub-routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
