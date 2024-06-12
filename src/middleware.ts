import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/post-room", request.nextUrl));
  }
  if (!isPublicPath && !token && path != "/") {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile/:path*",
    "/dashboard",
    "/post-room",
  ],
};

/*
 connect();
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ id: userId }).select(
    "-password -isVerified"
  );
  if (!user) return NextResponse.redirect(new URL("/login", request.nextUrl));
  if(isSecurePath && !user.isAdmin){}
*/
