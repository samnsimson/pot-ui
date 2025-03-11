import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "./lib/api";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: { email: { label: "Email", type: "text" }, password: { label: "Password", type: "password" } },
            async authorize(credentials) {
                try {
                    if (!credentials) return null;
                    const { email: username, password } = credentials;
                    const { user_id, access_token, refresh_token, ...user } = await api.login({ username, password });
                    return { id: user_id, accessToken: access_token, refreshToken: refresh_token, ...user };
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                const { id, host, role, accessToken, refreshToken, token_max_age } = user;
                const tokenMaxAge = Date.now() + token_max_age * 1000;
                return { ...token, id, host, role, accessToken, refreshToken, tokenMaxAge };
            } else if (Date.now() < token.tokenMaxAge) {
                return token;
            } else {
                try {
                    console.log("****TOKEN EXPIRED, REFRESHING****");
                    const refreshedToken = await api.refresh_token({ token: token.refreshToken });
                    const { user_id, host, role, access_token: accessToken, refresh_token: refreshToken, ...refreshedTokenRest } = refreshedToken;
                    const tokenMaxAge = Date.now() + refreshedTokenRest.token_max_age * 1000;
                    return { ...token, host, role, id: user_id, accessToken, refreshToken, tokenMaxAge };
                } catch (error) {
                    console.log("🚀 ~ jwt ~ error:", error);
                    return token;
                }
            }
        },
        async session({ session, token }: any) {
            if (!token) return session;
            session.user.id = token.sub;
            session.user.host = token.host;
            session.user.name = token.name;
            session.role = token.role;
            session.accessToken = token.accessToken;
            return session;
        },
    },
    pages: { signIn: "/login" },
    secret: process.env.NEXTAUTH_SECRET,
};
