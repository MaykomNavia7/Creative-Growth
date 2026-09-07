import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 16 Proxy Convention
 * Replaces deprecated middleware.ts convention.
 * Dynamic role-based route guard stub.
 */
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Guard dashboard routes (Mock simulation)
  if (path.startsWith("/dashboard")) {
    // Session token check placeholder for future authentication phase
  }

  return NextResponse.next();
}

// Apply proxy checks to dashboard sub-routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
