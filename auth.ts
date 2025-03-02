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
                    const { user_id, access_token, ...user } = await api.login({ username, password });
                    return { id: user_id, accessToken: access_token, ...user };
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (!user) return token;
            token.id = user.id;
            token.host = user.host;
            token.name = user.username;
            token.accessToken = user.accessToken;
            return token;
        },
        async session({ session, token }: any) {
            if (!token) return session;
            session.user.id = token.sub;
            session.user.host = token.host;
            session.user.name = token.name;
            session.accessToken = token.accessToken;
            return session;
        },
    },
    pages: { signIn: "/login" },
    secret: process.env.NEXTAUTH_SECRET,
};
