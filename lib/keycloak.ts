import { env } from "@/env";
import Keycloak from "keycloak-js";

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

export class KeycloakAuth {
    public readonly keycloak: Keycloak;
    public readonly authenticated: boolean;
    public readonly accessToken: string | undefined;
    public readonly refreshToken: string | undefined;
    public readonly idToken: string | undefined;
    public readonly isTokenExpired: boolean;
    public readonly isTokenNearExpiry: boolean;
    private readonly loginUrl: string;
    private readonly clientId: string;
    private readonly clientSecret: string;

    constructor() {
        this.keycloak = new Keycloak({ url: env.KEYCLOAK_CLIENT_URL, realm: env.KEYCLOAK_CLIENT_REALM, clientId: env.KEYCLOAK_CLIENT_ID });
        this.authenticated = !!this.keycloak.authenticated;
        this.accessToken = this.getToken();
        this.refreshToken = this.keycloak.refreshToken;
        this.idToken = this.keycloak.idToken;
        this.isTokenExpired = this.keycloak.isTokenExpired();
        this.isTokenNearExpiry = this.keycloak.isTokenExpired(5);
        this.loginUrl = `${env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`;
        this.clientId = env.KEYCLOAK_CLIENT_ID;
        this.clientSecret = env.KEYCLOAK_CLIENT_SECRET;
    }

    private getToken() {
        return this.keycloak.token;
    }

    public async getUser() {
        try {
            const user = await this.keycloak.loadUserProfile();
            console.log("🚀 ~ Auth ~ getUser ~ user:", user);
            return user;
        } catch (error) {
            return null;
        }
    }

    public async login({ username, password }: LoginProps): Promise<LoginResponse> {
        try {
            const method = "POST";
            const headers = { "Content-Type": "application/x-www-form-urlencoded" };
            const params = new URLSearchParams();
            params.append("username", username);
            params.append("password", password);
            params.append("grant_type", "password");
            params.append("client_id", this.clientId);
            params.append("client_secret", this.clientSecret);
            const response = await fetch(this.loginUrl, { method, headers, body: params });
            if (!response.ok) throw new Error("Login failed");
            return await response.json();
        } catch (error: any) {
            console.log("🚀 ~ Auth ~ login ~ error:", error);
            throw new Error(error.message);
        }
    }

    public logout({ redirectUrl }: { redirectUrl?: string } = {}) {
        this.keycloak.logout({ redirectUri: redirectUrl });
    }

    public async refreshAccessToken() {
        try {
            const refreshed = await this.keycloak.updateToken(5);
            if (!refreshed) throw new Error("Unable to refresh token");
            return this.getToken();
        } catch (error) {
            console.log("🚀 ~ Auth ~ refreshAccessToken ~ error:", error);
            return undefined;
        }
    }

    public getUserRoles() {
        if (this.keycloak.realmAccess && "roles" in this.keycloak.realmAccess) return this.keycloak.realmAccess.roles;
        return [];
    }

    public hasRole(...roles: Array<string>) {
        return roles.every((role) => this.keycloak.hasRealmRole(role));
    }

    public hasPermission({ role, resource = undefined }: { role: string; resource?: string }) {
        return this.keycloak.hasResourceRole(role, resource);
    }
}

export const keycloakAuth = new KeycloakAuth();
