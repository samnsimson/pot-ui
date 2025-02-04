import { constants } from "@/constants/constants";
import { cookies } from "next/headers";

export const getAccessToken = async () => {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get(constants.ACCESS_TOKEN);
    if (!accessToken) throw new Error("Unable to access request cookies");
    return `Bearer ${accessToken.value}`;
};

export const getHeaders = async () => {
    const token = await getAccessToken();
    return { headers: { "Content-Type": "application/json", Authorization: token } };
};
