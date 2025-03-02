import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export const server = {
    getToken: async () => {
        const session = await getServerSession(authOptions);
        const token = session ? `Bearer ${session.accessToken}` : undefined;
        return token;
    },
};
