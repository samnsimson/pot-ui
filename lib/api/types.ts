import { ContentCreateSchema, MediaTypeEnum, MediaUpdateSchema } from "@/api/client";

export interface IApiConfig {
    basePath: string;
}

export interface ILogin {
    username: string;
    password: string;
}

export interface IListMedia {
    appId: string;
    mediaType?: MediaTypeEnum;
    limit?: number;
    page?: number;
}

export interface IUploadMedia {
    appId: string;
    file: File;
}

export interface IUpdateMedia {
    appId: string;
    mediaId: string;
    data: MediaUpdateSchema;
}

export interface IGetMedia {
    appId: string;
    mediaId: string;
}
export interface IDeleteMedia {
    appId: string;
    mediaId: string;
}

export interface ICreateContent {
    appId: string;
    data: ContentCreateSchema;
}

export interface IUpdateContent {
    appId: string;
    contentId: string;
    data: ContentCreateSchema;
}

export interface IExportContent {
    appId: string;
    contentId: string;
}
