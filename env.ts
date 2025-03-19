import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        AUTH_SECRET: z.string().min(1),
        USERNAME: z.string().min(1),
        PASSWORD: z.string().min(1),
        NEXTAUTH_SECRET: z.string().min(1),
        NEXTAUTH_URL: z.string().url(),
        ARCJET_KEY: z.string().min(1),
        KEYCLOAK_ISSUER: z.string().min(1),
        KEYCLOAK_CLIENT_ID: z.string().min(1),
        KEYCLOAK_CLIENT_URL: z.string().min(1),
        KEYCLOAK_CLIENT_REALM: z.string().min(1),
        KEYCLOAK_CLIENT_SECRET: z.string().min(1),
    },
    client: {},
    runtimeEnv: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        ARCJET_KEY: process.env.ARCJET_KEY,
        KEYCLOAK_ISSUER: process.env.KEYCLOAK_ISSUER,
        KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
        KEYCLOAK_CLIENT_URL: process.env.KEYCLOAK_CLIENT_URL,
        KEYCLOAK_CLIENT_REALM: process.env.KEYCLOAK_CLIENT_REALM,
        KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET,
    },
});
