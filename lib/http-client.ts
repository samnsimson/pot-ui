import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const requestCallback = (config: InternalAxiosRequestConfig<any>) => {
	const token = "";
	if (token) config.headers.Authorization = `Bearer ${token}`;
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
	if (error.response) {
		switch (error.response.status) {
			case 401:
				console.warn("Unauthorized! Redirecting to login...");
				window.location.href = "/login";
				break;
			default:
				break;
		}
	} else {
		console.error("Error:", error.message);
	}
	return Promise.reject(error);
};

const api = axios.create({
	baseURL: "http://localhost:8000/api/v1",
	timeout: 10000,
	headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(requestCallback, requestError);
api.interceptors.response.use(responseCallback, responseError);

export default api;
