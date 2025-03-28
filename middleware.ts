import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    if (!token) return NextResponse.redirect(new URL("/login", request.url));
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-access-token", token.accessToken);
    requestHeaders.set("x-pathname", request.nextUrl.pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
