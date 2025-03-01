"use client";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { signOut } from "next-auth/react";
import { getToken, getTransactionId } from "./utils";

const requestCallback = async (config: InternalAxiosRequestConfig<any>) => {
    const token = await getToken();
    const transactionId = getTransactionId();
    config.headers.setContentType("application/json");
    config.headers.set("x-transaction-id", transactionId);
    if (token) config.headers.setAuthorization(token);
    return config;
};

const requestError = (error: any) => {
    return Promise.reject(error);
};

const responseCallback = (response: AxiosResponse<any, any>) => {
    return Promise.resolve(response);
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
