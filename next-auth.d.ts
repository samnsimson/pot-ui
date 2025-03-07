// next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession["user"] {
        id: string;
        host: string;
        role: string;
        accessToken: string;
    }
}
