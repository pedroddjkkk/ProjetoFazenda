import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./lib/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accesToken");
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  try {
    const validated = await verifyJwt(token?.value);

    if (!validated?.payload) {
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(url);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:
    "/((?!login|_next/static|_next/image|favicon.ico|api/login|api/logout|images).*)",
};
