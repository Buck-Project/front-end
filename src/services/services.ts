import axios from "axios";
import type {
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";

import type {
	GetParams,
	PostParams,
	PatchParams,
	PutParams,
	DeleteParams,
} from "@/types/apiTypes";

// 🟢 NEW
import { getToken, setToken } from "@/services/tokenProvider";

export const baseURL = "https://6940f4cd993d68afba6e11f0.mockapi.io/api/testapi"; // TODO: backend

const apiClient: AxiosInstance = axios.create({
	baseURL,
	timeout: 20000,
	headers: {
		"Content-Type": "application/json",
	},
});

// 🟡 CHANGED — ارسال Bearer Token
apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// 🟡 CHANGED — گرفتن Token از homepage یا هر API
apiClient.interceptors.response.use(
	(response: AxiosResponse) => {
		const authHeader = response.headers["authorization"];
		if (authHeader?.startsWith("Bearer ")) {
			setToken(authHeader.replace("Bearer ", ""));
		}
		return response;
	},
	(error) => Promise.reject(error)
);




// ================= HTTP METHODS =================

export const getData = async ({ endPoint, headers, params }: GetParams) => {
	const response = await apiClient.get(endPoint, { headers, params });
	return response.data;
};

export const postData = async ({ endPoint, data, headers }: PostParams) => {
	const response = await apiClient.post(endPoint, data, { headers });
	return response.data;
};

export const patchData = async ({ endPoint, data, headers }: PatchParams) => {
	const response = await apiClient.patch(endPoint, data, { headers });
	return response.data;
};

export const putData = async ({ endPoint, data }: PutParams) => {
	const response = await apiClient.put(endPoint, data);
	return response.data;
};

export const deleteData = async ({ endPoint, data, headers }: DeleteParams) => {
	const response = await apiClient.delete(endPoint, { data, headers });
	return response.data;
};

export const putImageData = async ({ endPoint, data }: PutParams) => {
	const response = await apiClient.put(endPoint, data, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return response.data;
};
