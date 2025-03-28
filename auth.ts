import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { env } from "./env";
import { ServerApi } from "./lib/api/server";

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: { email: { label: "Email", type: "text" }, password: { label: "Password", type: "password" } },
            authorize: async (credentials) => {
                try {
                    if (!credentials) return null;
                    const api = new ServerApi();
                    const { email: username, password } = credentials;
                    const { data } = await api.auth.login(username, password);
                    const { status, user_id, token_max_age, ...rest } = data;
                    if (status !== "Success") return null;
                    return { id: user_id, expires_in: token_max_age, ...rest };
                } catch (error) {
                    console.log("🚀 ~ authorize: ~ error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            const currentTime = Math.floor(Date.now() / 1000);
            if (user) {
                token.sub = user.id;
                token.accessToken = user.access_token;
                token.refreshToken = user.refresh_token;
                token.expiresAt = currentTime + user.expires_in;
                return token;
            } else if (currentTime < token.expiresAt) {
                return token;
            } else {
                try {
                    const api = new ServerApi();
                    const { data: resp } = await api.auth.refreshToken({ token: token.refreshToken });
                    token.sub = resp.user_id;
                    token.accessToken = resp.access_token;
                    token.refreshToken = resp.refresh_token;
                    token.expiresAt = currentTime + resp.token_max_age;
                    return token;
                } catch (error) {
                    return token;
                }
            }
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.expiresAt = token.expiresAt;
            return session;
        },
    },
    pages: { signIn: "/login" },
    secret: env.NEXTAUTH_SECRET,
};
