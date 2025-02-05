"use server";
import { constants } from "@/constants/constants";
import { api, schemas } from "@/lib/api-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

type LoginSchema = z.infer<typeof schemas.Body_login>;
type SignupSchema = z.infer<typeof schemas.UserCreateSchema>;

export const login = async ({ username, password }: LoginSchema) => {
    let redirectUrl = "/";
    try {
        const cookieStore = await cookies();
        const response = await api.login({ username, password });
        cookieStore.set({ name: constants.ACCESS_TOKEN, value: response.access_token });
        redirectUrl = response.redirect_url;
    } catch (error) {
        console.log("🚀 ~ login ~ error:", error);
    } finally {
        redirect(redirectUrl);
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
