import { env } from "@/env";
import { z } from "zod";

const CredentialsSchema = z.object({ username: z.string().min(3), password: z.string().min(8) });
type Credentials = z.infer<typeof CredentialsSchema>;

export class Zitadel {
    private loginUrl: string;
    private userInfoUrl: string;

    constructor() {
        this.loginUrl = `${env.ZITADEL_ISSUER}/oauth/v2/token`;
        this.userInfoUrl = `${env.ZITADEL_ISSUER}/oidc/v1/userinfo`;
    }

    public async login({ username, password }: Credentials) {
        try {
            console.log(env);
            const credentials = CredentialsSchema.safeParse({ username, password });
            if (!credentials.success) throw new Error(credentials.error.message);
            const headers = { "Content-Type": "application/x-www-form-urlencoded" };
            const formData = new URLSearchParams();
            formData.append("grant_type", "client_credentials");
            formData.append("client_id", env.ZITADEL_CLIENT_ID);
            formData.append("client_secret", env.ZITADEL_CLIENT_SECRET);
            formData.append("username", credentials.data.username);
            formData.append("password", credentials.data.password);
            formData.append("scope", "openid profile email urn:zitadel:iam:org:project:roles");
            const tokenResponse = await fetch(this.loginUrl, { method: "POST", headers, body: formData });
            if (!tokenResponse.ok) throw new Error(await tokenResponse.text());
            const tokenData = await tokenResponse.json();
            console.log("🚀 ~ Zitadel ~ login ~ tokenData:", tokenData);
            return tokenData;
        } catch (error) {
            console.log("🚀 ~ Zitadel ~ login ~ error:", error);
            throw error;
        }
    }

    public async getUserInfo(accessToken: string) {
        try {
            if (!accessToken) throw new Error("Missing access token");
            const headers = { Authorization: `Bearer ${accessToken}` };
            const userInfoResponse = await fetch(this.userInfoUrl, { headers });
            if (!userInfoResponse.ok) throw new Error(await userInfoResponse.text());
            const userInfo = await userInfoResponse.json();
            return userInfo;
        } catch (error) {
            console.log("🚀 ~ Zitadel ~ login ~ error:", error);
            throw error;
        }
    }
}
