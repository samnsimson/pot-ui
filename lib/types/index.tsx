import { z } from "zod";
import { schemas } from "../api";

export type App = z.infer<typeof schemas.AppOutSchema>;
