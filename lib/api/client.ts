import { AppCreateSchema, AppsApi, AuthApi, Configuration, ContentApi, MediaApi, UserCreateSchema } from "@/api/client";
import { getAxiosInstance } from "../axios-instance";
import { AxiosInstance, AxiosResponse } from "axios";
import { IApiConfig, ICreateContent, IDeleteMedia, IExportContent, IGetMedia, IListMedia, ILogin, IUpdateContent, IUpdateMedia, IUploadMedia } from "./types";

const basePath = "/data";
const config = new Configuration({ basePath: basePath });

export const api = {
    auth: new AuthApi(config, basePath, getAxiosInstance(basePath)),
    apps: new AppsApi(config, basePath, getAxiosInstance(basePath)),
    media: new MediaApi(config, basePath, getAxiosInstance(basePath)),
    content: new ContentApi(config, basePath, getAxiosInstance(basePath)),
};

export class Api {
    private readonly config: Configuration;
    private readonly axiosInstance: AxiosInstance;
    public readonly auth: AuthApi;
    public readonly apps: AppsApi;
    public readonly media: MediaApi;
    public readonly content: ContentApi;

    constructor({ basePath }: IApiConfig) {
        this.config = new Configuration({ basePath });
        this.axiosInstance = getAxiosInstance(basePath);
        this.auth = new AuthApi(this.config, basePath, this.axiosInstance);
        this.apps = new AppsApi(this.config, basePath, this.axiosInstance);
        this.media = new MediaApi(this.config, basePath, this.axiosInstance);
        this.content = new ContentApi(this.config, basePath, this.axiosInstance);
    }
    // HELPER
    private resolve = <T>(promise: Promise<AxiosResponse<T>>) => promise.then((response) => response.data);

    // AUTH RESOURCES
    public signup = async (data: UserCreateSchema) => this.resolve(this.auth.signup(data));
    public refreshToken = async (token: string) => this.resolve(this.auth.refreshToken({ token }));
    public login = async ({ username, password }: ILogin) => this.resolve(this.auth.login(username, password));

    // APPS RESOURCES
    public listApps = async () => this.resolve(this.apps.listApps());
    public getApp = async (key: string) => this.resolve(this.apps.getAppByIdOrSlug(key));
    public createApp = async (data: AppCreateSchema) => this.resolve(this.apps.createApp(data));
    public getAppUsers = async (appId: string) => this.resolve(this.apps.getAppUsers(appId));
    public deleteApp = async (appId: string) => this.resolve(this.apps.deleteApp(appId));

    // MEDIA RESOURCES
    public listMedia = async ({ appId, mediaType, limit, page }: IListMedia) => this.resolve(this.media.listAppMedia(appId, mediaType, limit, page));
    public uploadMedia = async ({ appId, file }: IUploadMedia) => this.resolve(this.media.uploadMedia(appId, file));
    public updateMedia = async ({ appId, mediaId, data }: IUpdateMedia) => this.resolve(this.media.updateMedia(appId, mediaId, data));
    public getMedia = async ({ appId, mediaId }: IGetMedia) => this.resolve(this.media.getMedia(appId, mediaId));
    public deleteMedia = async ({ appId, mediaId }: IDeleteMedia) => this.resolve(this.media.deleteMedia(appId, mediaId));

    // CONTENT RESOURCES
    public getContent = async (appId: string) => this.resolve(this.content.getContent(appId));
    public createContent = async ({ appId, data }: ICreateContent) => this.resolve(this.content.createContent(appId, data));
    public updateContent = async ({ appId, contentId, data }: IUpdateContent) => this.resolve(this.content.updateContent(appId, contentId, data));
    public exportContent = async ({ appId, contentId }: IExportContent) => this.resolve(this.content.exportContent(appId, contentId));
}
