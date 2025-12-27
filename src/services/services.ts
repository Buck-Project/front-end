// src/apiClient.ts
import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type {
  DeleteParams,
  GetParams,
  PatchParams,
  PostParams,
  PutParams,
} from "../types/apiTypes";

export const baseURL =
  "https://693fedb0993d68afba6a3b08.mockapi.io/api/ProductManagement"; // backend URL

const getTokenFromStore = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    sessionStorage.getItem("accessToken") ??
    localStorage.getItem("accessToken") ??
    sessionStorage.getItem("token") ??
    localStorage.getItem("token")
  );
};

const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getTokenFromStore();
    if (!token) {
      return config;
    }

    const headers = { ...(config.headers ?? {}) } as Record<string, string>;
    const existingAuth = headers.Authorization ?? headers.authorization;
    if (!existingAuth) {
      headers.Authorization = `Bearer ${token}`;
      config.headers = headers;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// ✅ GET
export const getData = async ({ endPoint, headers, params }: GetParams) => {
  try {
    const response: AxiosResponse = await apiClient.get(endPoint, {
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("error in getData", error);
    throw error;
  }
};

// ✅ POST
export const postData = async ({ endPoint, data, headers }: PostParams) => {
  try {
    const response: AxiosResponse = await apiClient.post(endPoint, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("error in postData", error);
    throw error;
  }
};

// ✅ POST image/form-data
export const postImageData = async ({ endPoint, data }: PostParams) => {
  try {
    const response: AxiosResponse = await apiClient.post(endPoint, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("error in postImageData", error);
    throw error;
  }
};

// ✅ PATCH
export const patchData = async ({ endPoint, data, headers }: PatchParams) => {
  try {
    const response: AxiosResponse = await apiClient.patch(endPoint, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("error in patchData", error);
    throw error;
  }
};

// ✅ PUT
export const putData = async ({ endPoint, data }: PutParams) => {
  try {
    const response: AxiosResponse = await apiClient.put(endPoint, data);
    return response.data;
  } catch (error) {
    console.error("error in putData", error);
    throw error;
  }
};

// ✅ DELETE
export const deleteData = async ({ endPoint, data, headers }: DeleteParams) => {
  try {
    const response: AxiosResponse = await apiClient.delete(endPoint, {
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("error in deleteData", error);
    throw error;
  }
};
