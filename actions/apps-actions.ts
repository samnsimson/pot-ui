import { api } from "@/lib/api";
import { server } from "./server-actions";

export const getApps = async () => {
    const token = await server.getToken();
    return await api.list_apps({ headers: { Authorization: token } });
};
