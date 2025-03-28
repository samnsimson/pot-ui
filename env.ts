import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { BASE_PATH } from "./api/client/base";

export const env = createEnv({
    server: {
        AUTH_SECRET: z.string().min(1),
        USERNAME: z.string().min(1),
        PASSWORD: z.string().min(1),
        NEXTAUTH_SECRET: z.string().min(1),
        NEXTAUTH_URL: z.string().url(),
        ARCJET_KEY: z.string().min(1),
        BASE_PATH: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_BASE_PATH: z.string().min(1),
    },
    runtimeEnv: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        ARCJET_KEY: process.env.ARCJET_KEY,
        BASE_PATH: process.env.BASE_PATH,
        NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    },
});
