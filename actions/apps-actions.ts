import { authOptions } from "@/auth";
import { api } from "@/lib/api";
import { getServerSession } from "next-auth";

export const getSession = async () => {
    return await getServerSession(authOptions);
};

export const getToken = async () => {
    const session = await getSession();
    const token = session ? `Bearer ${session.accessToken}` : undefined;
    return token;
};
export const getApps = async () => {
    console.log(getApps.name);
    const token = await getToken();
    return await api.list_apps({ headers: { Authorization: token } });
};
