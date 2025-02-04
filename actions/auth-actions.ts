"use server";
import { constants } from "@/constants/constants";
import { api, schemas } from "@/lib/api-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

type LoginSchema = z.infer<typeof schemas.Body_login>;
type SignupSchema = z.infer<typeof schemas.UserCreateSchema>;

export const login = async ({ username, password }: LoginSchema) => {
    try {
        const { access_token } = await api.login({ username, password });
        const cookieStore = await cookies();
        const name = constants.ACCESS_TOKEN;
        const value = access_token;
        cookieStore.set({ name, value, httpOnly: true, path: "/", sameSite: true });
    } catch (error) {
        console.log("🚀 ~ login ~ error:", error);
    } finally {
        redirect("/");
    }
};

export const signup = async (body: SignupSchema) => {
    return await api.signup({ ...body });
};

export const logout = async () => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(constants.ACCESS_TOKEN);
    } catch (error) {
        console.log("🚀 ~ logout ~ error:", error);
    } finally {
        redirect("/login");
    }
};
