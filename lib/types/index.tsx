import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { AxiosError } from "axios";
import {
    AppCreateSchema,
    AppOutSchema,
    ContentCreateSchema,
    ContentOutSchema,
    ContentUpdateSchema,
    MediaResponse,
    MediaTypeEnum,
    UserOutSchema,
} from "@/api/client";

export type App = AppOutSchema;
export type AppCreate = AppCreateSchema;
export type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
export type ContentCreate = ContentCreateSchema;
export type ContentUpdate = ContentUpdateSchema;
export type Content = ContentOutSchema;
export type AppUsers = UserOutSchema;
export type ApiError = AxiosError<{ detail: any }>;
export type MediaType = MediaTypeEnum;
export type Media = MediaResponse;
