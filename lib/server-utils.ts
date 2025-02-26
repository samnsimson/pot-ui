import { getSession } from "next-auth/react";

export const getHeaders = async () => {
    const session = await getSession();
    const token = session ? `Bearer ${session.accessToken}` : undefined;
    return { "Content-Type": "application/json", Authorization: token };
};
