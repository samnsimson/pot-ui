import { z } from "zod";
import { schemas } from "../api";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type App = z.infer<typeof schemas.AppOutSchema>;
export type AppCreate = z.infer<typeof schemas.AppCreateSchema>;
export type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
