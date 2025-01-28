"use server";
import { AuthApi } from "@/lib/api-client";
import { LoginSchema } from "@/lib/schema/auth-schema";
import { z } from "zod";

export const login = async ({ username, password }: z.infer<typeof LoginSchema>) => {
    const result = await AuthApi.login({ username, password });
    return result;
};
