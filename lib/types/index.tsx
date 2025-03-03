import { z } from "zod";
import { schemas } from "../api";

export type App = z.infer<typeof schemas.AppOutSchema>;
export type AppCreate = z.infer<typeof schemas.AppCreateSchema>;
