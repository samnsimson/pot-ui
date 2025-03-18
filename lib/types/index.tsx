import { z } from "zod";
import { schemas } from "../api";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { AxiosError } from "axios";

export type App = z.infer<typeof schemas.AppOutSchema>;
export type AppCreate = z.infer<typeof schemas.AppCreateSchema>;
export type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
export type ContentCreate = z.infer<typeof schemas.ContentCreateSchema>;
export type ContentUpdate = z.infer<typeof schemas.ContentUpdateSchema>;
export type Content = z.infer<typeof schemas.ContentOutSchema>;
export type AppUsers = z.infer<typeof schemas.UserOutSchema>;
export type ApiError = AxiosError<{ detail: any }>;
