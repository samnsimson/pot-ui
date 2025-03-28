import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getToken, getTransactionId } from "./utils";

export const getAxiosInstance = (baseURL: string) => {
    const requestCallback = async (config: InternalAxiosRequestConfig<any>) => {
        const token = await getToken();
        const transactionId = getTransactionId();
        const hasContentType = config.headers.hasContentType();
        const hasAuthorization = config.headers.hasAuthorization();
        if (!hasContentType) config.headers.setContentType("application/json");
        if (!hasAuthorization && token) config.headers.setAuthorization(token);
        config.headers.set("x-transaction-id", transactionId);
        return config;
    };

    const requestError = (error: any) => Promise.reject(error);
    const responseCallback = (response: AxiosResponse<any, any>) => Promise.resolve(response);
    const responseError = (error: any) => Promise.reject(error);

    const axiosInstance = axios.create({ baseURL, timeout: 5000 });
    axiosInstance.interceptors.request.use(requestCallback, requestError);
    axiosInstance.interceptors.response.use(responseCallback, responseError);
    return axiosInstance;
};
