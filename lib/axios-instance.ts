"use client";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";

const requestCallback = async (config: InternalAxiosRequestConfig<any>) => {
    const session = await getSession();
    if (session?.accessToken) config.headers.Authorization = `Bearer ${session.accessToken}`;
    return config;
};

const requestError = (error: any) => {
    return Promise.reject(error);
};

const responseCallback = (response: AxiosResponse<any, any>) => {
    return response.data;
};

const responseError = (error: any) => {
    console.log("🚀 ~ responseError ~ error:", error);
    if (error.status === 401) signOut({ redirect: true, callbackUrl: "/login" });
    return Promise.reject(error);
};

const headers = { "Content-Type": "application/json" };
const axiosInstance = axios.create({ headers, timeout: 1000 });
axiosInstance.interceptors.request.use(requestCallback, requestError);
axiosInstance.interceptors.response.use(responseCallback, responseError);

export default axiosInstance;
