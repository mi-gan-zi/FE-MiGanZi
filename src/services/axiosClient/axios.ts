import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

export class AxiosClient {
  private baseURL?: string;
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string | undefined, access_token: string) {
    this.baseURL = baseURL;

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });

    this.axiosInstance.interceptors.request.use(
      (config: AdaptAxiosRequestConfig) => {
        if (access_token && config.headers.Authorization === undefined) {
          config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async axios<T>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance(url, {
      ...options,
      headers: {
        ...options.headers,
      },
    });
    return response;
  }

  async get<T>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.axios<T>(url, { ...options, method: "GET" });
  }

  async post<T>(
    url: string,
    data?: any,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.axios<T>(url, { ...options, method: "POST", data });
  }

  async put<T>(
    url: string,
    data?: any,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.axios<T>(url, { ...options, method: "PUT", data });
  }

  async delete<T>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.axios<T>(url, { ...options, method: "DELETE" });
  }
}