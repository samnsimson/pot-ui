"use server";
import { UserCreateSchema } from "@/api/client";
import { api } from "@/lib/api/client";

export const signup = async (body: UserCreateSchema) => {
    return await api.auth.signup({ ...body });
};
