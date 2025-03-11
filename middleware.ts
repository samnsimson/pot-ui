import { NextRequest, NextResponse } from "next/server";
import { aj } from "./aj.config";
import { forbidden } from "next/navigation";

export async function middleware(request: NextRequest) {
    const decision = await aj.protect(request);
    if (decision.isDenied()) return forbidden();
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
