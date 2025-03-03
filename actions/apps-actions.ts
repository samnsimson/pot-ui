import { authOptions } from "@/auth";
import { api } from "@/lib/api";
import { getServerSession } from "next-auth";
import { cache } from "react";

export const getSession = async () => {
    return await getServerSession(authOptions);
};

export const getToken = async () => {
    const session = await getSession();
    const token = session ? `Bearer ${session.accessToken}` : undefined;
    return token;
};
export const getApps = cache(async () => {
    const token = await getToken();
    return await api.list_apps({ headers: { Authorization: token } });
});
