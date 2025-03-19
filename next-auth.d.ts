// next-auth.d.ts

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface User {
        access_token: string;
        refresh_token: string;
        expires_in: number;
    }

    interface Session {
        accessToken: string;
        refreshToken: string;
        idToken: string;
        expiresAt: number;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        refreshToken: string;
        idToken: string;
        expiresAt: number;
    }
}
