// "use server";
// import { api, schemas } from "@/lib/api";
// import { getHeaders } from "@/lib/server-utils";
// import { z } from "zod";

// export const getApp = async (id: string) => {
//     try {
//         const headers = await getHeaders();
//         return await api.get_app({ params: { id }, headers });
//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// };

// export const getApps = async () => {
//     try {
//         const headers = await getHeaders();
//         console.log("🚀 ~ getApp ~ headers:", headers);
//         return await api.list_apps({ headers });
//     } catch (error) {
//         console.log("🚀 ~ getApps ~ error:", error);
//         return [];
//     }
// };

// export const createApp = async (data: z.infer<typeof schemas.AppCreateSchema>) => {
//     try {
//         const headers = await getHeaders();
//         return await api.create_app(data, { headers });
//     } catch (error: any) {
//         console.log("🚀 ~ createApp ~ error:", error);
//         throw new Error(error.message);
//     }
// };
