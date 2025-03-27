import { http } from "@/lib/http-client";
import { MediaType } from "@/lib/types";

export type ListMediaProp = {
    appId: string;
    mediaType?: MediaType;
    limit?: number;
    page?: number;
};

export const mediaActions = {
    listMedia: async ({ appId, mediaType = "image", limit = 100, page = 1 }: ListMediaProp) =>
        await http.list_app_media({ params: { app_id: appId }, queries: { media_type: mediaType, limit, offset: page - 1 } }),
};
