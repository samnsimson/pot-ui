"use client";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const requestCallback = (config: InternalAxiosRequestConfig<any>) => {
    return config;
};

const requestError = (error: any) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
};

const responseCallback = (response: AxiosResponse<any, any>) => {
    return response.data;
};

const responseError = (error: any) => {
    console.log("🚀 ~ responseError ~ error:", error);
    return Promise.reject(error);
};

const timeout = 10000;
const headers = { "Content-Type": "application/json" };
const axiosInstance = axios.create({ headers, timeout });
axiosInstance.interceptors.request.use(requestCallback, requestError);
axiosInstance.interceptors.response.use(responseCallback, responseError);

export default axiosInstance;
