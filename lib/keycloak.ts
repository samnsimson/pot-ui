import { env } from "@/env";

interface KeycloakConfig {
    clientId: string;
    clientSecret: string;
    realm: string;
    issuer: string;
}

interface LoginProps {
    username: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    "not-before-policy": number;
    session_state: string;
    scope: string;
    [x: string]: any;
}

interface UserProfile {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    [x: string]: any;
}

interface TokenPayload {
    sub: string;
    exp: number;
    realm_access?: { roles: string[] };
    resource_access?: { [clientId: string]: { roles: string[] } };
    [x: string]: any;
}

export class Keycloak {
    private config: KeycloakConfig;
    private tokenEndpoint: string;
    private userInfoEndpoint: string;

    constructor(config: KeycloakConfig) {
        this.config = config;
        this.tokenEndpoint = `${this.config.issuer}/protocol/openid-connect/token`;
        this.userInfoEndpoint = `${this.config.issuer}/protocol/openid-connect/userinfo`;
    }

    public async login({ username, password }: LoginProps): Promise<LoginResponse> {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/x-www-form-urlencoded");
            const body = new URLSearchParams();
            body.append("username", username);
            body.append("password", password);
            body.append("grant_type", "password");
            body.append("client_id", this.config.clientId);
            body.append("client_secret", this.config.clientSecret);
            const response = await fetch(this.tokenEndpoint, { method: "POST", headers, body });
            if (!response.ok) throw new Error(`Login failed: ${response.statusText}`);
            return await response.json();
        } catch (error: any) {
            console.error("KeycloakSDK ~ login ~ error:", error);
            throw new Error(error.message);
        }
    }

    public async refreshAccessToken(refreshToken: string): Promise<LoginResponse> {
        try {
            const headers = new Headers();
            const body = new URLSearchParams();
            headers.append("Content-Type", "application/x-www-form-urlencoded");
            body.append("grant_type", "refresh_token");
            body.append("client_id", this.config.clientId);
            body.append("client_secret", this.config.clientSecret);
            body.append("refresh_token", refreshToken);
            const response = await fetch(this.tokenEndpoint, { method: "POST", headers, body });
            if (!response.ok) throw new Error(`Token refresh failed: ${response.statusText}`);
            return await response.json();
        } catch (error: any) {
            console.error("KeycloakSDK ~ refreshAccessToken ~ error:", error);
            throw new Error(error.message);
        }
    }

    public async getUserProfile(accessToken: string): Promise<UserProfile> {
        try {
            const headers = new Headers();
            headers.append("Authorization", `Bearer ${accessToken}`);
            const response = await fetch(this.userInfoEndpoint, { method: "GET", headers });
            if (!response.ok) throw new Error(`Failed to fetch user profile: ${response.statusText}`);
            return await response.json();
        } catch (error: any) {
            console.error("KeycloakSDK ~ getUserProfile ~ error:", error);
            throw new Error(error.message);
        }
    }

    // Logout (Keycloak does not support direct logout via API without redirect)
    public async logout(accessToken: string, refreshToken: string, redirectUri?: string): Promise<void> {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/x-www-form-urlencoded");
            const body = new URLSearchParams();
            body.append("client_id", this.config.clientId);
            body.append("client_secret", this.config.clientSecret);
            body.append("refresh_token", refreshToken);
            await fetch(`${this.config.issuer}/protocol/openid-connect/revoke`, { method: "POST", headers, body });
            if (redirectUri) {
                const logoutUrl = `${this.config.issuer}/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent(redirectUri)}`;
                window.location.href = logoutUrl;
            }
        } catch (error: any) {
            console.error("KeycloakSDK ~ logout ~ error:", error);
            throw new Error(error.message);
        }
    }
}

export const auth = new Keycloak({
    clientId: env.KEYCLOAK_CLIENT_ID,
    clientSecret: env.KEYCLOAK_CLIENT_SECRET,
    realm: env.KEYCLOAK_CLIENT_REALM,
    issuer: env.KEYCLOAK_ISSUER,
});
