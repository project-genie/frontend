import { NextResponse } from "next/server";

const protectedPages = ["/", "/organizations", "/organizations/:id"];

export function middleware(request) {
  if (protectedPages.find((page) => page === request.nextUrl.pathname)) {
    const token = request.cookies.get("accessToken");
    if (!token) {
      // send the user back to the sign in / home page or wherever
      const url = request.nextUrl.clone();
      url.pathname = "/account/signin";
      return NextResponse.redirect(url);
    }
  }
}
