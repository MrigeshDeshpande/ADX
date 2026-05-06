import { NextResponse } from "next/server";

export function proxy(request) {
  if (request.nextUrl.pathname !== "/thank-you-contact") {
    return NextResponse.next();
  }

  const tokenFromQuery = request.nextUrl.searchParams.get("token");
  const tokenFromCookie = request.cookies.get("contact_thank_you_token")?.value;

  if (!tokenFromQuery || !tokenFromCookie || tokenFromQuery !== tokenFromCookie) {
    return NextResponse.redirect(new URL("/contact", request.url));
  }

  const response = NextResponse.next();
  response.cookies.set("contact_thank_you_token", "", {
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

export const config = {
  matcher: ["/thank-you-contact"],
};
