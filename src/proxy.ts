import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {

  const path = request.nextUrl.pathname;

  const publicPaths = ["/", "/login", "/signup", "/forgotpassword", "/resetpassword", "/verifyemail", "/verifyemail-sent"];
  const isPublicPath = publicPaths.includes(path);

  const token = request.cookies.get("token")?.value || "";

  if ((path === "/login" || path === "/signup" || path === "/verifyemail-sent") && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/forgotpassword",
    "/resetpassword",
    "/verifyemail",
    "/verifyemail-sent",
    "/about",
    "/courses/:path*",
    "/flashcards/:path*",
    "/minigames/:path*",
    "/progress/:path*",
    "/profile/:path*",
  ]
}