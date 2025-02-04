import { NextRequest, NextResponse } from "next/server";
import { constants } from "./constants/constants";

function checkAuthentication(request: NextRequest): boolean {
    const accessToken = request.cookies.get(constants.ACCESS_TOKEN);
    return !!accessToken;
}

export function middleware(request: NextRequest) {
    const isAuthenticated = checkAuthentication(request);
    const loginRoute = new URL("/login", request.url);
    if (!isAuthenticated) return NextResponse.redirect(loginRoute);
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
