"use server";
import { UserCreateSchema } from "@/api/client";
import { env } from "@/env";
import { Api } from "@/lib/api/client";

export const signup = async (body: UserCreateSchema) => {
    const api = new Api({ basePath: env.BASE_PATH });
    return await api.signup({ ...body });
};
