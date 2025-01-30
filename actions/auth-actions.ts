"use server";
import { api, schemas } from "@/lib/api-client";
import { z } from "zod";

type LoginSchema = z.infer<typeof schemas.Body_login>;
type SignupSchema = z.infer<typeof schemas.UserCreateSchema>;

export const login = async ({ username, password }: LoginSchema) => {
    const result = await api.login({ username, password });
    return result;
};

export const signup = async (body: SignupSchema) => {
    return await api.signup({ ...body });
};
