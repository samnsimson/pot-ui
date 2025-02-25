import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "./lib/api-client";
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
                    const { user_id, ...user } = await api.login({ username, password });
                    return { id: user_id, ...user };
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) token.accessToken = user.token;
            return token;
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
    pages: { signIn: "/login" },
    secret: process.env.NEXTAUTH_SECRET,
};
