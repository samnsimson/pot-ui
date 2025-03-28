import { AppsApi, AuthApi, Configuration, ContentApi, MediaApi } from "@/api/client";
import { axiosInstance } from "../axios-instance";

const basePath = "/data";
const config = new Configuration({ basePath });

export const api = {
    auth: new AuthApi(config, basePath, axiosInstance),
    apps: new AppsApi(config, basePath, axiosInstance),
    media: new MediaApi(config, basePath, axiosInstance),
    content: new ContentApi(config, basePath, axiosInstance),
};
