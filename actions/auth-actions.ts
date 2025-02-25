"use server";
import { api, schemas } from "@/lib/api-client";
import { z } from "zod";

type SignupSchema = z.infer<typeof schemas.UserCreateSchema>;

export const signup = async (body: SignupSchema) => {
    return await api.signup({ ...body });
};
