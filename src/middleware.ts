import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accesToken");
  const url = request.nextUrl.clone();
  const secret_key = new TextEncoder().encode(process.env.JWT_SECRET);
  url.pathname = "/login";

  if (!token) return NextResponse.redirect(url);

  try {
    const validated = await jose.jwtVerify(token?.value, secret_key!);

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
